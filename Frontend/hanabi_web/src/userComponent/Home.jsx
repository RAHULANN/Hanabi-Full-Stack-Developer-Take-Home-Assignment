import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./userStyle.css";
import { useNavigate } from "react-router-dom";
import { IP } from "../config";
import axios from "axios";

export default function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const tackUserName = (e) => {
    let axiosConfig = {
      method: "get",

      url: `${IP}/user/${userName}`,

      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(axiosConfig)
      .then((res) => {
        console.log(res.data);
        navigate("./user_form", { state: { data: res.data } });
      })
      .catch((err) => {
        // console.log(err);
        navigate("./user_form", { state: { userName } });
      });
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="user name"
        variant="outlined"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <Button className="button" variant="contained" onClick={tackUserName}>
        Contained
      </Button>
    </Box>
  );
}
