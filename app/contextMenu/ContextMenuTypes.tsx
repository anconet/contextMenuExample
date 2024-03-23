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

export type typeUseContextMenuReturn = [
    (x: number, y: number) => void,
    () => void,
    typeContextMenuState]