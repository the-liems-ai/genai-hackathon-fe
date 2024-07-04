import AuthPage from "@/components/auth-page"
import { Outlet } from "react-router-dom"

const OrgMindmapLayout = () => {
    return (
        <AuthPage>
            <Outlet />
        </AuthPage>
    )
}

export default OrgMindmapLayout
