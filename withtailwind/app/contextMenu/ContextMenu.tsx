import { useEffect, useRef } from "react"
import { typeContextMenuState, typeContextMenuButton } from "./ContextMenuTypes"

type typeContextMenuProps<T> = {
    contextMenuState: typeContextMenuState<T>,
    buttons: typeContextMenuButton<T>[],
    onClearContextMenu: () => void
}

export default function ContextMenu<T>({
    contextMenuState,
    buttons,
    onClearContextMenu }: typeContextMenuProps<T>) {

    const contextMenuRef = useRef<HTMLMenuElement>(null!)

    function resetContextMenu() {
        console.log("Got to resetContextMenu")
        onClearContextMenu()
    }

    // Setup a catch for clicks that are off the Context Menu.
    useEffect(
        function render() {

            function handleOffClick(e: MouseEvent) {
                if (contextMenuRef.current) {
                    if (contextMenuRef.current.contains(e.target as Node) == false) { resetContextMenu() }
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
            top: contextMenuState.position.y - 20 + "px",
            left: contextMenuState.position.x + 20 + "px"
        }}
        className={"absolute w-full max-w-48 z-10 opacity-100 p-0 rounded-lg shadow-2xl bg-teal-400 text-black flex flex-col"}>

        {
            buttons.map((button, index: number) => {

                function handleClick(e: React.MouseEvent) {
                    e.stopPropagation()
                    resetContextMenu();
                    button.onClick(e, contextMenuState.rightClickedItem)
                }

                return <button
                    key={index}
                    className="p-2 rounded-lg hover:bg-teal-700"
                    onClick={(e) => handleClick(e)}>
                    {button.text}
                </button>
            })
        }
    </menu >
}