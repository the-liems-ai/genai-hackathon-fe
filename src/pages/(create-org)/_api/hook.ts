import { useMutation } from "@tanstack/react-query"
import { createOrg } from "./api"

export const useCreateOrg = () => {
    return useMutation({
        mutationFn: createOrg,
    })
}
