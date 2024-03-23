'use client'
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./global.css";
import ContextMenu from "./contextMenu/ContextMenu";
import { typeContextMenuButton } from "./contextMenu/ContextMenuTypes";
import useContextMenu from "./contextMenu/useContextMenu";

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

    const [
        renderContextMenu,
        clearContextMenu,
        contextMenuState] = useContextMenu();

    function handleOnContextMenu(e: React.MouseEvent, rightClickedPerson: typePerson) {
        e.preventDefault()
        const mouseClickX = e.clientX
        const mouseClickY = e.clientY
        renderContextMenu(mouseClickX, mouseClickY)
        console.log(mouseClickX, mouseClickY)
    }

    const buttons: typeContextMenuButton[] = [
        { text: "Insert Task Above", onClick: () => { console.log("Click 0") } },
        { text: "Insert Task Below", onClick: () => { console.log("Click 1") } },
        { text: "Edit Task", onClick: () => { console.log("Click 2") } },
        { text: "Delete Task", onClick: () => { console.log("Click 3") } }
    ]

    function possibleContextMenu(): React.JSX.Element {
        if (contextMenuState.toggled == true) {
            return <ContextMenu
                contextMenuState={contextMenuState}
                buttons={buttons}
                onClearContextMenu={clearContextMenu}
                rightClickedItem={""}
            ></ContextMenu>
        }
    }

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