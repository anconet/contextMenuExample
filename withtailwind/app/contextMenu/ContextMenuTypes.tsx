import React from "react"

/**
 * @param T: Type of the item the user will right click on.
 */
export type typeContextMenuState<T> = {
    position: { x: number, y: number },
    toggled: boolean,
    rightClickedItem: T
}

/**
 * @param T: Type of the item the user will right click on.
 */
export type typeContextMenuButton<T> = {
    text: string,
    onClick: (
        e: React.MouseEvent,
        rightClickedItem: T) => void
}

/**
 * @param T: Type of the item the user will right click on.
 */
export type typeUseContextMenuReturn<T> = {
    possibleContextMenu: () => React.JSX.Element,
    handleOnContextMenu: (e: React.MouseEvent, rightClickedItem: T) => void,
}