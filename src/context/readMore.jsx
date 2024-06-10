import React, { createContext, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Form from "react-bootstrap/Form";
import CloseIcon from "@mui/icons-material/Close";
const ReadMore = createContext();

const ReadState = ({ children }) => {
  const [drawers, setDrawers] = useState([]);

  const openDrawer = (title, description) => {
    setDrawers([...drawers, { title, description }]);
  };

  const closeDrawer = (index) => {
    setDrawers(drawers.filter((_, i) => i !== index));
  };

  const list = (title, description, index) => (
    <Box
      key={index}
      sx={{ width: "auto" }}
      role="presentation"
      onKeyDown={() => closeDrawer(index)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 25px 7px 15px",
        }}
      >
        <div style={{ fontSize: "25px" }}>{title}</div>
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={() => closeDrawer(index)}
          fontSize="large"
        />
      </div>
      <Form.Control
        as="textarea"
        value={description}
        style={{
          width: "100%",
          height: "45vh",
          border: "none",
          outline: "none",
        }}
        readOnly
      />
    </Box>
  );

  return (
    <div>
      <ReadMore.Provider value={{ openDrawer }}>
        {children}
        {drawers.map(({ title, description }, index) => (
          <SwipeableDrawer
            key={index}
            anchor="bottom"
            open
            onClose={() => closeDrawer(index)}
            onOpen={() => {}}
          >
            {list(title, description, index)}
          </SwipeableDrawer>
        ))}
      </ReadMore.Provider>
    </div>
  );
};

export { ReadMore, ReadState };
