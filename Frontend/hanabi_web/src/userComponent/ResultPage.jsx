import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./userStyle.css";
import { useNavigate } from "react-router-dom";
export default function ResultPage() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <Box className="formBox">
      <Box> This is result page</Box>
      <Box>
        <Button className="button" variant="contained" onClick={goToHomePage}>
          click to go home page
        </Button>
      </Box>
    </Box>
  );
}
