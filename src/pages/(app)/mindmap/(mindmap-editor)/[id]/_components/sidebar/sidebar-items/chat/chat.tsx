import {
    ActionIcon,
    AppShell,
    Group,
    ScrollArea,
    Textarea,
    Loader,
    Flex,
    SegmentedControl,
    Text,
    Skeleton,
} from "@mantine/core"
import { useListState } from "@mantine/hooks"
import { IconSend } from "@tabler/icons-react"
import { useCallback, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useMindMapLoading } from "@/stores/mindmap-loading"
import ChatUi, { Message } from "./chat-ui"
import {
    useEditNodes,
    useExplainNodes,
    useMindmap,
} from "../../../../../_api/hooks"
import { useSelectedNodes } from "@/stores/selected-node-store"
import { useCurrentMindmap } from "@/stores/mindmap-store"
import { useQueryClient } from "@tanstack/react-query"

const Conversation = ({ conversation }: { conversation: Message[] }) => {
    return (
        <>
            {conversation.map((message, index) => (
                <ChatUi
                    key={index}
                    role={message.role}
                    message={message.message}
                />
            ))}
        </>
    )
}

const Chat = () => {
    const { id } = useParams()
    const { isPending } = useMindmap(+id)

    const chatSectionViewport = useRef<HTMLDivElement>(null)
    const [isLoading, loadingHandlers] = useMindMapLoading()

    const scrollBottom = useCallback(() => {
        setTimeout(() => {
            chatSectionViewport.current!.scrollTo({
                top: chatSectionViewport.current!.scrollHeight,
                behavior: "smooth",
            })
        }, 100)
    }, [])

    const [chat, setChat] = useState<string>("")

    const chatTypes = useMemo(
        () => [
            {
                value: "explain",
                label: <Text fw={500}>Explain</Text>,
            },
            {
                value: "edit",
                label: <Text fw={500}>Edit</Text>,
            },
        ],
        []
    )

    const [chatType, setChatType] = useState(chatTypes[0].value)

    const [explainConversation, explainConversationHandlers] =
        useListState<Message>([
            {
                role: "bot",
                message:
                    "Hello! I'm the AI chatbot. Please select the node you want to explain then click on the Send button.",
            },
        ])

    const [editConversation, editConversationHandlers] = useListState<Message>([
        {
            role: "bot",
            message:
                "Hello! I'm the AI chatbot. Please select the node you want to edit, type what you need to edit then click on the Send button.",
        },
    ])

    const { mindmap } = useCurrentMindmap()
    const { selectedNodes } = useSelectedNodes()
    const { mutate: handleExplainNodes } = useExplainNodes()
    const { mutate: handleEditNodes } = useEditNodes()

    const queryClient = useQueryClient()
    const handleChat = () => {
        if (selectedNodes.length === 0) {
            toast.error("Please select at least one node to continue")
            return
        }
        loadingHandlers.start()
        switch (chatType) {
            case "explain":
                const explainingToaster = toast.loading("Explaining nodes...")
                explainConversationHandlers.append({
                    role: "user",
                    message: `Explain node${
                        selectedNodes.length > 1 ? "s" : ""
                    }: ${selectedNodes.map((n) => n.data.label).join(", ")}`,
                })

                scrollBottom()

                explainConversationHandlers.append({
                    role: "bot",
                    message: "l",
                })

                scrollBottom()

                handleExplainNodes(
                    {
                        id: +id,
                        request: {
                            input: "",
                            old_diagram: mindmap.mermaid,
                            chosen_nodes: selectedNodes.map((n) => ({
                                node_id: n.id,
                                title: n.data.label,
                            })),
                        },
                    },
                    {
                        onSuccess: (data) => {
                            explainConversationHandlers.append({
                                role: "bot",
                                message: data?.data.data,
                            })

                            scrollBottom()
                        },
                        onError: (error) => {
                            toast.error(error.message)
                        },
                        onSettled: () => {
                            loadingHandlers.stop()
                            toast.dismiss(explainingToaster)
                            explainConversationHandlers.filter(
                                (c) => c.message !== "l"
                            )
                        },
                    }
                )

                break
            case "edit":
                if (chat.trim() === "") {
                    toast.error("Please enter a message")
                    return
                }

                setChat("")

                const editingToaster = toast.loading("Editing nodes...")

                editConversationHandlers.append({
                    role: "user",
                    message: chat,
                })

                scrollBottom()

                editConversationHandlers.append({
                    role: "bot",
                    message: "l",
                })

                scrollBottom()

                handleEditNodes(
                    {
                        id: +id,
                        request: {
                            input: chat,
                            old_diagram: mindmap.mermaid,
                            chosen_nodes: selectedNodes.map((n) => ({
                                node_id: n.id,
                                title: n.data.label,
                            })),
                        },
                    },
                    {
                        onSuccess: (data) => {
                            queryClient.invalidateQueries({
                                queryKey: ["mindmap", +id],
                            })
                            editConversationHandlers.append({
                                role: "bot",
                                message: "Mindmap updated successfully",
                            })

                            scrollBottom()
                        },
                        onError: (error) => {
                            toast.error(error.message)
                        },
                        onSettled: () => {
                            loadingHandlers.stop()
                            toast.dismiss(editingToaster)
                            editConversationHandlers.filter(
                                (c) => c.message !== "l"
                            )
                        },
                    }
                )
                break
        }
    }

    return (
        <>
            <AppShell.Section mt={12}>
                {!isPending ? (
                    <SegmentedControl
                        size="xs"
                        fullWidth
                        data={chatTypes}
                        value={chatType}
                        onChange={setChatType}
                        disabled={isPending || isLoading}
                    />
                ) : (
                    <Skeleton height={36} />
                )}
            </AppShell.Section>
            <AppShell.Section
                grow
                component={ScrollArea}
                py={16}
                viewportRef={chatSectionViewport}
            >
                {!isPending && (
                    <Conversation
                        conversation={
                            chatType === "explain"
                                ? explainConversation
                                : editConversation
                        }
                    />
                )}
            </AppShell.Section>
            <AppShell.Section>
                <Group pt={16} align="end">
                    <Textarea
                        className="grow"
                        placeholder={
                            chatType === "explain"
                                ? "Select node to explain then click on the Send button"
                                : "Select node to edit then type what you need to edit and click on the Send button"
                        }
                        autosize
                        minRows={1}
                        maxRows={10}
                        onChange={(e) => setChat(e.currentTarget.value)}
                        value={chat}
                        disabled={
                            isPending || isLoading || chatType === "explain"
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleChat()
                            }
                        }}
                    />
                    <ActionIcon
                        aria-label="Send message"
                        size="lg"
                        disabled={isLoading || isPending}
                        onClick={handleChat}
                    >
                        {isLoading || isPending ? (
                            <Loader size="sm" />
                        ) : (
                            <IconSend size={20} />
                        )}
                    </ActionIcon>
                </Group>
            </AppShell.Section>
        </>
    )
}

export default Chat
