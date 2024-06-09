import { useAppShell } from "@/stores/app-shell-store"
import { useFullscreen } from "@mantine/hooks"
import { useReactFlow } from "reactflow"

const useToggleAppShell = () => {
    const [appShellShowed, { toggle: toggleAppShell }] = useAppShell()
    const { toggle: toggleFullScreen } = useFullscreen()
    const { fitView } = useReactFlow()

    const handleToggleAppShell = () => {
        toggleAppShell()
        toggleFullScreen()
        setTimeout(() => {
            fitView()
        }, 200)
    }

    return { appShellShowed, handleToggleAppShell }
}

export default useToggleAppShell
