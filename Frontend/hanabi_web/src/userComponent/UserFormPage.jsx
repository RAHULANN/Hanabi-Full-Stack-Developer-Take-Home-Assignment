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
import LoadingScreen from "../LoadingScreen";
import { toast } from "react-toastify";

export default function UserFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const initState = {
    name: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: date,
  };
  const [userDetails, setUserDetails] = useState(initState);
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
      // if we have user data which we have got in home page then set the data in a state
      let userData = state?.data;
      setUserDetails({
        name: userData?.name,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber,
        dateOfBirth: userData?.dateOfBirth,
      });
    }
    // if someone trying to came directly in this page then we are sending the user to home page

    if (!state) {
      goToHomePage();
    }
  }, []);

  const goToHomePage = () => {
    navigate("/");
    setUserDetails(initState);
  };
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
      // this is a regx for email validate if the email is not in correct formate then we are showing the error message
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

    // this is a regx for Number validate if the phoneNumber is not in correct formate then we are showing the error message

    if (!/^[0-9]+$/.test(userDetails.phoneNumber)) {
      // console.log(isNaN(userDetails.phoneNumber));
      setErrorMessage((prev) => ({
        ...prev,
        phoneNumber: "Enter valid phone number",
      }));

      return false;
    }
    return true;
  };
  const submit = () => {
    // console.log(location);
    let locationData = location?.state;

    let error = formValidator();
    // if we got some error for the formValidator function then return the function
    if (!error) {
      return;
    }

    setLoading(true);
    // if every thing is good then we are making loading true

    // if user is already  register in our DB then then we are calling the patch request and passing Id in params
    // based on the api response we are moving user to another page or showing some error message
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
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong");

          setLoading(false);
        });
    } else {
      // if user is not register in our app then we are making post request with userName
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
          setLoading(false);

          navigate("/result", { state: res.data });
        })
        .catch((err) => {
          setLoading(false);
          toast.error("something went wrong");
          console.log(err);
        });
    }
  };
  return (
    <Box className="formPage">
      <LoadingScreen open={loading} />
      <Box className="homeHeading"> Enter your details</Box>
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

        <Box className="buttonBox">
          <Button className="button" variant="contained" onClick={submit}>
            Submit
          </Button>
          <Button className="button" variant="contained" color="error" onClick={goToHomePage}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
