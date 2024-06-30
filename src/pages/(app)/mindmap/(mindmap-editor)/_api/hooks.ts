import { useMutation, useQuery } from "@tanstack/react-query"
import { createMindmap, getMindmapById, updateMindmap } from "./api"

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

export const useUpdateMindmap = () => {
    return useMutation({
        mutationFn: updateMindmap,
    })
}
