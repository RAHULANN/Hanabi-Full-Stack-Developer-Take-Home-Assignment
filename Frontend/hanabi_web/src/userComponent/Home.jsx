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
  const SubmitUserName = () => {
    // This function will get user details from db which we can use for next page
    // after getting the response i am validating the user data if we get data then send this data in UserFormPage

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
        // navigate will navigate to /user_form page with some data which i am passing in state of react router
        navigate("./user_form", { state: { data: res.data } });
      })
      .catch((err) => {
        console.log(err);
        // if we got no data found message then we navigate the user to user_form page
        // with state which will have value of userName which user have entered in form
        if (err?.response.data?.message == "no data found") {
          navigate("./user_form", { state: { userName } });
          return;
        }
        // if we got different error then toasting the message
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
          <Button
            className="button"
            variant="contained"
            onClick={SubmitUserName}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
