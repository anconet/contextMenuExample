import { expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import useContextMenu from "./useContextMenu"
import { typeContextMenuButton, typeUseContextMenuReturn } from "./ContextMenuTypes"


test("Test UseContextMenu", async () => {

    const mockInsertTask = vi.fn()

    function Page() {

        type typePerson = { id: number, name: string, selected: boolean }

        const people: typePerson[] = [
            { id: 0, name: "Anthony", selected: false },
            { id: 1, name: "Suzanne", selected: false },
            { id: 2, name: "Gracie", selected: false },
            { id: 3, name: "Rosie", selected: false },
            { id: 4, name: "hayden", selected: false },
            { id: 5, name: "James", selected: false },
        ]

        const buttons: typeContextMenuButton<typePerson>[] = [
            { text: "Insert Task Above", onClick: mockInsertTask },
            { text: "Insert Task Below", onClick: () => { console.log("Click 1") } },
            { text: "Edit Task", onClick: () => { console.log("Click 2") } },
            { text: "Delete Task", onClick: () => { console.log("Click 3") } }
        ]

        const {
            handleOnContextMenu,
            possibleContextMenu
        }: typeUseContextMenuReturn<typePerson> = useContextMenu<typePerson>(buttons)

        return <div className="h-screen bg-slate-800 flex justify-center items-center ">
            <ul className="w-64 flex flex-col items-stretch">
                {people.map((person, index) => {
                    return <li className="text-center py-4 border rounded-lg border-white hover:bg-slate-600"
                        key={index}
                        onContextMenu={(e) => handleOnContextMenu(e, person)}>
                        {person.name}</li>
                })}
            </ul>
            {possibleContextMenu()}
        </div>
    }

    const testPage = render(<Page />)
    const user = userEvent.setup()
    const item = screen.getByText("Anthony")

    // Verify Context Menu Not there
    expect(screen.queryByText("Insert Task Above")).toBeNull()

    //Click
    await user.pointer({ keys: '[MouseRight]', target: item })

    // Verify Context Menu is there
    expect(screen.getByText("Insert Task Above")).toBeDefined()

    //Select Item
    await user.pointer({
        keys: '[MouseLeft]',
        target: screen.getByText("Insert Task Above")
    })
    screen.debug()

    // Verify the menu disaappears
    expect(screen.queryByText("Insert Task Above")).toBeNull()

    // Verify the associated function was called
    expect(mockInsertTask).toBeCalledTimes(1)

})