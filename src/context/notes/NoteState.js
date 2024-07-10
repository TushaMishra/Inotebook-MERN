import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=> {
    const s1 = {
        "name": "Tusha",
        "class": "7A"
    };
    const [state, setState] =  useState(s1);

const update = ()=> {
    setTimeout(() => {
        setState({
            "name": "Lushs",
            "class": "8B"
        })
    }, 1000);
}

    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;