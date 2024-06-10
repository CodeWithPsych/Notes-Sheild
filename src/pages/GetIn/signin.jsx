import React, { useState, useContext } from "react";
import "./signin.css";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import NoteState from "../../context/noteContext";

const Username = () => {
  const context = useContext(NoteState);
  const { getNotes } = context;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    if (e.target.value) {
      setEmail(e.target.value);
    }
  };

  const handlePassword = (e) => {
    if (e.target.value) {
      setPassword(e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.data;
      if (json.authToken) {
        localStorage.setItem("token", json.authToken);
        await getNotes();
        navigate("/main");
      } else {
        toast.error("Login failed: " + json.message);
      }
    } catch (error) {
      toast.error("Login with correct credentials");
      console.log("Error fetching about data: ", error);
    }
  };

  return (
    <div className="signin">
      <div className="box" onKeyDown={handleKeyDown}>
        <h1>Welcome Back</h1>
        <div className="avatar">
          <Avatar
            src="/broken-image.jpg"
            style={{ width: "80px", height: "78px" }}
          />
        </div>
        <span>Enter email and password to proceed</span>
        <div className="text-field">
          {/* Email */}
          <TextField
            style={{ marginBottom: "8px" }}
            required
            id="outlined-required"
            label="Email"
            onChange={handleEmail}
          />
          {/* Password */}
          <TextField
            required
            id="outlined-required"
            label="Password"
            type="password"
            onChange={handlePassword}
          />
        </div>
        <div className="account">
          <span>Don't have an account?&nbsp;</span>
          <Link to="/register">Sign up</Link>
        </div>
        <Button variant="outlined" onClick={login}>
          Let's go
        </Button>
      </div>
    </div>
  );
};

export default Username;
