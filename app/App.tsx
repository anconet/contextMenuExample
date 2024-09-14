'use client'
import React, { useState } from "react";
import "./App.css";
import { typeContextMenuButton, typeUseContextMenuReturn } from "./contextMenu/ContextMenuTypes";
import useContextMenu from "./contextMenu/useContextMenu";
import "./global.css";

export default function App() {

    type typePerson = { id: number, name: string, selected: boolean }

    const initialPeople: typePerson[] = [
        { id: 0, name: "Anthony", selected: false },
        { id: 1, name: "Suzanne", selected: false },
        { id: 2, name: "Gracie", selected: false },
        { id: 3, name: "Rosie", selected: false },
        { id: 4, name: "hayden", selected: false },
        { id: 5, name: "James", selected: false },
    ]

    const [people, setPeople] = useState<typePerson[]>(initialPeople)

    // ------------------------------------------------------------------------------
    // Context Menu Config:

    const buttons: typeContextMenuButton<typePerson>[] = [
        { text: "Insert Task Above", onClick: (e, rightClickedItem) => { console.log("Click 0: ", rightClickedItem.name) } },
        { text: "Insert Task Below", onClick: () => { console.log("Click 1") } },
        { text: "Edit Task", onClick: () => { console.log("Click 2") } },
        { text: "Delete Task", onClick: () => { console.log("Click 3") } }
    ]

    const {
        possibleContextMenu,
        handleOnContextMenu,
    }: typeUseContextMenuReturn<typePerson> = useContextMenu<typePerson>(buttons);

    return <div>
        <ul>{people.map((person, index) => {
            return <li
                key={index}
                className="customLi"
                onContextMenu={(e) => handleOnContextMenu(e, person)}>
                {person.name}</li>
        })}
        </ul>
        {possibleContextMenu()}
    </div>
}