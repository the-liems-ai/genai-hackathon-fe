import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteDiagram, getDiagrams } from "./api"

export const useMindmaps = () => {
    return useQuery({
        queryKey: ["mindmaps"],
        queryFn: getDiagrams,
    })
}

export const useDeleteMindmap = () => {
    return useMutation({
        mutationFn: deleteDiagram,
    })
}
