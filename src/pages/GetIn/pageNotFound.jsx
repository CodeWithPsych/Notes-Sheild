import React from "react";
import NotFoundImage from "../../assets/pageNotFound.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width:'100vw',
        height:'80vh'
      }}
    >

      <img
        className="max-w-full max-h-full"
        src={NotFoundImage}
        style={{width:'70%',height:'50%'}}
        alt="Page Not Found"
      />
      <Link to="/">
        <Button variant="outlined" color="error">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
