import TextEditor from "@/components/text-editor"
import useTextEditor from "@/hooks/use-text-editor"
import { useDrawer } from "@/stores/drawer-store"
import { useCheckNodeSelected } from "@/stores/selected-node-store"
import { cn } from "@/utils/cn"
import {
    ActionIcon,
    Group,
    Loader,
    Menu,
    Stack,
    Text,
    TextInput,
    Title,
    Tooltip,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
    IconCheck,
    IconEdit,
    IconInfoCircle,
    IconRobot,
    IconTrash,
    IconWand,
    IconX,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"
import {
    Handle,
    NodeToolbar,
    Position,
    useNodeId,
    useReactFlow,
} from "reactflow"
import { useAskNode } from "./api/hooks"
import toast from "react-hot-toast"
import { useCurrentMindmap } from "@/stores/mindmap-store"

export interface BaseNodeData {
    label?: string
    icon?: string
}

interface BaseNodeProps extends BaseNodeData {
    selected: boolean
    className?: string
    labelClassName?: string
}

const BaseNode = ({
    label,
    selected,
    icon,
    className = "",
    labelClassName = "",
}: BaseNodeProps) => {
    const [editMode, { open: openEditMode, close: closeEditMode }] =
        useDisclosure(false)

    const { getNode, setNodes, getNodes } = useReactFlow()
    const [iconExist, setIconExist] = useState(false)
    const nodeId = useNodeId()
    const isNodeSelected = useCheckNodeSelected(nodeId!)

    const [labelEdit, setLabelEdit] = useState(label)
    const [isSaved, setIsSaved] = useState(false)
    const handleEditSave = () => {
        setIsSaved(true)
        closeEditMode()
    }

    const handleEditCancel = () => {
        setLabelEdit(label)
        closeEditMode()
    }

    const drawer = useDrawer()
    const handleInfo = () => {
        drawer.openDrawer({
            title: "Node info",
            size: "lg",
            children: <NodeInfo id={nodeId} name={label!} />,
        })
    }

    useEffect(() => {
        if (isSaved) {
            const nodes = getNodes()
            const node = getNode(nodeId!)
            if (node) {
                setNodes(
                    nodes.map((n) => {
                        if (n.id === nodeId) {
                            return {
                                ...n,
                                data: {
                                    ...n.data,
                                    label: labelEdit,
                                },
                            }
                        }
                        return n
                    })
                )
            }
            setIsSaved(false)
        }
    }, [isSaved, labelEdit, nodeId, getNode, getNodes, setNodes])

    useEffect(() => {
        if (!selected) {
            handleEditCancel()
        }
    }, [selected])

    return (
        <>
            <NodeToolbar position={Position.Right} offset={10} align="center">
                {editMode ? (
                    <Stack gap={4} bg="white">
                        <Tooltip label="Save">
                            <ActionIcon
                                variant="light"
                                color="green"
                                onClick={handleEditSave}
                            >
                                <IconCheck />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Cancel">
                            <ActionIcon
                                variant="light"
                                color="red"
                                onClick={handleEditCancel}
                            >
                                <IconX />
                            </ActionIcon>
                        </Tooltip>
                    </Stack>
                ) : (
                    <Stack gap={4} bg="white">
                        <Tooltip label="Info">
                            <ActionIcon
                                variant="light"
                                color="green"
                                onClick={handleInfo}
                            >
                                <IconInfoCircle />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Edit">
                            <ActionIcon
                                variant="light"
                                color="blue"
                                onClick={openEditMode}
                            >
                                <IconEdit />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete">
                            <ActionIcon
                                variant="light"
                                color="red"
                                onClick={() => {
                                    setNodes((nodes) =>
                                        nodes.filter((n) => n.id !== nodeId)
                                    )
                                }}
                            >
                                <IconTrash />
                            </ActionIcon>
                        </Tooltip>
                    </Stack>
                )}
            </NodeToolbar>

            <div
                className={cn(
                    ` 
                    w-auto h-auto p-1
                    transition-all duration-150 shadow-md
                    bg-white flex items-center justify-center border border-slate-500
                    ${
                        (selected || isNodeSelected) &&
                        "border-green-600 scale-110 border-2"
                    }
                      `,
                    className
                )}
            >
                <div className="flex items-center w-full h-full gap-1">
                    {iconExist && (
                        <div className="flex-shrink-0">
                            <img
                                src={`https://app.eraser.io/static/canvas-icons/${icon}.svg`}
                                alt={icon}
                                className=" w-auto h-10 rounded-sm"
                            />
                        </div>
                    )}
                    <div className="flex-grow text-center text-xs">
                        {label && (
                            <div className={cn(labelClassName)}>
                                {editMode ? (
                                    <input
                                        value={labelEdit}
                                        onChange={(e) =>
                                            setLabelEdit(e.currentTarget.value)
                                        }
                                        className="w-full text-center border border-black rounded-sm"
                                    />
                                ) : (
                                    <span>{label}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Handle type="source" position={Position.Bottom} />
                <Handle type="target" position={Position.Top} />
            </div>
        </>
    )
}

const NodeInfo = ({ id, name }: { id: string; name: string }) => {
    const { mindmap } = useCurrentMindmap()
    const { editor, setContent } = useTextEditor()
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
                input: prompt,
                old_diagram: mindmap.mermaid,
                chosen_nodes: [{ node_id: id, title: name }],
            },
            {
                onSuccess: (data) => {
                    setContent(data?.data.data)
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

    return (
        <Stack>
            <Title order={3}>{name}</Title>
            <TextEditor editor={editor} />
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
                    <Group align="center">
                        <TextInput
                            value={prompt}
                            className="grow"
                            onChange={handlePromptChange}
                            placeholder="Generate detail with AI"
                            disabled={loading}
                        />
                        <ActionIcon
                            size={"lg"}
                            onClick={handleExplainNode}
                            disabled={loading}
                        >
                            {loading ? <Loader /> : <IconWand size={18} />}
                        </ActionIcon>
                    </Group>
                </Menu.Dropdown>
            </Menu>
        </Stack>
    )
}

export default BaseNode
