import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "5px 0 20px 0",
  },
  textField: {
    width: "50%",
    backgroundColor: "#fafbfc",
    border: "1px solid #eee",
    padding: 10,
    borderRadius: 5,
  },
}));

const DatePickers = ({ defaultValue }) => {
  const classes = useStyles();

  return (
    <>
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          defaultValue={defaultValue}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            style: { padding: 0, fontSize: "13px" },
          }}
          InputProps={{ disableUnderline: true }}
        />
      </form>
    </>
  );
};

export default DatePickers;
