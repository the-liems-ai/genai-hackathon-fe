import useTextEditor from "@/hooks/use-text-editor"
import { useAskNode } from "@/nodes/api/hooks"
import { useCurrentMindmap } from "@/stores/mindmap-store"
import {
    ActionIcon,
    Button,
    Group,
    Loader,
    Menu,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core"
import { useState } from "react"
import toast from "react-hot-toast"
import TextEditor from "./text-editor"
import { IconRobot, IconWand } from "@tabler/icons-react"
import { useTakeNote } from "@/stores/use-take-note"
import { useDrawer } from "@/stores/drawer-store"
import { parseMarkdownToHTML } from "@/utils"

const NodeInfo = ({
    id,
    name,
    defaultNote,
}: {
    id: string
    name: string
    defaultNote: string
}) => {
    const { closeDrawer } = useDrawer()
    const { mindmap, setMindmap } = useCurrentMindmap()
    const { editor, content, setContent } = useTextEditor(
        parseMarkdownToHTML(defaultNote)
    )
    const [_, takeNoteHandlers] = useTakeNote()
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.currentTarget.value)
    }

    const { mutate: askNode } = useAskNode()
    const handleExplainNode = () => {
        const toastLoading = toast.loading("Generating node detail...")
        setLoading(true)

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
                    const htmlContent = parseMarkdownToHTML(data?.data.data!)
                    setContent(`${content}<br/>${htmlContent}`)
                    toast.success("Node detail generated")
                },
                onError: (error) => {
                    toast.error(error.message)
                },
                onSettled: () => {
                    setLoading(false)
                    toast.dismiss(toastLoading)
                },
            }
        )
    }

    const handleSave = () => {
        takeNoteHandlers.add({ node_id: id, note: content })
        setMindmap({
            ...mindmap,
            json_diagram: {
                ...mindmap.json_diagram,
                new: {
                    ...mindmap.json_diagram.new,
                    vertices: {
                        ...mindmap.json_diagram.new.vertices,
                        [id]: {
                            ...mindmap.json_diagram.new.vertices[id],
                            note: content,
                        },
                    },
                },
            },
        })
        closeDrawer()
    }

    return (
        <Stack>
            <Title order={3}>{name}</Title>
            <TextEditor editor={editor} />
            <Button color="green" fullWidth onClick={handleSave}>
                Save
            </Button>
            <Menu
                transitionProps={{
                    transition: "pop-bottom-right",
                }}
                shadow="md"
                width={200}
                position={"top-end"}
                withArrow
                arrowOffset={20}
            >
                <Menu.Target>
                    <ActionIcon
                        size={"xl"}
                        pos={"absolute"}
                        bottom={16}
                        right={16}
                        radius={"xl"}
                    >
                        <IconRobot />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown p={16} w={"500px"}>
                    <Stack align="center" gap={6}>
                        <Group align="center" w={"100%"}>
                            <TextInput
                                value={prompt}
                                className="grow"
                                onChange={handlePromptChange}
                                placeholder="Ask AI for more details..."
                                disabled={loading}
                            />
                            <ActionIcon
                                size={"lg"}
                                onClick={handleExplainNode}
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
                    </Stack>
                </Menu.Dropdown>
            </Menu>
        </Stack>
    )
}

export default NodeInfo
