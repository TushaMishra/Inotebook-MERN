import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3M2U5MzBhOTE1M2NkODYwZTE0MTI5In0sImlhdCI6MTcyMDE2MTE3Nn0.qutbTw_AowbZcHHs15eRG4M1iAWe3uL_uy5cwENpp-4"
      }
    });
    const json = await response.json();

    setNotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3M2U5MzBhOTE1M2NkODYwZTE0MTI5In0sImlhdCI6MTcyMDE2MTE3Nn0.qutbTw_AowbZcHHs15eRG4M1iAWe3uL_uy5cwENpp-4"
      },
      body: JSON.stringify({title, description, tag}),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3M2U5MzBhOTE1M2NkODYwZTE0MTI5In0sImlhdCI6MTcyMDE2MTE3Nn0.qutbTw_AowbZcHHs15eRG4M1iAWe3uL_uy5cwENpp-4"
      },
    });

    const json = response.json();

    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {


    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3M2U5MzBhOTE1M2NkODYwZTE0MTI5In0sImlhdCI6MTcyMDE2MTE3Nn0.qutbTw_AowbZcHHs15eRG4M1iAWe3uL_uy5cwENpp-4"
      },
      body: JSON.stringify({title, description, tag}),
    });

    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;