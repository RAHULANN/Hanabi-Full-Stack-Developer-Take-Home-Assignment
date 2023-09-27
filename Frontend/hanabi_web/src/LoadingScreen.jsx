import { CircularProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "transparent",
  border: "none",
  p: 4,
};
export default function LoadingScreen({ open }) {
  //   const { loading } = useContext(AuthContext);

  return (
    <Modal open={open}>
      <Box disabled sx={style}>
        <CircularProgress size="100px" sx={{ color: "#3A36DB" }} />
      </Box>
    </Modal>
  );
}
