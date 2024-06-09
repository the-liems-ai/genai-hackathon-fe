import { DrawerPosition } from "@/types/drawer-position"
import { MantineSize } from "@mantine/core"
import { create } from "zustand"

interface DrawerStore {
    opened: boolean
    title: string
    position: DrawerPosition
    size: MantineSize | (string & {}) | number
    children: React.ReactNode
    openDrawer: ({
        title,
        position,
        size,
        children,
    }: {
        title: string
        position?: DrawerPosition
        size?: MantineSize | (string & {}) | number
        children: React.ReactNode
    }) => void
    closeDrawer: () => void
}

const useDrawerStore = create<DrawerStore>((set) => ({
    opened: false,
    title: "",
    position: DrawerPosition.RIGHT,
    size: "md",
    children: null,
    openDrawer: ({
        title,
        position = DrawerPosition.RIGHT,
        size = "md",
        children,
    }) => set(() => ({ opened: true, title, position, size, children })),
    closeDrawer: () => set(() => ({ opened: false })),
}))

const drawerSelector = (state: DrawerStore) => {
    return {
        opened: state.opened,
        openDrawer: state.openDrawer,
        closeDrawer: state.closeDrawer,
    }
}

const drawerContentSelector = (state: DrawerStore) => {
    return {
        title: state.title,
        position: state.position,
        size: state.size,
        children: state.children,
    }
}

export const useDrawer = () => useDrawerStore(drawerSelector)
export const useDrawerContent = () => useDrawerStore(drawerContentSelector)
