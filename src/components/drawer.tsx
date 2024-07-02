import { useDrawer, useDrawerContent } from "@/stores/drawer-store";
import { Drawer, Stack, Title } from "@mantine/core";

const DrawerUI = () => {
    const { opened, closeDrawer } = useDrawer();
    const { title, position, size, children } = useDrawerContent();
    return (
        <Drawer.Root
            size={size}
            offset={8}
            radius="md"
            position={position}
            opened={opened}
            onClose={closeDrawer}
        >
            <Drawer.Overlay />
            <Drawer.Content>
                <Stack h={"100%"} gap={0}>
                    <Drawer.Header>
                        <Drawer.Title>
                            <Title order={3}>{title}</Title>
                        </Drawer.Title>
                        <Drawer.CloseButton />
                    </Drawer.Header>
                    <Drawer.Body className="grow overflow-hidden">
                        {children}
                    </Drawer.Body>
                </Stack>
            </Drawer.Content>
        </Drawer.Root>
    );
};

export default DrawerUI;