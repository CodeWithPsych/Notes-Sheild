import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NoteContext from "./noteContext";

const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem("token");

  const getNotes = async () => {
    try {
      if (token) {
        const response = await axios.get("http://localhost:8080/api/getnotes", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        setNotes(response.data);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error fetching notes: ", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`http://localhost:8080/api/deletenote/${id}`, {
          headers: {
            "auth-token": token,
          },
        });
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        toast.success("Note deleted successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error deleting data: " + error);
    }
  };

  const addNote = async (tag, title, description) => {
    try {
      if (title.length === 0 && description.length === 0) {
        return toast.error("Empty fields not acceptable🤐");
      }
      if (title.length === 0) {
        return toast.error("Title required🤐");
      }
      if (title.length > 17) {
        return toast.error("Title less than 17 characters!🤐");
      }
      if (tag.length > 13) {
        return toast.error("Tag less than 13 characters!🤐");
      }
      if (description.length === 0) {
        return toast.error("Description is compulsory🤐");
      }

      if (token) {
        const response = await axios.post(
          "http://localhost:8080/api/addnote",
          { title, description, tag },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        setNotes((prevNotes) => [...prevNotes, response.data]);
        toast.success("Note added");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error adding data: " + error);
    }
  };

  const update = async (idNo, tag, title, description) => {
    try {
      if (title.length === 0 && description.length === 0) {
        return toast.error("Empty fields not acceptable🤐");
      }
      if (title.length === 0) {
        return toast.error("Title required🤐");
      }
      if (title.length > 17) {
        return toast.error("Title less than 17 characters!🤐");
      }
      if (tag.length > 13) {
        return toast.error("Tag less than 13 characters!🤐");
      }
      if (description.length === 0) {
        return toast.error("Description is compulsory🤐");
      }

      if (token) {
        await axios.patch(
          `http://localhost:8080/api/updatenote/${idNo}`,
          { title, description, tag },
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === idNo ? { ...note, title, description, tag } : note
          )
        );
        toast.success("Note updated");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error updating data: " + error);
    }
  };

  useEffect(() => {
    getNotes();
  }, [token]);

  return (
    <NoteContext.Provider
      value={{ notes, deleteNote, update, addNote, getNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
