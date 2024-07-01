import { AppShell, Group, Image, Title } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useAppShell } from "@/stores/app-shell-store"
import { Link } from "react-router-dom"

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
                <AppShell.Header>
                    <Group h="100%" px="md" justify="space-between">
                        <Link to="/mindmap" className="flex gap-3 items-center">
                            <Image src="/fav.png" alt="The Liems" h={40} />
                            <Title order={5}>GenAI Hackathon 2024</Title>
                        </Link>
                    </Group>
                </AppShell.Header>
                <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
        </>
    )
}

export default Layout
