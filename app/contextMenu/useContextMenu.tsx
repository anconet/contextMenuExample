import { useState } from "react"
import { typeContextMenuState, typeUseContextMenuReturn } from "./ContextMenuTypes"

export default function useContextMenu(): typeUseContextMenuReturn {

    const initialContextMenuState: typeContextMenuState = {
        position: { x: 0, y: 0 },
        toggled: false
    }

    function clearContextMenu(): void {
        setContextMenuState(initialContextMenuState)
    }

    function renderContextMenu(x: number, y: number) {
        const newContextMenuState: typeContextMenuState = { position: { x: x, y: y }, toggled: true }
        setContextMenuState(newContextMenuState)
    }

    const [contextMenuState, setContextMenuState] = useState<typeContextMenuState>(initialContextMenuState)

    return [
        renderContextMenu,
        clearContextMenu,
        contextMenuState
    ]
}
