import { create } from "zustand"
import { ExtractState } from "./extract-state"
import { DiagramResponse, JSONDiagram } from "@/types"

interface MindmapStore {
    mindmap: DiagramResponse["data"]

    setMindmap: (newMindmap: DiagramResponse["data"]) => void
    clearMindmap: () => void
}

const useMermaidStore = create<MindmapStore>((set) => ({
    mindmap: {
        ID: 0,
        name: "",
        prompt: "",
        mermaid: "",
        json_diagram: {} as JSONDiagram,
        image: "",
        summary: "",
    },

    setMindmap: (newMindmap) =>
        set((state) => ({
            mindmap: {
                ...state.mindmap,
                ...newMindmap,
            },
        })),
    clearMindmap: () =>
        set(() => ({
            mindmap: {
                ID: 0,
                name: "",
                prompt: "",
                mermaid: "",
                json_diagram: {} as JSONDiagram,
                image: "",
                summary: "",
            },
        })),
}))

const mindmapSelector = (state: ExtractState<typeof useMermaidStore>) => {
    return {
        mindmap: state.mindmap,
        setMindmap: state.setMindmap,
        clearMindmap: state.clearMindmap,
    }
}

export const useCurrentMindmap = () => useMermaidStore(mindmapSelector)
