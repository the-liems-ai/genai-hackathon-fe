import { Anchor, AppShell, Divider, Group, Image, Title } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useAppShell } from "@/stores/app-shell-store"
import { Link, useParams } from "react-router-dom"
import UserAvatarMenu from "@/components/user-avatar-menu"
import OrgSwitcher from "@/components/org-switcher"

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

    const { orgId } = useParams()
    return (
        <>
            <AppShell header={{ height: 60 }} padding="md" disabled={!showed}>
                <AppShell.Header>
                    <Group h="100%" px="xl" justify="space-between">
                        <Group>
                            <Link
                                to={`/${orgId}/mindmap`}
                                className="flex gap-3 items-center"
                            >
                                <Image src="/fav.png" alt="The Liems" h={40} />
                                <Title order={5}>GenAI Hackathon 2024</Title>
                            </Link>
                            <Divider orientation="vertical" />
                            <OrgSwitcher />
                        </Group>
                        <UserAvatarMenu />
                    </Group>
                </AppShell.Header>
                <AppShell.Main>{children}</AppShell.Main>
                <AppShell.Footer>
                    <Group justify="center" align="center" h="100%">
                        <Anchor
                            href="https://github.com/the-liems-ai"
                            target="_blank"
                        >
                            <Title order={5} c="gray">
                                © 2024 The Liems
                            </Title>
                        </Anchor>
                    </Group>
                </AppShell.Footer>
            </AppShell>
        </>
    )
}

export default Layout
