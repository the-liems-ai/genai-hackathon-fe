import { getParams } from "@/utils"
import { Button } from "@mantine/core"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const HeaderSaveButton = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const path = getParams(pathname)

    const handleSave = () => {
        if (path === "new") {
            navigate("/mindmap")
            return
        }
        navigate("/mindmap")
    }

    return (
        <Button
            color="green"
            onClick={handleSave}
            disabled={path === "new" || path === "" || path === undefined}
        >
            Save
        </Button>
    )
}

export default HeaderSaveButton
