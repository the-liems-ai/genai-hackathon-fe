import { useQuery } from "@tanstack/react-query"
import { getDiagrams } from "./api"

export const useDiagrams = () => {
    return useQuery({
        queryKey: ["diagrams"],
        queryFn: getDiagrams,
    })
}
