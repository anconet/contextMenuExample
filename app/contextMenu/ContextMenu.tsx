import "./ContextMenu.css"

type typeContextMenuProps = {
    rightClickedItem: any,
    positionX: number,
    positionY: number,
    isToggled: boolean,
    buttons: any,
    contextMenuRef: any
}

export default function ContextMenu({
    rightClickedItem,
    positionX,
    positionY,
    isToggled,
    buttons,
    contextMenuRef }: typeContextMenuProps) {

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