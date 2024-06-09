import { AppShell } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useAppShell } from "@/stores/app-shell-store"
import Header from "../../_components/header"

interface MindmapLayoutProps {
    title?: string
    children?: React.ReactNode
}

export function Layout({
    title = "GenAI Hackathon 2024",
    children,
}: MindmapLayoutProps) {
    const [showed] = useAppShell()

    useDocumentTitle(title)

    return (
        <>
            <AppShell header={{ height: 60 }} padding="md" disabled={!showed}>
                <Header title={title} />
                <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
        </>
    )
}

export default Layout
