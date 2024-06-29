import { AppShell, Button, Group } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { Sidebar } from "./sidebar"
import { useAppShell, useNav } from "@/stores/app-shell-store"
import { Header } from "../../../_components"
import HeaderSaveButton from "./header-save-button"
import { useNavigate, useParams } from "react-router-dom"

interface DiagramLayoutProps {
    title?: string
    sidebar?: boolean
    children?: React.ReactNode
}

const HeaderRightSection = () => {
    const navigate = useNavigate()
    const handleCancel = () => {
        navigate("/mindmap")
    }
    return (
        <Group>
            <Button color="gray" variant="outline" onClick={handleCancel}>
                Cancel
            </Button>
            <HeaderSaveButton />
        </Group>
    )
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
                <Header title={title} rightSection={<HeaderRightSection />} />
                <Sidebar />
                <AppShell.Main ml={showed ? 60 : 0} className="h-full">
                    {children}
                </AppShell.Main>
            </AppShell>
        </>
    )
}

export default Layout
