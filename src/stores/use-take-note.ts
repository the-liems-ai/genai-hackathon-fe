import { create } from "zustand"
import { ExtractState } from "./extract-state"
import { ExplainNode } from "@/types"

interface TakeNoteStore {
    notes: ExplainNode[]
    addNote: (note: ExplainNode) => void
    removeNote: (nodeId: string) => void
    resetNotes: () => void
}

const useTakeNoteStore = create<TakeNoteStore>((set) => ({
    notes: [],
    addNote: (note) =>
        set((state) => {
            if (state.notes.some((n) => n.node_id === note.node_id)) {
                return {
                    notes: state.notes.map((n) =>
                        n.node_id === note.node_id ? note : n
                    ),
                }
            }
            return { notes: [...state.notes, note] }
        }),
    removeNote: (nodeId) =>
        set((state) => ({
            notes: state.notes.filter((note) => note.node_id !== nodeId),
        })),
    resetNotes: () => set(() => ({ notes: [] })),
}))

const takeNoteSelector = (state: ExtractState<typeof useTakeNoteStore>) => {
    return [
        state.notes,
        {
            add: state.addNote,
            remove: state.removeNote,
            reset: state.resetNotes,
        },
    ] as const
}

export const useTakeNote = () => useTakeNoteStore(takeNoteSelector)
