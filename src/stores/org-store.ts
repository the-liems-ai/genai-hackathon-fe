import { create } from "zustand"
import { ExtractState } from "./extract-state"

interface OrgStore {
    currentOrg: string
    setCurrentOrg: (org: string) => void
    removeCurrentOrg: () => void
}

const useOrgStore = create<OrgStore>((set) => ({
    currentOrg: "",
    setCurrentOrg: (org) => set(() => ({ currentOrg: org })),
    removeCurrentOrg: () => set(() => ({ currentOrg: "" })),
}))

const orgSelector = (state: ExtractState<typeof useOrgStore>) => {
    return {
        currentOrg: state.currentOrg,
        setCurrentOrg: state.setCurrentOrg,
        removeCurrentOrg: state.removeCurrentOrg,
    }
}

export const useCurrentOrg = () => useOrgStore(orgSelector)

export const getCurrentOrg = () => orgSelector(useOrgStore.getState())
