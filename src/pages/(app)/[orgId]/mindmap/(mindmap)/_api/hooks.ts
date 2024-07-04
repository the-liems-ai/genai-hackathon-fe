import { useMutation, useQuery } from "@tanstack/react-query";
import { GetDiagramsRequestParams, deleteDiagram, getDiagrams } from "./api";

export const useMindmaps = ({
    keyword,
    page,
    limit,
}: GetDiagramsRequestParams) => {
    return useQuery({
        queryKey: ["mindmaps", keyword, page, limit],
        queryFn: () => getDiagrams({ keyword, page, limit }),
    });
};

export const useDeleteMindmap = () => {
    return useMutation({
        mutationFn: deleteDiagram,
    });
};
