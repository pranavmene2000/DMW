import React from 'react';
import {
  IconButton,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  snackbar: {
    "& > .MuiSnackbarContent-root": {
      color: "#000000",
      backgroundColor: "#FFFFFF"
    }
  },
}));

const ErrorSnackbar = ({error,setError}) => {

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
  };

    return (
        <div>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              open={!!error}
              autoHideDuration={3000}
              onClose={handleClose}
              message={error}
              className={classes.snackbar}
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
        </div>
    )
}

export default ErrorSnackbar
