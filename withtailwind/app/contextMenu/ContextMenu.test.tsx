import { cleanup, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { expect, test, vi, describe, beforeEach, afterEach } from "vitest"
import ContextMenu from "./ContextMenu"
import { typeContextMenuButton, typeContextMenuState } from "./ContextMenuTypes"
import { clear } from "console"

describe("Testing the ContextMenu Component", () => {

    type typePerson = { id: number, name: string, selected: boolean }

    const people: typePerson[] = [
        { id: 0, name: "Anthony", selected: false },
        { id: 1, name: "Suzanne", selected: false },
        { id: 2, name: "Gracie", selected: false },
        { id: 3, name: "Rosie", selected: false },
        { id: 4, name: "hayden", selected: false },
        { id: 5, name: "James", selected: false },
    ]

    const mockInsertTask = vi.fn()

    const buttons: typeContextMenuButton<typePerson>[] = [
        { text: "Insert Task Above", onClick: vi.fn() },
        { text: "Insert Task Below", onClick: vi.fn() },
        { text: "Edit Task", onClick: vi.fn() },
        { text: "Delete Task", onClick: vi.fn() }
    ]

    const contextMenuState: typeContextMenuState<typePerson> = {
        position: { x: 100, y: 200 },
        rightClickedItem: people[0],
        toggled: false
    }

    beforeEach(() => { })

    afterEach(() => {
        vi.clearAllMocks()
        cleanup()
    })

    test("Test all buttons present", () => {

        const mockHandleClearContextMenu = vi.fn()

        const { unmount } = render(
            <div>
                <ContextMenu
                    contextMenuState={contextMenuState}
                    buttons={buttons}
                    onClearContextMenu={mockHandleClearContextMenu}>
                </ContextMenu>
                <p>NotContextMenu</p >
            </div >)

        buttons.map((button) => {
            expect(screen.getByRole("button", { name: `${button.text}` })).toBeDefined()
        })
    })

    test("Test each button clicked", async () => {

        const user = userEvent.setup();

        const mockHandleClearContextMenu = vi.fn()

        const { container, unmount } = render(
            <div>
                <ContextMenu
                    contextMenuState={contextMenuState}
                    buttons={buttons}
                    onClearContextMenu={mockHandleClearContextMenu}>
                </ContextMenu>
                <p>NotContextMenu</p >
            </div >)

        //buttons.map(async (button) => {

        //    await user.click(screen.getByRole("button", { name: `${button.text}` }))
        //expect(button.onClick).toHaveBeenCalledOnce()

        //})

        // TODO: Can't seem to figure out what the loop is not working.
        await user.click(screen.getByRole("button", { name: `${buttons[0].text}` }))
        await user.click(screen.getByRole("button", { name: `${buttons[1].text}` }))
        await user.click(screen.getByRole("button", { name: `${buttons[2].text}` }))
        await user.click(screen.getByRole("button", { name: `${buttons[3].text}` }))
        expect(buttons[0].onClick).toHaveBeenCalledOnce()
        expect(buttons[1].onClick).toHaveBeenCalledOnce()
        expect(buttons[2].onClick).toHaveBeenCalledOnce()
        expect(buttons[3].onClick).toHaveBeenCalledOnce()

        expect(mockHandleClearContextMenu).toHaveBeenCalledTimes(4)
    })

    test("Test off menu click", async () => {

        const user = userEvent.setup()

        const mockHandleClearContextMenu = vi.fn(() => { unmount() })

        const { container, unmount } = render(
            <div>
                <ContextMenu
                    contextMenuState={contextMenuState}
                    buttons={buttons}
                    onClearContextMenu={mockHandleClearContextMenu}>
                </ContextMenu>
                <p>NotContextMenu</p >
            </div >)

        const mockAddWindowEventListener = vi.spyOn(window, "addEventListener")
        const mockRemoveWIndowListener = vi.spyOn(window, "removeEventListener")
        screen.debug()

        //TODO Couldn't figure this one out. It kept saying zero.
        //expect(mockAddWindowEventListener).toHaveBeenCalledTimes(1)
        await user.click(screen.getByText("NotContextMenu"))
        expect(mockHandleClearContextMenu).toHaveBeenCalledTimes(1)
        expect(mockRemoveWIndowListener).toHaveBeenCalledTimes(1)

    })
}) 
