import { useDrawer, useDrawerContent } from "@/stores/drawer-store"
import { Drawer } from "@mantine/core"

const DrawerUI = () => {
    const { opened, closeDrawer } = useDrawer()
    const { title, position, size, children } = useDrawerContent()
    return (
        <Drawer
            size={size}
            offset={8}
            radius="md"
            position={position}
            opened={opened}
            onClose={closeDrawer}
            title={title}
        >
            {children}
        </Drawer>
    )
}

export default DrawerUI
