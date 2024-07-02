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
    OnNodesChange,
} from "reactflow"
import { create } from "zustand"

declare global {
    interface Liveblocks {
        Storage: Storage
    }
}

type FlowState = {
    nodes: Node[]
    edges: Edge[]
    setNodes: Dispatch<React.SetStateAction<Node<any, string>[]>>
    setEdges: Dispatch<React.SetStateAction<Edge<any>[]>>
    onNodesChange: OnNodesChange
    onEdgesChange: OnEdgesChange
    onConnect: OnConnect
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
        }),
        {
            // Add Liveblocks client
            client,

            // Define the store properties that should be shared in real-time
            storageMapping: {
                nodes: true,
                edges: true,
            },
        }
    )
)

export default useRoomStore
