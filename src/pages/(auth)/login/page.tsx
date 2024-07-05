import { useUser } from "@/api/hooks"
import GoogleIcon from "@/components/google-icon"
import { authInstance } from "@/utils/axios"
import { Loader } from "@mantine/core"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate()

    const { data: user, isLoading } = useUser()
    useEffect(() => {
        if (user) {
            if (user.organizations.length === 0) {
                navigate("/create-org")
            } else {
                navigate(`/${user.organizations[0].id}/mindmap`)
            }
        }
    }, [user, isLoading])

    const handleLogin = async () => {
        try {
            await authInstance.post("login", {
                provider: "google",
                redirectAfterLogin: `${window.location.origin}/login/callback`,
            })
        } catch (error) {
            window.location.href = error.response.data.url
        }
    }
    return (
        <div className="h-screen flex items-center justify-center bg-[url('/bg.png')] bg-center bg-no-repeat bg-cover">
            <div className="h-screen w-full flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white rounded-xl border-black/10 shadow px-10 py-8">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <img
                                src="/fav.png"
                                alt="JS Logo"
                                className="aspect-square h-16"
                            />
                            <div className="flex flex-col items-center justify-center gap-1">
                                <h1 className="font-bold text-lg">
                                    Sign in to MindGPT
                                </h1>
                                <p className="text-black/60 text-sm">
                                    Welcome back! Please sign in to continue
                                </p>
                            </div>
                        </div>
                        <GoogleLoginButton
                            onClick={handleLogin}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

const GoogleLoginButton = ({
    onClick,
    loading = false,
}: {
    onClick: () => void
    loading?: boolean
}) => {
    if (loading) {
        return (
            <button
                className="flex items-center justify-center gap-4 w-full py-2 px-4 rounded-md bg-white border border-black/10 shadow-sm cursor-not-allowed"
                disabled
            >
                <Loader size={"sm"} />
                <span className="font-medium text-black/40">
                    Continue with Google
                </span>
            </button>
        )
    }
    return (
        <button
            className="flex items-center justify-center gap-4 w-full py-2 px-4 rounded-md bg-white border border-black/10 shadow-sm"
            onClick={onClick}
        >
            <GoogleIcon className="h-4 w-4" />
            <span className="font-medium">Continue with Google</span>
        </button>
    )
}
