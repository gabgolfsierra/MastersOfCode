import { Button, TextField, Link as MuiLink, Typography, Box, Paper } from "@mui/material";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../slices/auth.slice";
import { CdMirror } from "../components/code-mirror.component";

const HomePage: React.FC = () => {
  const user = useAppSelector((state) => selectCurrentUser(state));

  return (
    
     <>
     <Typography fontFamily={"-moz-initial"} variant="h2" color="#212121" gutterBottom>
      Welcome to Masters Of Code!
    </Typography><CdMirror /></>
    
  );
};

export { HomePage };