import {
    ActionIcon,
    AppShell,
    CloseButton,
    Group,
    Stack,
    Title,
    Tooltip,
} from "@mantine/core"
import {
    IconEdit,
    IconMessageCircle,
    IconPageBreak,
    IconPuzzle,
} from "@tabler/icons-react"
import { useEffect, useMemo } from "react"
import { useSetState } from "@mantine/hooks"
import { Chat, GenQuiz, ManualEdit, Summary } from "./sidebar-items"
import { useAppShell, useNav } from "@/stores/app-shell-store"
import { useMindMapLoading } from "@/stores/mindmap-loading"

interface SidebarItem {
    id: string
    icon: React.ReactNode
    label: string
    chilren: React.ReactNode
}

const sidebarItems: SidebarItem[] = [
    {
        id: "chat",
        icon: <IconMessageCircle size={24} />,
        label: "Chat with AI",
        chilren: <Chat />,
    },
    {
        id: "summary",
        icon: <IconPageBreak size={24} />,
        label: "Summary",
        chilren: <Summary />,
    },
    {
        id: "gen-quiz",
        icon: <IconPuzzle size={24} />,
        label: "Generate quiz",
        chilren: <GenQuiz />,
    },
    {
        id: "manual-edit",
        icon: <IconEdit size={24} />,
        label: "Manual edit",
        chilren: <ManualEdit />,
    },
]

const Sidebar = () => {
    const [_, { open: openNav, close: closeNav }] = useNav()

    const [appShellShowed] = useAppShell()

    const [activeItem, setActiveItem] = useSetState<SidebarItem | null>(
        sidebarItems[0]
    )

    const handleCloseNav = () => {
        setActiveItem({ id: "" })
        closeNav()
        setTimeout(() => {
            setActiveItem(null)
        }, 300)
    }

    const handleActiveItem = (item: SidebarItem) => {
        if (activeItem?.id === item?.id) {
            handleCloseNav()
            return
        }
        setActiveItem(item)
        openNav()
    }

    useEffect(() => {
        if (!activeItem) {
            closeNav()
            setActiveItem(null)
        } else {
            openNav()
        }
    }, [])

    const [loading] = useMindMapLoading()

    return (
        <>
            {appShellShowed && (
                <div className="fixed top-[60px] left-0 bottom-0 bg-white w-[60px] z-20 p-4 border-r border-[#dee2e6]">
                    <Stack gap={16}>
                        {sidebarItems.map((item, index) => (
                            <Tooltip
                                key={index}
                                label={item.label}
                                position="right"
                                withArrow
                                disabled={
                                    activeItem?.id === item?.id || loading
                                }
                            >
                                <ActionIcon
                                    aria-label={item.label}
                                    onClick={() => handleActiveItem(item)}
                                    variant={
                                        activeItem &&
                                        activeItem?.id === item?.id
                                            ? "filled"
                                            : "transparent"
                                    }
                                    disabled={loading}
                                >
                                    {item.icon}
                                </ActionIcon>
                            </Tooltip>
                        ))}
                    </Stack>
                </div>
            )}

            <AppShell.Navbar
                p="md"
                zIndex="10"
                ml={60}
                className="overflow-y-auto"
            >
                <AppShell.Section>
                    <Group justify="space-between">
                        <Title order={4}>{activeItem?.label}</Title>
                        <CloseButton onClick={handleCloseNav} />
                    </Group>
                </AppShell.Section>
                {activeItem?.chilren}
            </AppShell.Navbar>
        </>
    )
}

export default Sidebar
