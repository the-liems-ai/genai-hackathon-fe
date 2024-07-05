import { createClient, EnsureJson } from "@liveblocks/client"
import { liveblocks } from "@liveblocks/zustand"
import type { WithLiveblocks } from "@liveblocks/zustand"
import { Dispatch } from "react"
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnConnect,
    OnEdgesChange,
    OnMove,
    OnMoveEnd,
    OnMoveStart,
    OnNodesChange,
    Viewport,
} from "reactflow"
import { create } from "zustand"

declare global {
    interface Liveblocks {
        Storage: Storage
    }
}

type Cursor = { x: number; y: number }

export type SharedUser = {
    id: number
    cursor: Cursor
    name: string
    picture: string
}

type FlowState = {
    nodes: Node[]
    edges: Edge[]

    setNodes: Dispatch<React.SetStateAction<Node<any, string>[]>>
    setEdges: Dispatch<React.SetStateAction<Edge<any>[]>>
    onNodesChange: OnNodesChange
    onEdgesChange: OnEdgesChange
    onConnect: OnConnect
    // onMove: OnMove

    user: SharedUser
    setUser: (user: SharedUser) => void
}

type Storage = EnsureJson<{
    nodes: FlowState["nodes"]
    edges: FlowState["edges"]
}>

const client = createClient({
    publicApiKey:
        "pk_dev_OaL5paWOb3XidWtrHpgKmp4MTXuJ1ByVuuu6O_cDjWaAUWkyobMwDx_oKdgrfwX8",
    throttle: 50,
})

const useRoomStore = create<WithLiveblocks<FlowState>>()(
    liveblocks(
        (set, get) => ({
            // Initial values for nodes and edges
            nodes: [],
            edges: [],

            // Setters for nodes and edges
            setNodes: (nodes: Node[]) => set({ nodes }),
            setEdges: (edges: Edge[]) => set({ edges }),

            // Apply changes to React Flow when the flowchart is interacted with
            onNodesChange: (changes: NodeChange[]) => {
                set({
                    nodes: applyNodeChanges(changes, get().nodes),
                })
            },
            onEdgesChange: (changes: EdgeChange[]) => {
                set({
                    edges: applyEdgeChanges(changes, get().edges),
                })
            },
            onConnect: (connection: Connection) => {
                set({
                    edges: addEdge(connection, get().edges),
                })
            },

            user: {
                id: 0,
                cursor: { x: 0, y: 0 },
                name: "",
                picture: "",
            },

            // onMove: (e: MouseEvent | TouchEvent, viewport: Viewport) => {
            //     set({
            //         user: {
            //             ...get().user,
            //             cursor: {
            //                 x: get().user.cursor.x + viewport.x,
            //                 y: get().user.cursor.y + viewport.y,
            //             },
            //         },
            //     })
            // },

            // Set the user
            setUser: (user: SharedUser) => set({ user }),
        }),
        {
            // Add Liveblocks client
            client,

            storageMapping: {
                nodes: true,
                edges: true,
            },

            // Define the store properties that should be shared in real-time
            presenceMapping: {
                user: true,
            },
        }
    )
)

export default useRoomStore
