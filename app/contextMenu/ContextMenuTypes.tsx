import React from "react"

export type typeContextMenuState<T> = {
    position: { x: number, y: number },
    toggled: boolean,
    rightClickedItem: T
}

export type typeContextMenuButton = {
    text: string,
    onClick: <T>(
        e: React.MouseEvent,
        rightClickedItem: T) => void
}

export type typeUseContextMenuReturn<T> = {
    possibleContextMenu: () => React.JSX.Element,
    handleOnContextMenu: (e: React.MouseEvent, rightClickedItem: T) => void,
}