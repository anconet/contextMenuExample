import React from "react"

export type typeContextMenuState = {
    position: { x: number, y: number },
    toggled: boolean
}

export type typeContextMenuButton = {
    text: string,
    onClick: (
        e: React.MouseEvent,
        rightClickedItem: any) => void
}

export type typeUseContextMenuReturn = {
    possibleContextMenu: () => React.JSX.Element,
    handleOnContextMenu: (e: React.MouseEvent, rightClickedItem: any) => void,
}