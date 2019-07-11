import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      height: 400,
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  }));

export default function VirtualizedList() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <FixedSizeList height={200} width={360} itemSize={46} itemCount={200}>
          
        </FixedSizeList>
      </div>
    );
  }