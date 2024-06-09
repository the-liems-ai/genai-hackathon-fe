import { Outlet } from "react-router-dom"
import { Layout } from "./_components"

const MindmapEditorLayout = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default MindmapEditorLayout
