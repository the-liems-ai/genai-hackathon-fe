import { useMutation } from "@tanstack/react-query"
import { getAskNode } from "./api"

export const useAskNode = () => {
    return useMutation({
        mutationFn: getAskNode,
    })
}
