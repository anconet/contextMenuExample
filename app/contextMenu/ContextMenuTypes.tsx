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
    renderContextMenu: (x: number, y: number) => void,
    clearContextMenu: () => void,
    possibleContextMenu: () => React.JSX.Element,
    contextMenuState: typeContextMenuState
}