import {
    ActionIcon,
    AppShell,
    Group,
    ScrollArea,
    Textarea,
    Loader,
    Flex,
} from "@mantine/core"
import { useListState } from "@mantine/hooks"
import { IconSend } from "@tabler/icons-react"
import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useMindMapLoading } from "@/stores/mindmap-loading"
import ChatUi, { Message } from "./chat/chat-ui"
import { useMindmap } from "../../../../_api/hooks"

const Chat = () => {
    const chatSectionViewport = useRef<HTMLDivElement>(null)
    const [isLoading, loadingHandlers] = useMindMapLoading()

    const scrollBottom = () => {
        setTimeout(() => {
            chatSectionViewport.current!.scrollTo({
                top: chatSectionViewport.current!.scrollHeight,
                behavior: "smooth",
            })
        }, 100)
    }

    const [conversation, conversationHandler] = useListState<Message>([
        { role: "bot", message: "Hi, how can I help you?" },
    ])

    const removeChatLoading = () => {
        conversationHandler.setState([
            ...conversation.filter((message) => message.message !== "l"),
        ])
    }

    const [chat, setChat] = useState<string>("")

    const { id } = useParams()
    const { data, error, isError, isPending } = useMindmap(id)

    const handleChat = () => {
        if (chat.trim() === "") {
            toast.error("Please enter a message")
            return
        }

        setChat("")
        conversationHandler.append({
            role: "user",
            message: chat,
        })

        scrollBottom()

        conversationHandler.append({
            role: "bot",
            message: "l",
        })

        scrollBottom()

        loadingHandlers.start()

        console.log("this is update")
    }

    return (
        <>
            <AppShell.Section
                grow
                component={ScrollArea}
                py={16}
                viewportRef={chatSectionViewport}
            >
                {isPending ? (
                    <Flex align="center" justify="center" className="grow">
                        {/* TODO: Replace loader with skeleton */}
                        <Loader />
                    </Flex>
                ) : (
                    conversation.map((message, index) => (
                        <ChatUi key={index} {...message} />
                    ))
                )}
            </AppShell.Section>
            <AppShell.Section>
                <Group pt={16} align="end">
                    <Textarea
                        className="grow"
                        placeholder="Chat with AI here"
                        autosize
                        minRows={1}
                        maxRows={10}
                        onChange={(e) => setChat(e.currentTarget.value)}
                        value={chat}
                        disabled={isLoading}
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
