import { Button, TextField, Link as MuiLink, Typography, Box, Paper, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import styled from '@emotion/styled';
import { useAuth } from "../../../apis/authcontext";
import { AxiosError } from "axios";
import Alert from '@mui/material/Alert';

const Logout: React.FC = () => {

  const { logout } = useAuth();

  logout();

  return (<></>);

};

export { Logout };
