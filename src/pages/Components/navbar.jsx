import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import toast from "react-hot-toast";
export default function ButtonAppBar({ Home, handleNew }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100vw" }}>
      <AppBar style={{ position: "fixed" }}>
        <Toolbar>
          <img
            src={Logo}
            size="large"
            style={{ width: "52px", height: "52px" }}
            alt="Logo"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes Shield
          </Typography>
          {Home ? (
            <Link style={{ color: "white" }} to="/signin">
              <Button color="inherit">sign in</Button>
            </Link>
          ) : (
            <Stack direction="row" spacing={2}>
              <div>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Avatar src="/broken-image.jpg" />
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                  style={{
                    zIndex: 2,
                  }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <Link
                              style={{ color: "black", textDecoration: "none" }}
                              to="/profile"
                            >
                              <MenuItem >Profile</MenuItem>
                            </Link>
                            <Link
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              {" "}
                              <MenuItem onClick={handleNew}>New Note</MenuItem>
                            </Link>
                            <Link
                              style={{ color: "black", textDecoration: "none" }}
                              to="/"
                            >
                              {" "}
                              <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Link>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
