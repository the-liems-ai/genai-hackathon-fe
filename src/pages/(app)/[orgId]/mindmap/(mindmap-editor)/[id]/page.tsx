import { edgeTypes } from "@/edges"
import { useLayoutedElements, useRemoveLogo, useToggleAppShell } from "@/hooks"
import { nodeTypes } from "@/nodes"
import { useSelectedNodes } from "@/stores/selected-node-store"
import { ActionIcon, Avatar, Loader, Tooltip } from "@mantine/core"
import { IconMaximize, IconMinimize } from "@tabler/icons-react"
import { Fragment, useCallback, useEffect } from "react"
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
import { useElementSize, useMouse, useViewportSize } from "@mantine/hooks"
import { UserResponse } from "@/types"
import { BaseUserMeta, JsonObject, User } from "@liveblocks/client"

const panOnDrag = [1, 2]

const cusorColors = [
    "#991b1b",
    "#92400e",
    "#3f6212",
    "#065f46",
    "#155e75",
    "#1e40af",
    "#5b21b6",
    "#86198f",
    "#9f1239",
]

const MAX_USERS_DISPLAY = 5

const OnlineUsers = ({
    others,
    currentUser,
}: {
    others: readonly User<JsonObject, BaseUserMeta>[]
    currentUser: UserResponse
}) => {
    return (
        <div className="bg-white shadow-md px-2 py-1 rounded">
            <Avatar.Group>
                <Tooltip label="You" withArrow>
                    <Avatar src={currentUser.picture} />
                </Tooltip>
                {others.map((user, index) => {
                    if (index + 1 === MAX_USERS_DISPLAY) {
                        return <Avatar key={index}>+{index + 1}</Avatar>
                    }
                    if (index + 1 > MAX_USERS_DISPLAY) {
                        return <Fragment key={index}></Fragment>
                    }
                    return (
                        <Tooltip
                            label={user.presence.user["name"]}
                            withArrow
                            key={index}
                            color={cusorColors[index]}
                            c={"white"}
                        >
                            <Avatar
                                key={user.id}
                                src={user.presence.user["picture"]}
                            />
                        </Tooltip>
                    )
                })}
            </Avatar.Group>
        </div>
    )
}

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

    const { ref, x, y } = useMouse()

    const handleRealtimeChange = (e: React.PointerEvent<HTMLDivElement>) => {
        setUser({
            id: user.id,
            cursor: {
                x: x,
                y: y,
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
                {others.map((user, index) => (
                    <Cursor
                        key={index}
                        color={cusorColors[index]}
                        x={user.presence.user["cursor"]["x"]}
                        y={user.presence.user["cursor"]["y"]}
                        name={user.presence.user["name"]}
                    />
                ))}
                <Background />
                <Controls />
                <Panel position="top-right">
                    <OnlineUsers others={others} currentUser={user} />
                </Panel>

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
