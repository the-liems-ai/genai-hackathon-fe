import { useAppShell } from "@/stores/app-shell-store"
import { useFullscreen } from "@mantine/hooks"

const useToggleAppShell = () => {
    const [appShellShowed, { toggle: toggleAppShell }] = useAppShell()
    const { toggle: toggleFullScreen } = useFullscreen()

    const handleToggleAppShell = () => {
        toggleAppShell()
        toggleFullScreen()
    }

    return { appShellShowed, handleToggleAppShell }
}

export default useToggleAppShell
