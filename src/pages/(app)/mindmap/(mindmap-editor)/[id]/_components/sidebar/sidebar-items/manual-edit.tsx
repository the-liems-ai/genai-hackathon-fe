import { useMemo } from "react"
import { useReactFlow } from "reactflow"
import { AppShell, Button, Group } from "@mantine/core"
import { IconPlus, IconSitemap, IconTrash } from "@tabler/icons-react"
import { useLayoutedElements } from "@/hooks"

let id = 0

const ManualEdit = () => {
    const reactflow = useReactFlow()
    const { getLayoutedElements } = useLayoutedElements()
    const editTools = useMemo(
        () => [
            {
                icon: <IconPlus size={28} />,
                label: "Add node",
                action: () => {
                    reactflow.addNodes({
                        id: `node_${id++}`,
                        type: "common",
                        position: {
                            x: 0,
                            y: -200,
                        },
                        data: {
                            label: `Node ${id}`,
                            verticeData: {
                                position: {
                                    x: 0,
                                    y: -200,
                                },
                                icon: "",
                                sub_graph: "",
                                id: `node_${id}`,
                                text: `Node ${id}`,
                                shape: "square",
                                note: "",
                            },
                        },
                    })
                    reactflow.fitView()
                },
            },
            {
                icon: <IconTrash size={28} />,
                label: "Clear canvas",
                action: () => {
                    reactflow.setEdges([])
                    reactflow.setNodes([])
                },
            },
            {
                icon: <IconSitemap size={28} />,
                label: "Auto layout",
                action: () => {
                    getLayoutedElements()
                },
            },
        ],
        []
    )

    return (
        <AppShell.Section mt={12}>
            <div className="flex flex-col gap-4">
                <Group gap={8} justify="space-between" grow>
                    {editTools.map((tool, index) => (
                        <Button
                            variant="light"
                            key={index}
                            onClick={tool.action}
                            h={100}
                        >
                            <span className="flex flex-col items-center justify-center gap-2">
                                {tool.icon}
                                {tool.label}
                            </span>
                        </Button>
                    ))}
                </Group>
            </div>
        </AppShell.Section>
    )
}

export default ManualEdit
