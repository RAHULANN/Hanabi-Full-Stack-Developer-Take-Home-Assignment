import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./userStyle.css";
import { useNavigate } from "react-router-dom";
import { IP } from "../config";
import axios from "axios";
import LoadingScreen from "../LoadingScreen";
import { toast } from "react-toastify";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const tackUserName = (e) => {
    if (!userName) {
      setUserNameError("Enter username");
      return;
    }
    setLoading(true);
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
        setLoading(false);
        navigate("./user_form", { state: { data: res.data } });
      })
      .catch((err) => {
        console.log(err);
        if (err?.response.data?.message == "no data found") {
          navigate("./user_form", { state: { userName } });
          return;
        }
        toast.error("something went wrong");
        setLoading(false);
      });
  };
  return (
    <Box>
      <LoadingScreen open={loading} />

      <Box className="homePage">
        <Box className="homeHeading">Welcome to your app</Box>
        <Box>
          <TextField
            error={userNameError}
            id="outlined-error-helper-text"
            label="User name"
            defaultValue=""
            type="text"
            value={userName}
            helperText={userNameError}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Button className="button" variant="contained" onClick={tackUserName}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
