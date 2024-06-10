import React, { createContext, useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Form from "react-bootstrap/Form";
import NoteContext from "./noteContext";
import "./drawer.css";

const DrawerContext = createContext();

const DrawerState = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { addNote, update } = useContext(NoteContext);
  const [drawerName, setDrawerName] = useState("");
  const [id, setId] = useState(null);
  const [initialTag, setInitialTag] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const initialValues = (id, tag, title, description) => {
    setId(id);
    setInitialTag(tag);
    setTag(tag);
    setInitialTitle(title);
    setTitle(title);
    setInitialDescription(description);
    setDescription(description);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleTitle = (event) => {
    if (event.target.value) {
      setTitle(event.target.value);
    }
  };

  const handleTag = (event) => {
    if (event.target.value) {
      setTag(event.target.value);
    }
  };

  const handleDescription = (event) => {
    if (event.target.value) {
      setDescription(event.target.value);
    }
  };

  const toggleDrawer = () => {
    setOpen(true);
  };

  const handledrawername = (name) => {
    setDrawerName(name);
  };

  const handleSubmit = () => {
    if (id === null) {
      addNote(tag, title, description);
    } else {
      update(id, tag, title, description);
    }
    setId(null);
    setInitialTag("");
    setInitialTitle("");
    setInitialDescription("");
    setTag("");
    setTitle("");
    setDescription("");
    handleDrawerClose();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setId(null);
    setInitialTag("");
    setInitialTitle("");
    setInitialDescription("");
    setTag("");
    setTitle("");
    setDescription("");
  };

  const DrawerContent = (
    <Box
      style={{ display: "flex", flexDirection: "column" }}
      role="presentation"
      className="drawer"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "18px 25px",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
          {drawerName}
        </span>
        <Button variant="contained" onClick={handleDrawerClose}>
          <CloseIcon />
        </Button>
      </div>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Tag"
          defaultValue={initialTag}
          onChange={handleTag}
          variant="outlined"
          style={{
            margin: "12px",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Title*"
          variant="outlined"
          defaultValue={initialTitle}
          onChange={handleTitle}
          style={{
            margin: "0 12px 12px 12px",
          }}
        />
      </List>
      <div className="drawerDescription">
        <Form.Control
          as="textarea"
          rows={6}
          defaultValue={initialDescription}
          placeholder="Description*"
          onChange={handleDescription}
          style={{ width: "100%" }}
        />

        <Button
          variant="contained"
          style={{ width: "120px", margin: "12px 5px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Box>
  );

  return (
    <DrawerContext.Provider
      value={{ toggleDrawer, formatDate, handledrawername, initialValues }}
    >
      {children}
      <Drawer open={open} onClose={handleDrawerClose}>
        {DrawerContent}
      </Drawer>
    </DrawerContext.Provider>
  );
};

export { DrawerState, DrawerContext };
