import { useMutation, useQuery } from "@tanstack/react-query"
import {
    clearVtDb,
    createMindmap,
    editNodes,
    explainNodes,
    genQuiz,
    getMindmapById,
    saveMindmap,
    summary,
    uploadFile,
    uploadURL,
} from "./api"

export const useCreateMindmap = () => {
    return useMutation({
        mutationFn: createMindmap,
    })
}

export const useMindmap = (id: number) => {
    return useQuery({
        queryKey: ["mindmap", id],
        queryFn: () => getMindmapById(id),
    })
}

export const useExplainNodes = () => {
    return useMutation({
        mutationFn: explainNodes,
    })
}

export const useEditNodes = () => {
    return useMutation({
        mutationFn: editNodes,
    })
}

export const useSummary = () => {
    return useMutation({
        mutationFn: summary,
    })
}

export const useSaveMindmap = () => {
    return useMutation({
        mutationFn: saveMindmap,
    })
}

export const useGenQuiz = () => {
    return useMutation({
        mutationFn: genQuiz,
    })
}

export const useUploadFile = () => {
    return useMutation({
        mutationFn: uploadFile,
    })
}

export const useUploadURL = () => {
    return useMutation({
        mutationFn: uploadURL,
    })
}

export const useClearVtDb = () => {
    return useMutation({
        mutationFn: clearVtDb,
    })
}
