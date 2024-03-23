import { useEffect, useRef } from "react"
import "./ContextMenu.css"
import { typeContextMenuState, typeContextMenuButton } from "./ContextMenuTypes"

type typeContextMenuProps = {
    rightClickedItem: any,
    contextMenuState: typeContextMenuState
    buttons: typeContextMenuButton[],
    onClearContextMenu: any
}

export default function ContextMenu({
    rightClickedItem,
    contextMenuState,
    buttons,
    onClearContextMenu }: typeContextMenuProps) {

    const contextMenuRef = useRef(null)

    function resetContextMenu() {
        console.log("Got to resetContextMenu")
        onClearContextMenu({ position: { x: 0, y: 0 }, toggled: false })
    }

    useEffect(
        function render() {

            function handleOffClick(e: MouseEvent) {
                if (contextMenuRef) {
                    if (contextMenuRef.current.contains(e.target) == false) { resetContextMenu() }
                }
            }

            window.addEventListener("click", handleOffClick)

            return function cleanUp() {
                window.removeEventListener("click", handleOffClick)
            }
        },
        [/*Dependencies*/])

    return <menu
        ref={contextMenuRef}
        style={{
            top: contextMenuState.position.y + 2 + "px",
            left: contextMenuState.position.x + 2 + "px"
        }}
        className={`context-menu ${contextMenuState.toggled ? "active" : ""}`}>

        {buttons.map((button, index: number) => {

            function handleClick(e: React.MouseEvent) {
                e.stopPropagation()
                resetContextMenu();
                button.onClick(e, rightClickedItem)
            }

            return <button
                key={index}
                className="context-menu-button"
                onClick={(e) => handleClick(e)}>
                {button.text}
            </button>
        })}
    </menu>
}