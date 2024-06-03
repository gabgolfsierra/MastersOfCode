import React from "react";
import { Button, Typography, Box, Paper, Link } from "@mui/material";
import { CdMirror } from "../components/code-mirror.component";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
    
  },
  title: {
    bottom: 200,
    color: "#3f51b5",
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Welcome to Masters Of Code!
      </Typography>
      <Box>
        <CdMirror />
      </Box>
    </Paper>
  );
};

export { HomePage };
