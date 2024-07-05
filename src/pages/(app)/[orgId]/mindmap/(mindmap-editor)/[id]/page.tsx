import { edgeTypes } from "@/edges"
import { useLayoutedElements, useRemoveLogo, useToggleAppShell } from "@/hooks"
import { nodeTypes } from "@/nodes"
import { useSelectedNodes } from "@/stores/selected-node-store"
import { ActionIcon, Loader } from "@mantine/core"
import { IconMaximize, IconMinimize } from "@tabler/icons-react"
import { useCallback, useEffect } from "react"
import { useParams } from "react-router-dom"
import ReactFlow, {
    Background,
    Controls,
    Panel,
    useReactFlow,
    MarkerType,
    SelectionMode,
} from "reactflow"
import { useMindmap } from "../_api/hooks"
import { convertEdge, convertNewNode } from "@/utils"
import { useCurrentMindmap } from "@/stores/mindmap-store"
import useRoomStore from "@/stores/room-store"
import { useUser } from "@/api/hooks"
import Cursor from "@/components/cursor"
import { useElementSize, useViewportSize } from "@mantine/hooks"

const panOnDrag = [1, 2]

const MindmapEditorPage = () => {
    useRemoveLogo()
    const { data: user } = useUser()
    const { id } = useParams()
    const { data, isPending } = useMindmap(+id)
    const { fitView, getViewport } = useReactFlow()
    const {
        liveblocks: { enterRoom, leaveRoom, isStorageLoading, others },
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useRoomStore()

    const setUser = useRoomStore((state) => state.setUser)

    const { mindmap, setMindmap } = useCurrentMindmap()
    useEffect(() => {
        if (isPending) return
        if (!data) return
        setMindmap(data?.data.data)
    }, [isPending, data, isStorageLoading])

    const { getLayoutedElements } = useLayoutedElements()

    useEffect(() => {
        if (mindmap && others.length === 0) {
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

    const { setSelectedNodes } = useSelectedNodes()
    const onSelectionChange = useCallback(
        ({ nodes }) => {
            setSelectedNodes(nodes)
        },
        [setSelectedNodes]
    )

    const { appShellShowed, handleToggleAppShell } = useToggleAppShell()

    useEffect(() => {
        enterRoom(id)
        return () => leaveRoom()
    }, [enterRoom, leaveRoom, id])

    const { height: vpHeight, width: vpWidth } = useViewportSize()
    const { ref, width, height } = useElementSize()
    const handleRealtimeChange = (e: React.PointerEvent<HTMLDivElement>) => {
        const widthSubtract = vpWidth - width
        const heightSubtract = vpHeight - height

        setUser({
            id: user.id,
            cursor: {
                x: e.clientX - widthSubtract - getViewport().x + 180,

                y: e.clientY - heightSubtract - getViewport().y + 28,
            },
            name: user.name,
            picture: user.picture,
        })
    }

    if (isStorageLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onSelectionChange={onSelectionChange}
                panOnScroll
                selectionOnDrag
                panOnDrag={panOnDrag}
                selectionMode={SelectionMode.Partial}
                fitView
                defaultEdgeOptions={{
                    animated: true,
                    type: "floating",
                    markerEnd: { type: MarkerType.ArrowClosed },
                }}
                onPointerMove={handleRealtimeChange}
                ref={ref}
            >
                {others.map((user) => (
                    <Cursor
                        key={user.id}
                        color={"#000"}
                        x={user.presence.user["cursor"]["x"]}
                        y={user.presence.user["cursor"]["y"]}
                    />
                ))}
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
        </>
    )
}

export default MindmapEditorPage
