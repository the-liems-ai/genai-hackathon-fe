import { Node } from "reactflow"
import { create } from "zustand"
import { ExtractState } from "./extract-state"
import { CommonNodeData } from "@/nodes/CommonNode"

interface SelectedNodeStore {
    nodes: Node<CommonNodeData>[]
    setSelectedNodes: (nodes: Node<CommonNodeData>[]) => void
}

const useSelectedNodeStore = create<SelectedNodeStore>((set) => ({
    nodes: [],
    setSelectedNodes: (nodes: Node[]) => set(() => ({ nodes })),
}))

const selectedNodeSelector = (
    state: ExtractState<typeof useSelectedNodeStore>
) => {
    return {
        selectedNodes: state.nodes,
        setSelectedNodes: state.setSelectedNodes,
    }
}

const checkSelectedNodeSelector =
    (nodeId: string) => (state: ExtractState<typeof useSelectedNodeStore>) =>
        state.nodes.some((node) => node.id === nodeId)

export const useSelectedNodes = () => useSelectedNodeStore(selectedNodeSelector)

export const useCheckNodeSelected = (nodeId: string) =>
    useSelectedNodeStore(checkSelectedNodeSelector(nodeId))
