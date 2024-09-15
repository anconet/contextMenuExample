import { useState } from "react"
import { typeContextMenuButton, typeContextMenuState, typeUseContextMenuReturn } from "./ContextMenuTypes"
import ContextMenu from "./ContextMenu"


export default function useContextMenu<T>(buttons: typeContextMenuButton<T>[]): typeUseContextMenuReturn<T> {

    var initialRightClickedItem: T = null! //Couldn't find a better way to assign a variable that I won't know until runtime.

    const initialContextMenuState: typeContextMenuState<T> = {
        position: { x: 0, y: 0 },
        toggled: false,
        rightClickedItem: initialRightClickedItem
    }

    function clearContextMenu(): void {
        setContextMenuState(initialContextMenuState)
    }

    function renderContextMenu(x: number, y: number, rightClickedItem: T) {
        const newContextMenuState: typeContextMenuState<T> = { position: { x: x, y: y }, toggled: true, rightClickedItem: rightClickedItem }
        setContextMenuState(newContextMenuState)
    }

    function possibleContextMenu(): React.JSX.Element {
        if (contextMenuState.toggled == true) {
            return <ContextMenu<T>
                contextMenuState={contextMenuState}
                buttons={buttons}
                onClearContextMenu={clearContextMenu}
            ></ContextMenu>
        } else return <></>
    }

    function handleOnContextMenu(e: React.MouseEvent, rightClickedItem: T) {
        e.preventDefault()
        const mouseClickX = e.clientX
        const mouseClickY = e.clientY
        renderContextMenu(mouseClickX, mouseClickY, rightClickedItem)
        console.log(mouseClickX, mouseClickY, rightClickedItem)
    }

    const [contextMenuState, setContextMenuState] = useState<typeContextMenuState<T>>(initialContextMenuState)

    return {
        possibleContextMenu: possibleContextMenu,
        handleOnContextMenu: handleOnContextMenu,
    }
}
