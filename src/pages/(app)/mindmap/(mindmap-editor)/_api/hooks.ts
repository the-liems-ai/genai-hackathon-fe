import { useMutation, useQuery } from "@tanstack/react-query"
import { createMindmap, getMindmapById } from "./api"

export const useCreateMindmap = () => {
    return useMutation({
        mutationFn: createMindmap,
    })
}

export const useMindmap = (id: string) => {
    return useQuery({
        queryKey: ["mindmap", id],
        queryFn: () => getMindmapById(id),
    })
}
