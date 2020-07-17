import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";

import { saveOption, saveAssignees, saveLabels, saveMilestone } from "@Modules/option";

const FilterButton = ({ filter, title, data, initialData = [], saveAssignees }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(initialData);
  const [pendingValue, setPendingValue] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = (event, reason) => {
    if (reason === "toggleInput") return;

    setValue(pendingValue);
    dispatch(
      saveOption(
        pendingValue.map((value) => value.id),
        title
      )
    );

    if (anchorEl) anchorEl.focus();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  const headerMsg = {
    Assignees: "Assign up to 10 people to this issue",
    Labels: "Apply labels to this issue",
    Milestone: "Set milestone",
  };

  return (
    <>
      <div className={classes.root} style={filter ? {} : { width: "221px", paddingBottom: "17px", borderBottom: "1px solid #eee" }}>
        <ButtonBase disableRipple className={classes.button} aria-describedby={id} onClick={handleClick}>
          <span style={filter ? { display: "flex", alignItems: "center", justifyContent: "center" } : {}}>
            {title}
            {filter && <ArrowDropDownIcon />}
          </span>
          {!filter && <SettingsIcon />}
        </ButtonBase>
        {!filter &&
          value.length > 0 &&
          value.map((label) => (
            <div
              key={label.name}
              className={classes.tag}
              style={{
                backgroundColor: label.color,
                color: theme.palette.getContrastText(label.color),
              }}
            >
              {label.name}
            </div>
          ))}
        {!filter && !value.length && <div className={classes.tag}>No {title}</div>}
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" className={classes.popper}>
        <div className={classes.header}>{filter ? `Filter by ${title}` : headerMsg[title]}</div>
        <Autocomplete
          open
          onClose={closeHandler}
          multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={pendingValue}
          onChange={(event, newValue) => {
            setPendingValue(newValue);
          }}
          disableCloseOnSelect
          disablePortal
          renderTags={() => null}
          noOptionsText="No labels"
          renderOption={(option, { selected }) => (
            <>
              <DoneIcon className={classes.iconSelected} style={{ visibility: selected ? "visible" : "hidden" }} />
              {!option.img && <span className={classes.color} style={{ backgroundColor: option.color }} />}
              {option.img && <img src={option.img} className={classes.color} />}
              <div className={classes.text}>
                {option.name}
                <br />
                {option.description}
              </div>
              <CloseIcon className={classes.close} style={{ visibility: selected ? "visible" : "hidden" }} />
            </>
          )}
          options={[...data].sort((a, b) => {
            // Display the selected labels first.
            let ai = value.indexOf(a);
            ai = ai === -1 ? value.length + data.indexOf(a) : ai;
            let bi = value.indexOf(b);
            bi = bi === -1 ? value.length + data.indexOf(b) : bi;
            return ai - bi;
          })}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          renderInput={(params) => <InputBase ref={params.InputProps.ref} inputProps={params.inputProps} autoFocus className={classes.inputBase} />}
        />
      </Popper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 13,
  },
  button: {
    fontSize: 13,
    width: "100%",
    textAlign: "left",
    color: "#586069",
    fontWeight: 600,
    "&:hover,&:focus": {
      color: "#0366d6",
    },
    "& span": {
      width: "100%",
    },
    "& svg": {
      width: 16,
      height: 16,
    },
  },
  tag: {
    marginTop: 3,
    height: 20,
    padding: ".15em 4px",
    fontWeight: 600,
    lineHeight: "15px",
    borderRadius: 2,
  },
  popper: {
    border: "1px solid rgba(27,31,35,.15)",
    boxShadow: "0 3px 12px rgba(27,31,35,.15)",
    borderRadius: 3,
    width: 300,
    zIndex: 2,
    fontSize: 13,
    color: "#586069",
    backgroundColor: "#f6f8fa",
  },
  header: {
    borderBottom: "1px solid #e1e4e8",
    padding: "8px 10px",
    fontWeight: 600,
  },
  inputBase: {
    padding: 10,
    width: "100%",
    borderBottom: "1px solid #dfe2e5",
    "& input": {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      border: "1px solid #ced4da",
      fontSize: 14,
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  paper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13,
  },
  option: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent",
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  popperDisablePortal: {
    position: "relative",
  },
  iconSelected: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginLeft: -2,
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2,
  },
  text: {
    flexGrow: 1,
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18,
  },
}));

export default connect(
  {},
  {
    saveAssignees,
  }
)(FilterButton);
