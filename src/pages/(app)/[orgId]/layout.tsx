import AuthPage from "@/components/auth-page"
import { useCurrentOrg } from "@/stores/org-store"
import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"

const OrgMindmapLayout = () => {
    const { orgId } = useParams()
    const { setCurrentOrg } = useCurrentOrg()

    useEffect(() => {
        if (!orgId || orgId.trim() === "") return
        setCurrentOrg(orgId)
    }, [orgId])
    return (
        <AuthPage>
            <Outlet />
        </AuthPage>
    )
}

export default OrgMindmapLayout
