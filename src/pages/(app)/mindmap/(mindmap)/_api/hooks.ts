import { useQuery } from "@tanstack/react-query"
import { getDiagrams } from "./api"

export const useMindmaps = () => {
    return useQuery({
        queryKey: ["mindmaps"],
        queryFn: getDiagrams,
    })
}
