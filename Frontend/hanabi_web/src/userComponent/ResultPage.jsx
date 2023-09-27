import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./userStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state;
  useEffect(() => {
    // if someone trying to came directly in this page then we are sending the user to home page
    if (!locationState) {
      goToHomePage();
    }
  }, []);
  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <Box className="formPage">
      {/* <Box> This is result page</Box> */}
      <Box>
        <Button className="button " variant="contained" onClick={goToHomePage}>
          click to go home page
        </Button>
      </Box>
      <Box className="formTable formPage">
        <Box className="homeHeading">
          {" "}
          Congratulation your details are saved
        </Box>
        <Box className="formTableRow">
          {" "}
          <Box>User name :</Box>
          <Box>{locationState?.userName}</Box>{" "}
        </Box>
        <Box className="formTableRow">
          {" "}
          <Box>Name :</Box>
          <Box>{locationState?.name}</Box>{" "}
        </Box>
        <Box className="formTableRow">
          {" "}
          <Box>Email :</Box>
          <Box>{locationState?.email}</Box>{" "}
        </Box>
        <Box className="formTableRow">
          {" "}
          <Box>Phone number :</Box>
          <Box>{locationState?.phoneNumber}</Box>{" "}
        </Box>
        <Box className="formTableRow">
          {" "}
          <Box>Date of birth :</Box>
          <Box>{locationState?.dateOfBirth}</Box>{" "}
        </Box>
      </Box>
    </Box>
  );
}
