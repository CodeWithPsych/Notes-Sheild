import React, { useState, useContext } from "react";
import "./signin.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import NoteState from "../../context/noteContext";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const context = useContext(NoteState);
  const { getNotes } = context;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setMail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (password !== "" && password === confirmPassword) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/createuser",
          {
            name,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.removeItem("token");
        const json = response.data;
        if (json.authToken) {
          toast.success("User Created");
          localStorage.setItem("token", json.authToken);
          console.log(json.authToken);
          await getNotes();
          navigate("/main");
        } else {
          toast.error(json.message);
        }
      } catch (error) {
        toast.error("User exist please try again with different mail address.");
        console.error("Error creating user: ", error);
      }
    } else {
      toast.error("Passwords must match and cannot be empty.");
    }
  };

  return (
    <div className="signin">
      <div className="box">
        <h1>Get Started</h1>
        <div className="avatar">
          <Avatar
            src="/broken-image.jpg"
            style={{ width: "80px", height: "78px" }}
          />
        </div>
        <div className="register-text-field">
          <TextField
            style={{ padding: "8px 0" }}
            id="name"
            label="Full Name"
            onChange={handleName}
            variant="standard"
          />
          <TextField
            style={{ padding: "8px 0" }}
            id="email"
            label="Email address"
            variant="standard"
            onChange={handleEmail}
          />
          <TextField
            style={{ padding: "8px 0" }}
            id="password"
            label="Password"
            type="password"
            variant="standard"
            onChange={handlePassword}
          />
          <TextField
            style={{ padding: "8px 0" }}
            id="confirm-password"
            label="Confirm password"
            type="password"
            variant="standard"
            onChange={handleConfirmPassword}
          />
        </div>
        <div className="account">
          <span>Have an account? </span>
          <Link to="/signin">Login</Link>
        </div>
        <Button variant="outlined" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
