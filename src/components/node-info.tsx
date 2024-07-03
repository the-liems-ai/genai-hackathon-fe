import useTextEditor from "@/hooks/use-text-editor";
import { useAskNode } from "@/nodes/api/hooks";
import { useCurrentMindmap } from "@/stores/mindmap-store";
import {
    ActionIcon,
    Affix,
    Button,
    Group,
    Loader,
    Menu,
    Paper,
    ScrollArea,
    Stack,
    Text,
    Textarea,
    Title,
} from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import TextEditor from "./text-editor";
import { IconWand } from "@tabler/icons-react";
import { useTakeNote } from "@/stores/use-take-note";
import { useDrawer } from "@/stores/drawer-store";
import { parseMarkdownToHTML } from "@/utils";
import { useReactFlow } from "reactflow";
import { useListState } from "@mantine/hooks";
import ChatUi, {
    Message,
} from "@/pages/(app)/mindmap/(mindmap-editor)/[id]/_components/sidebar/sidebar-items/chat/chat-ui";

const NodeInfo = ({
    id,
    name,
    defaultNote,
}: {
    id: string;
    name: string;
    defaultNote: string;
}) => {
    const { closeDrawer } = useDrawer();
    const { mindmap, setMindmap } = useCurrentMindmap();
    const { editor, content, setContent } = useTextEditor(
        parseMarkdownToHTML(defaultNote)
    );
    const [_, takeNoteHandlers] = useTakeNote();
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.currentTarget.value);
    };

    const [conversation, conversationHandlers] = useListState<Message>([]);
    const { mutate: askNode } = useAskNode();

    const handleAsk = () => {
        conversationHandlers.setState([]);
        const toastLoading = toast.loading("Generating...");
        setLoading(true);
        if (prompt.trim() !== "") {
            conversationHandlers.append({
                role: "user",
                message: prompt,
            });
        }

        setPrompt("");

        conversationHandlers.append({
            role: "bot",
            message: "l",
        });

        askNode(
            {
                id: +mindmap.ID,
                request: {
                    input: prompt,
                    old_diagram: mindmap.mermaid,
                    chosen_nodes: [{ node_id: id, title: name }],
                },
            },
            {
                onSuccess: async (data) => {
                    conversationHandlers.append({
                        role: "bot",
                        message: data?.data.data,
                    });
                    toast.success("Generated!");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
                onSettled: () => {
                    setLoading(false);
                    toast.dismiss(toastLoading);
                    conversationHandlers.pop();
                },
            }
        );
    };

    const { getNodes, setNodes } = useReactFlow();
    const handleSave = () => {
        takeNoteHandlers.add({ node_id: id, note: content });
        setNodes(
            getNodes().map((n) => {
                return n.id === id
                    ? { ...n, data: { ...n.data, note: content } }
                    : n;
            })
        );
        closeDrawer();
    };

    return (
        <>
            <Menu
                transitionProps={{
                    transition: "pop-top-right",
                }}
                shadow="md"
                width={200}
                position={"left-start"}
                withArrow
                // arrowOffset={20}
                offset={{ mainAxis: 24, crossAxis: 132 }}
                trigger="hover"
                openDelay={100}
                closeDelay={400}
            >
                <Menu.Target>
                    <Stack h={"100%"}>
                        <Title order={3}>{name}</Title>
                        <TextEditor editor={editor} h={"60%"} />
                        <Button
                            color="green"
                            fullWidth
                            onClick={handleSave}
                            disabled={loading}
                        >
                            Save
                        </Button>
                    </Stack>
                </Menu.Target>

                <Menu.Dropdown p={16} w={"600px"}>
                    <Stack align="center" gap={6}>
                        <Group align="end" w={"100%"}>
                            <Textarea
                                value={prompt}
                                className="grow"
                                onChange={handlePromptChange}
                                placeholder="Ask AI for more details..."
                                disabled={loading}
                                minRows={1}
                                maxRows={8}
                                autosize
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleAsk();
                                    }
                                }}
                            />
                            <ActionIcon
                                size={"lg"}
                                onClick={handleAsk}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader size={"sm"} />
                                ) : (
                                    <IconWand size={18} />
                                )}
                            </ActionIcon>
                        </Group>
                        <Text size="xs" c="gray">
                            Any information generated from AI may not be
                            absolutely accurate, please verify first
                        </Text>
                        <ScrollArea
                            w={"100%"}
                            h={conversation.length === 0 ? "default" : 600}
                        >
                            {conversation.map((c) => (
                                <ChatUi
                                    key={c.message}
                                    role={c.role}
                                    message={c.message}
                                />
                            ))}
                        </ScrollArea>
                    </Stack>
                </Menu.Dropdown>
            </Menu>
        </>
    );
};

export default NodeInfo;