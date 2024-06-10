import React, { useState, useEffect } from "react";

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) => prevText + text.charAt(index));
      setIndex((prevIndex) => prevIndex + 1);
    }, 80);

    return () => clearInterval(interval);
  }, [index, text]);

  return (
    <>
      {" "}
      <div style={{ fontSize: "36px" }}>{displayText}</div>
    </>
  );
};

export default Typewriter;
