import { useEffect, useRef } from "react"
import "./ContextMenu.css"
import { typeContextMenuState, typeContextMenuButton } from "./ContextMenuTypes"

type typeContextMenuProps = {
    rightClickedItem: any,
    positionX: number,
    positionY: number,
    isToggled: boolean,
    buttons: any,
    onClearContextMenu: any
}

export default function ContextMenu({
    rightClickedItem,
    positionX,
    positionY,
    isToggled,
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
            top: positionY + 2 + "px",
            left: positionX + 2 + "px"
        }}
        className={`context-menu ${isToggled ? "active" : ""}`}>
        {buttons.map((button, index: number) => {

            function handleClick(e: React.MouseEvent) {
                e.stopPropagation()
                button.onClick(e, rightClickedItem)
                resetContextMenu();
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