import React from "react";
import Navbar from "../Components/navbar";
import Typewriter from "../Components/typewritter";
import Button from "@mui/material/Button";
import logo from '../../assets/logo.png'
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar Home={true} />
     <div className="home">
        <div ><img className="logoImg" src={logo} alt="logo" /></div>
        <Typewriter text="Welcome" />
        <div className="homeText">
          Note Shield - your fortress for digital notes. With Note Shield, your
          thoughts, ideas, and reminders are not just stored, they're
          safeguarded. Our advanced encryption technology ensures that only you
          have access to your notes, providing peace of mind in an online world.
          Whether you're jotting down personal reflections, work memos, or
          creative inspirations, Note Shield keeps your information secure and
          accessible whenever you need it. Experience the confidence of knowing
          that your notes are protected with Note Shield, where privacy meets
          simplicity.
        </div>
       <Link to='/register' className="homeLogin">
        <Button variant="contained">Get Started</Button>
      </Link>
       </div> 

    </>
  );
};

export default Home;
