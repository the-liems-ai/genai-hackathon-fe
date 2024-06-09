import { Node } from "reactflow"
import { create } from "zustand"

interface SelectedNodeStore {
    nodes: Node[]
    setSelectedNodes: (nodes: Node[]) => void
}

export const useSelectedNodeStore = create<SelectedNodeStore>((set) => ({
    nodes: [],
    setSelectedNodes: (nodes: Node[]) => set(() => ({ nodes })),
}))

export type ExtractState<S> = S extends {
    getState: () => infer T
}
    ? T
    : never

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
