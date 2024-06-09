import { AppShell, Group, Image, Title } from "@mantine/core"
import { Link } from "react-router-dom"

interface HeaderProps {
    title?: string
    rightSection?: React.ReactNode
}

const Header = ({ title, rightSection }: HeaderProps) => {
    return (
        <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
                <Link to="/" className="flex gap-3 items-center">
                    <Image src="/fav.png" alt="The Liems" h={40} />
                    <Title order={5}>{title || "GenAI Hackathon 2024"}</Title>
                </Link>
                <Group>{rightSection}</Group>
            </Group>
        </AppShell.Header>
    )
}

export default Header
