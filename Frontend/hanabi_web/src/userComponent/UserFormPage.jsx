import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./userStyle.css";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { IP } from "../config";
import axios from "axios";
export default function UserFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const [userDetails, setUserDetails] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: date,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
  });
  //   console.log(date);
  useEffect(() => {
    let state = location?.state;
    if (state?.data) {
      let userData = state?.data;
      setUserDetails({
        name: userData?.name,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber,
        dateOfBirth: userData?.dateOfBirth,
      });
    }
    if (!state) {
      navigate("/");
    }
  }, []);
  const formValidator = () => {
    if (userDetails.name == "") {
      setErrorMessage((prev) => ({ ...prev, name: "Enter user name" }));
      return false;
    }
    if (!userDetails.email) {
      setErrorMessage((prev) => ({ ...prev, email: "Enter email address!" }));

      return false;
    }

    if (userDetails.email !== "") {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)
      ) {
        // return true;
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          email: "You have entered an invalid email address!",
        }));

        return false;
      }
    }

    if (!userDetails.dateOfBirth) {
      setErrorMessage((prev) => ({
        ...prev,
        dateOfBirth: "Enter date of birth",
      }));

      return false;
    }

    if (!userDetails.phoneNumber) {
      setErrorMessage((prev) => ({
        ...prev,
        phoneNumber: "Enter phone number",
      }));

      return false;
    }

    return true;
  };
  const submit = () => {
    // console.log(location);
    let locationData = location?.state;

    let error = formValidator();
    if (!error) {
      return;
    }

    if (locationData?.data) {
      const data = JSON.stringify({
        name: userDetails?.name,
        email: userDetails?.email,
        phoneNumber: userDetails?.phoneNumber,
        dateOfBirth: userDetails?.dateOfBirth,
      });
      let axiosConfig = {
        method: "patch",

        url: `${IP}/user/${locationData?.data?._id}`,

        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(axiosConfig)
        .then((res) => {
          console.log(res.data);
          navigate("/result", { state: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = JSON.stringify({
        name: userDetails?.name,
        email: userDetails?.email,
        phoneNumber: userDetails?.phoneNumber,
        dateOfBirth: userDetails?.dateOfBirth,
        userName: locationData?.userName,
      });
      let axiosConfig = {
        method: "post",

        url: `${IP}/user`,

        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(axiosConfig)
        .then((res) => {
          console.log(res.data);
          navigate("/result", { state: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Box component="form" className="formBox" noValidate autoComplete="off">
      <Box>
        <TextField
          error={errorMessage?.name}
          id="outlined-error-helper-text"
          label="Name"
          type="text"
          defaultValue=""
          value={userDetails.name}
          helperText={errorMessage?.name}
          onChange={(e) => {
            setUserDetails((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </Box>
      <Box>
        <TextField
          error={errorMessage?.email}
          id="outlined-error-helper-text"
          label="Email"
          defaultValue=""
          type="email"
          value={userDetails.email}
          helperText={errorMessage?.email}
          onChange={(e) => {
            setUserDetails((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
      </Box>
      <Box>
        <TextField
          error={errorMessage?.phoneNumber}
          id="outlined-error-helper-text"
          label="Phone number"
          type="number"
          defaultValue=""
          value={userDetails.phoneNumber}
          helperText={errorMessage?.phoneNumber}
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
            }));
          }}
        />
      </Box>
      <Box>
        <TextField
          error={errorMessage?.dateOfBirth}
          id="outlined-error-helper-text"
          label="Date of birth"
          type="date"
          value={userDetails.dateOfBirth}
          // format="DD-MM-YYYY"
          //   value={date}
          placeholder=""
          helperText={errorMessage?.dateOfBirth}
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              dateOfBirth: e.target.value,
            }));
          }}
        />
      </Box>

      <Box>
        <Button className="button" variant="contained" onClick={submit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
