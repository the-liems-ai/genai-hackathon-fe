import { useUser } from "@/api/hooks"
import { Loader } from "@mantine/core"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthPage = ({ children }: { children?: React.ReactNode }) => {
    const { user, isLoading } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) {
            navigate("/login")
        }
        if (user) {
            if (user.organizations.length === 0) {
                navigate("/create-org")
            }
        }
    }, [user, isLoading])
    if (isLoading)
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    return children
}

export default AuthPage
