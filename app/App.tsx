'use client'
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./global.css";
import ContextMenu from "./contextMenu/ContextMenu";
import { typeContextMenuState, typeContextMenuButton } from "./contextMenu/ContextMenuTypes";

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

    const initialContextMenuState: typeContextMenuState = {
        position: { x: 0, y: 0 },
        toggled: false
    }

    const [contextMenuState, setContextMenuState] = useState<typeContextMenuState>(initialContextMenuState)

    function handleOnContextMenu(e: React.MouseEvent, rightClickedPerson: typePerson) {
        e.preventDefault()
        const mouseClickX = e.clientX
        const mouseClickY = e.clientY

        const newContextMenuState: typeContextMenuState = { position: { x: mouseClickX, y: mouseClickY }, toggled: true }
        setContextMenuState(newContextMenuState)
        console.log("Right Click", rightClickedPerson.name)
        //console.log(contextMenuAttr)
    }

    function handleClearContextMenuState(newContextMenuState: typeContextMenuState) {
        console.log("Got to handleClearContextMenuState")
        setContextMenuState(newContextMenuState)
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
                isToggled={contextMenuState.toggled}
                positionX={contextMenuState.position.x}
                positionY={contextMenuState.position.y}
                buttons={buttons}
                onClearContextMenu={handleClearContextMenuState}
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