import { Outlet } from "react-router-dom"
import Header from "../_components/header"

const DiagramLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default DiagramLayout
