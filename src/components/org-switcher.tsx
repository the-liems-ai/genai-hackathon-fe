import { useUser } from "@/api/hooks"
import {
    Avatar,
    Badge,
    Button,
    Divider,
    Group,
    Menu,
    Text,
    Title,
} from "@mantine/core"
import { modals } from "@mantine/modals"
import {
    IconCaretUpDown,
    IconCheck,
    IconCirclePlus,
    IconSettings,
} from "@tabler/icons-react"
import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import OrgSettings from "./org-settings"

const OrgSwitcher = () => {
    const { orgId } = useParams()
    const { data: user, isLoading } = useUser()

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
            <Menu
                position="bottom-start"
                withArrow
                offset={5}
                shadow="md"
                arrowOffset={13}
            >
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
                        leftSection={
                            <IconSettings
                                size={20}
                                color="gray"
                                className="mx-0.5"
                            />
                        }
                        onClick={() => {
                            modals.open({
                                title: "Organization settings",
                                size: "xl",
                                children: <OrgSettings />,
                            })
                        }}
                        py={8}
                    >
                        <Text c={"gray"} size="sm">
                            Organization settings
                        </Text>
                    </Menu.Item>
                    <Menu.Item
                        leftSection={
                            <IconCirclePlus
                                size={20}
                                color="gray"
                                className="mx-0.5"
                            />
                        }
                        component={Link}
                        to="/create-org"
                        py={8}
                    >
                        <Text c={"gray"} size="sm">
                            Create new organization
                        </Text>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    )
}

export default OrgSwitcher
