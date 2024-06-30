import { edgeTypes } from "@/edges"
import { useLayoutedElements, useRemoveLogo, useToggleAppShell } from "@/hooks"
import { nodeTypes } from "@/nodes"
import { useSelectedNodes } from "@/stores/selected-node-store"
import { ActionIcon } from "@mantine/core"
import { IconMaximize, IconMinimize } from "@tabler/icons-react"
import { useCallback, useEffect } from "react"
import { useParams } from "react-router-dom"
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    OnConnect,
    Panel,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "reactflow"
import { useMindmap } from "../_api/hooks"
import { convertEdge, convertNode } from "@/utils"
import { useCurrentMindmap } from "@/stores/mindmap-store"

const MindmapEditorPage = () => {
    const { id } = useParams()
    const { data, error, isError, isPending } = useMindmap(+id)

    useRemoveLogo()
    const { fitView } = useReactFlow()
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    )

    const { setSelectedNodes } = useSelectedNodes()
    const onSelectionChange = useCallback(
        ({ nodes }) => {
            setSelectedNodes(nodes)
        },
        [setSelectedNodes]
    )

    const { appShellShowed, handleToggleAppShell } = useToggleAppShell()
    const { setMindmap } = useCurrentMindmap()

    const { getLayoutedElements } = useLayoutedElements()
    useEffect(() => {
        if (!isPending) {
            setNodes(
                Object.values(data?.data.data.json_diagram.new.vertices).map(
                    (value) => {
                        return convertNode(value)
                    }
                )
            )
            setEdges(
                Object.values(data?.data.data.json_diagram.new.links).map(
                    (value) => convertEdge(value)
                )
            )

            setTimeout(() => {
                getLayoutedElements()
                setMindmap(data?.data.data)
            }, 100)

            setTimeout(() => {
                fitView()
            }, 300)
        }
    }, [isPending, data])

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            fitView
            defaultEdgeOptions={{
                animated: true,
                type: "straight",
            }}
        >
            <Background />
            <Controls />

            <Panel position="bottom-right">
                <ActionIcon radius={"xl"} onClick={handleToggleAppShell}>
                    {appShellShowed ? (
                        <IconMaximize size={16} />
                    ) : (
                        <IconMinimize size={16} />
                    )}
                </ActionIcon>
            </Panel>
        </ReactFlow>
    )
}

export default MindmapEditorPage
