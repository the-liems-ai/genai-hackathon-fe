import { useMutation, useQuery } from "@tanstack/react-query"
import { GetDiagramsRequestParams, deleteDiagram, getDiagrams } from "./api"

export const useMindmaps = ({
    keyword,
    page,
    limit,
    orgId,
}: GetDiagramsRequestParams) => {
    return useQuery({
        queryKey: ["mindmaps", keyword, page, limit, orgId],
        queryFn: () => getDiagrams({ keyword, page, limit, orgId }),
    })
}

export const useDeleteMindmap = () => {
    return useMutation({
        mutationFn: deleteDiagram,
    })
}
