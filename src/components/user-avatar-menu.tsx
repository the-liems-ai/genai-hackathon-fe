import { useUser } from "@/api/hooks"
import { useAuth } from "@/stores/auth-store"
import {
    Avatar,
    Divider,
    Loader,
    Menu,
    Paper,
    rem,
    Skeleton,
    Text,
    Title,
} from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

const UserAvatarMenu = () => {
    const { data: user, isLoading } = useUser()
    const navigate = useNavigate()
    const { setToken } = useAuth()
    if (isLoading) return <Skeleton circle h={38} />

    if (!user) return <></>

    const handleLogout = () => {
        setToken(null)
        navigate("/login")
    }

    return (
        <Menu shadow="md" withArrow offset={5} arrowOffset={10}>
            <Menu.Target>
                <Avatar
                    src={user.picture}
                    alt={user.name}
                    className="cursor-pointer"
                >
                    {user.given_name.charAt(0) + user.family_name.charAt(0)}
                </Avatar>
            </Menu.Target>
            <Menu.Dropdown p={"md"}>
                <div className="p-2">
                    <Title order={5} c={"blue"}>
                        {user.name}
                    </Title>
                    <Text c={"gray"}>{user.email}</Text>
                </div>
                {/* <Menu.Label>Account</Menu.Label> */}
                <Divider />
                <Menu.Item
                    mt={8}
                    leftSection={<IconLogout size={14} />}
                    onClick={handleLogout}
                    c={"dimmed"}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default UserAvatarMenu
