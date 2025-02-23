import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";

const VuiSnackbar = ({ open, close, content, color = "info" }) => {
  return (
    <Snackbar open={open} onClose={close} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <MuiAlert onClose={close} severity={color} sx={{ width: "100%", whiteSpace: "pre-line" }}>
        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {content}
        </Typography>
      </MuiAlert>
    </Snackbar>
  );
};

export default VuiSnackbar;
