import { AppShell } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { Sidebar } from "./sidebar"
import { useAppShell, useNav } from "@/stores/app-shell-store"
import Header from "./header/header"

interface DiagramLayoutProps {
    title?: string
    sidebar?: boolean
    children?: React.ReactNode
}

export function Layout({
    title = "GenAI Hackathon 2024",
    children,
}: DiagramLayoutProps) {
    const [showed] = useAppShell()

    const [navOpened] = useNav()

    useDocumentTitle(title)

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 500,
                    breakpoint: "sm",
                    collapsed: { desktop: !navOpened, mobile: false },
                }}
                padding="md"
                className="h-full"
                disabled={!showed}
            >
                <Header />
                <Sidebar />
                <AppShell.Main ml={showed ? 60 : 0} className="h-screen">
                    {children}
                </AppShell.Main>
            </AppShell>
        </>
    )
}

export default Layout
