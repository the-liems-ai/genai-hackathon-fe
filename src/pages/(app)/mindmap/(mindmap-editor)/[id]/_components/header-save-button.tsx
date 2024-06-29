import { getParams } from "@/utils"
import { Button } from "@mantine/core"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useMindmap } from "../../_api/hooks"

const HeaderSaveButton = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { data, isLoading } = useMindmap(params.id)

    const handleSave = async () => {
        navigate("/mindmap")
    }

    return (
        <Button color="green" onClick={handleSave}>
            Save
        </Button>
    )
}

export default HeaderSaveButton
