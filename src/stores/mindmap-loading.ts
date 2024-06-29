import { create } from "zustand"
import { ExtractState } from "./extract-state"

interface MindMapLoadingStore {
    isLoading: boolean
    startLoading: () => void
    stopLoading: () => void
    setLoading: (loading: boolean) => void
    toggleLoading: () => void
}

const useMindMapLoadingStore = create<MindMapLoadingStore>((set) => ({
    isLoading: false,
    startLoading: () => set(() => ({ isLoading: true })),
    stopLoading: () => set(() => ({ isLoading: false })),
    setLoading: (loading) => set(() => ({ isLoading: loading })),
    toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
}))

const mindMapLoadingSelector = (
    state: ExtractState<typeof useMindMapLoadingStore>
) => {
    return [
        state.isLoading,
        {
            start: state.startLoading,
            stop: state.stopLoading,
            set: state.setLoading,
            toggle: state.toggleLoading,
        },
    ] as const
}

export const useMindMapLoading = () =>
    useMindMapLoadingStore(mindMapLoadingSelector)
