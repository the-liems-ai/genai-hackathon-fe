import { Outlet } from "react-router-dom"
import Layout from "./_components/mindmap-layout"

const MindmapLayout = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default MindmapLayout
