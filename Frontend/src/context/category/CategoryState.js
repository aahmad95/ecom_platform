import React from "react";
import CategoryContext from "./categoryContext";
import { useState } from "react";
import axios from "axios";

const CategoryState = (props) => {
  const [categories, setCategories] = useState([]);
  const host = "http://localhost:5000";

  //Get all Categories:
  const getCategories = async () => {
    //     //API Call
    //     var requestOptions = {
    //       method: "GET",
    //       redirect: "follow",
    //     };
    //     const response = await fetch(
    //       `${host}/category/getAllCategory`,
    //       requestOptions
    //     );
    //     const json = await response.json(); // parses JSON response into native JavaScript objects
    const { data } = await axios.get(`${host}/category/getAllCategory`);
    //Logic for adding note:
    console.log(data);

    setCategories(data);
  };

  //   //Add a Note:
  //   const addNote = async (title, description, tag) => {
  //     //API Call

  //     //check if the tag is empty set it to deafult.
  //     tag = `${tag ? tag : "General"}`;
  //     // console.log(typeof tag);

  //     const response = await fetch(`${host}/api/notes/addnote`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },

  //       body: JSON.stringify({ title, description, tag }),
  //     });

  //     //Logic for adding note:
  //     console.log("Adding a new note");
  //     await getNotes();

  //     // const note = await response.json();
  //     console.log(response);
  //     // setNotes(notes.concat(note));
  //   };

  //   //Delete a Note:
  //   const deleteNote = async (id) => {
  //     //API Call
  //     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //     });
  //     // const json = response.json(); // parses JSON response into native JavaScript objects

  //     console.log(response);

  //     //Delete Note Logic
  //     console.log(`Note Deleted note with id: ${id}`);
  //     await getNotes();
  //     // const newNotes = notes.filter((note) => {
  //     //   return note._id !== id;
  //     // });
  //     // setNotes(newNotes);
  //   };

  //   //Edit a Note:
  //   const editNote = async (id, title, description, tag) => {
  //     //API Call
  //     console.log("title =>>", title);
  //     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //       method: "PUT",

  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },

  //       body: JSON.stringify({ title, description, tag }),
  //     });

  //     // Logic to edit in client side:
  //     console.log("Note has been updated succesfully", response);

  //     await getNotes();
  //     // const newNotes = notes;
  //     // for (let i = 0; i < newNotes.length; i++) {
  //     //   const note = newNotes[i];
  //     //   console.log(note);
  //     //   if (note._id === id) {
  //     //     note.title = title;
  //     //     note.description = description;
  //     //     note.tag = tag;
  //     //     console.log(note);
  //     //     break;
  //     //   }
  //     // }
  //     // console.log(newNotes);
  //     // setNotes(newNotes);
  //   };

  return (
    <CategoryContext.Provider value={{ categories, getCategories }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
