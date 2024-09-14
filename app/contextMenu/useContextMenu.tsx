import { useState } from "react"
import { typeContextMenuButton, typeContextMenuState, typeUseContextMenuReturn } from "./ContextMenuTypes"
import ContextMenu from "./ContextMenu"

export default function useContextMenu(buttons: typeContextMenuButton[]): typeUseContextMenuReturn {

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

    function possibleContextMenu(): React.JSX.Element {
        if (contextMenuState.toggled == true) {
            return <ContextMenu
                contextMenuState={contextMenuState}
                buttons={buttons}
                onClearContextMenu={clearContextMenu}
                rightClickedItem={""}
            ></ContextMenu>
        }
    }

    function handleOnContextMenu(e: React.MouseEvent, rightClickedPerson: any) {
        e.preventDefault()
        const mouseClickX = e.clientX
        const mouseClickY = e.clientY
        renderContextMenu(mouseClickX, mouseClickY)
        console.log(mouseClickX, mouseClickY)
    }

    const [contextMenuState, setContextMenuState] = useState<typeContextMenuState>(initialContextMenuState)

    return {
        possibleContextMenu: possibleContextMenu,
        handleOnContextMenu: handleOnContextMenu,
    }
}
