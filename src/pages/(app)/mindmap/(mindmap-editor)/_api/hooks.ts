import { useMutation, useQuery } from "@tanstack/react-query"
import { createMindmap, editNodes, explainNodes, getMindmapById } from "./api"

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
