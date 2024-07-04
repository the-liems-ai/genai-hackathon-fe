import { useUser } from "@/api/hooks"
import {
    Avatar,
    Badge,
    Button,
    Divider,
    Group,
    Loader,
    Menu,
    Text,
    Title,
} from "@mantine/core"
import {
    IconCaretUpDown,
    IconCheck,
    IconCirclePlus,
    IconSwitchVertical,
} from "@tabler/icons-react"
import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"

const OrgSwitcher = () => {
    const { orgId } = useParams()
    const { user, isLoading } = useUser()

    const org = useMemo(() => {
        if (isLoading) return null
        return user?.organizations.find((org) => org.id === orgId)
    }, [user, isLoading, orgId])

    const isOwner = useMemo(() => {
        if (isLoading) return null
        return user?.organizations.find((org) => org.id === orgId)?.is_owner
    }, [user, isLoading, orgId])

    if (isLoading) return null

    if (!org) return null

    return (
        <Group gap={10}>
            <Group gap={10} align="center">
                <Title order={5}>{org.name}</Title>
                {
                    <Badge color={isOwner ? "red" : "blue"}>
                        {isOwner ? "Owner" : "Member"}
                    </Badge>
                }
            </Group>
            <Menu position="bottom-start" withArrow offset={5} shadow="md">
                <Menu.Target>
                    <Button variant="subtle" px={4}>
                        <IconCaretUpDown />
                    </Button>
                </Menu.Target>
                <Menu.Dropdown miw={240} p={"sm"}>
                    <Menu.Label>Organizations</Menu.Label>
                    {user?.organizations.map((org) => (
                        <Menu.Item
                            key={org.id}
                            leftSection={
                                <Avatar size={"sm"} color={"blue"}>
                                    {org.name.charAt(0)}
                                </Avatar>
                            }
                            component={Link}
                            to={`/${org.id}/mindmap`}
                            rightSection={
                                orgId === org.id && <IconCheck size={18} />
                            }
                            py={8}
                        >
                            <Text size="sm">{org.name}</Text>
                        </Menu.Item>
                    ))}
                    <Divider my={8} />
                    <Menu.Item
                        leftSection={<IconCirclePlus size={26} />}
                        component={Link}
                        to="/create-org"
                        py={8}
                    >
                        Create new organization
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    )
}

export default OrgSwitcher
