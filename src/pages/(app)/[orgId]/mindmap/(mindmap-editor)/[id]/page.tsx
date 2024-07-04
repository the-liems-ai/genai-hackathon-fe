import { edgeTypes } from "@/edges"
import { useLayoutedElements, useRemoveLogo, useToggleAppShell } from "@/hooks"
import { nodeTypes } from "@/nodes"
import { useSelectedNodes } from "@/stores/selected-node-store"
import { ActionIcon, Loader } from "@mantine/core"
import { IconMaximize, IconMinimize } from "@tabler/icons-react"
import { useCallback, useEffect, useRef } from "react"
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
    updateEdge,
    Edge,
    Connection,
    MarkerType,
} from "reactflow"
import { useMindmap } from "../_api/hooks"
import { convertEdge, convertNewNode } from "@/utils"
import { useCurrentMindmap } from "@/stores/mindmap-store"
import useRoomStore from "@/stores/room-store"

const MindmapEditorPage = () => {
    useRemoveLogo()
    const { id } = useParams()
    const { data, isPending } = useMindmap(+id)
    const { fitView } = useReactFlow()
    const {
        liveblocks: { enterRoom, leaveRoom, isStorageLoading },
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useRoomStore()

    const { mindmap, setMindmap } = useCurrentMindmap()
    useEffect(() => {
        if (isPending) return
        if (!data) return
        setMindmap(data?.data.data)
    }, [isPending, data, isStorageLoading])

    useEffect(() => {
        if (mindmap) {
            setNodes(
                Object.values(mindmap?.json_diagram.new?.vertices).map(
                    (value) => {
                        return convertNewNode(value)
                    }
                )
            )
            setEdges(
                Object.values(mindmap?.json_diagram.new?.links).map((value) =>
                    convertEdge(value)
                )
            )

            setTimeout(() => {
                // check if all node has x and y position is 0 then get layouted elements
                const isNotLayouted = Object.values(
                    mindmap?.json_diagram.new?.vertices
                ).every(
                    (value) => value.position.x === 0 && value.position.y === 0
                )

                if (isNotLayouted) {
                    getLayoutedElements()
                }
            }, 100)

            setTimeout(() => {
                fitView()
            }, 500)
        }
    }, [mindmap])
    // const [, setNodes] = useNodesState([])
    // const [, setEdges] = useEdgesState([])
    // const onConnect: OnConnect = useCallback(
    //     (connection) => setEdges((eds) => addEdge(connection, eds)),
    //     [setEdges]
    // );

    const { setSelectedNodes } = useSelectedNodes()
    const onSelectionChange = useCallback(
        ({ nodes }) => {
            setSelectedNodes(nodes)
        },
        [setSelectedNodes]
    )

    const { appShellShowed, handleToggleAppShell } = useToggleAppShell()

    const { getLayoutedElements } = useLayoutedElements()

    useEffect(() => {
        enterRoom(id)
        return () => leaveRoom()
    }, [enterRoom, leaveRoom, id])

    if (isStorageLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

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
                type: "floating",
                markerEnd: { type: MarkerType.ArrowClosed },
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
