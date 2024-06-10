import React, { useContext, useState} from "react";
import "./main.css";
import Navbar from "../Components/navbar";
import Button from "@mui/material/Button";
import Card from "../Components/card";
import NoteContext from "../../context/noteContext";
import { DrawerContext } from "../../context/drawerState";
import { ReadMore } from "../../context/readMore";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";

const Main = () => {
  const context = useContext(NoteContext);
  const { notes, deleteNote  } = context;
  const { toggleDrawer, formatDate, handledrawername, initialValues } = useContext(DrawerContext);
  const { openDrawer } = useContext(ReadMore);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleDelete = (id) => {
    setIdToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (idToDelete) {
      try {
        await deleteNote(idToDelete);
        setIdToDelete(null);
      } catch (error) {
        console.error("Error deleting note: ", error);
      }
    }
  };

  const handleDrawer = () => {
    handledrawername("Add Note");
    toggleDrawer();
  };

  const handleEditNote = (note) => {
    initialValues(note._id, note.tag, note.title, note.description);
    toggleDrawer();
    handledrawername("Edit Note");
  };

  const readMore = (title, description) => {
    openDrawer(title, description);
  };

  return (
    <div>
      <Navbar Home={false} handleNew={handleDrawer} />
      {idToDelete && (
        <div className="check" style={{ display: "flex" }}>
          <div className="alert" style={{ display: "flex" }}>
            <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
              <ErrorIcon /> Are you sure you want to delete the note permanently?
            </div>
            <div className="alertBtn">
              <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                <DeleteIcon fontSize="small" /> Confirm
              </Button>
              <Button variant="contained" onClick={() => setIdToDelete(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="header">
        <div className="right">Your Notes</div>
        <div className="left">
          <span>Add Note</span>
          <Button onClick={handleDrawer} variant="contained" style={{ zIndex: 2 }}>+</Button>
        </div>
      </div>
      <div className="Cards">
        {notes.map((note) => (
          <Card
            key={note._id}
            tag={note.tag}
            title={note.title}
            description={note.description}
            date={formatDate(note.date)}
            handleDelete={() => handleDelete(note._id)}
            handleEdit={() => handleEditNote(note)}
            readMore={() => readMore(note.title, note.description)}
          />
        ))}
      </div>
      <div style={{ height: "500px" }}> </div>
    </div>
  );
};

export default Main;
