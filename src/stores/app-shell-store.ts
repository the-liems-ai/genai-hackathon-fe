import { create } from "zustand"
import { ExtractState } from "./extract-state"

interface AppShellStore {
    showed: boolean
    navOpened: boolean

    showAppShell: () => void
    hideAppShell: () => void
    toggleAppShell: () => void

    openNav: () => void
    closeNav: () => void
    toggleNav: () => void
}

const useAppShellStore = create<AppShellStore>((set) => ({
    showed: true,
    navOpened: true,

    showAppShell: () => set(() => ({ showed: true })),
    hideAppShell: () =>
        set(() => ({ showed: false, navOpened: false, sideOpened: false })),
    toggleAppShell: () =>
        set((state) => ({ showed: !state.showed, sideOpened: !state.showed })),

    openNav: () => set(() => ({ navOpened: true })),
    closeNav: () => set(() => ({ navOpened: false })),
    toggleNav: () => set((state) => ({ navOpened: !state.navOpened })),
}))

const appShellSelector = (state: ExtractState<typeof useAppShellStore>) => {
    return [
        state.showed,
        {
            show: state.showAppShell,
            hide: state.hideAppShell,
            toggle: state.toggleAppShell,
        },
    ] as const
}

export const useAppShell = () => useAppShellStore(appShellSelector)

const navSelector = (state: ExtractState<typeof useAppShellStore>) => {
    return [
        state.navOpened,
        {
            open: state.openNav,
            close: state.closeNav,
            toggle: state.toggleNav,
        },
    ] as const
}

export const useNav = () => useAppShellStore(navSelector)
