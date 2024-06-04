import { Button, TextField, Link as MuiLink, Typography, Box, Paper } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../../apis/auth.api";
import { useAppDispatch } from "../../../app/hooks";
import { User } from "../../../models/User";
import { setAuthState } from "../../../slices/auth.slice";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailErrored, setEmailErrored] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErrored, setPasswordErrored] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) {
      setEmailErrored(true);
    } else {
      setEmailErrored(false);
    }
    if (!password) {
      setPasswordErrored(true);
    } else {
      setPasswordErrored(false);
    }
    try {
      const response = (await login({ email, password })) as { data: User };
      dispatch(setAuthState({ user: response.data }));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#281332" 
      padding={2}
      fontFamily="monospace" 
      color="white" 
    >
      <Typography variant="h2" color="white" gutterBottom style={{ fontFamily: 'monospace' }}> 
        MASTERS OF CODE
      </Typography>
      <Paper
        elevation={3}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 320, p: 3, bgcolor: 'white', borderRadius: '8px' }}
      >
        <TextField
          label="Email"
          type="email"
          required
          helperText={emailErrored && "Please enter a valid Email."}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailErrored}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          required
          helperText={passwordErrored && "Password may not be empty."}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordErrored}
          fullWidth
        />
        <Box textAlign="left">
          <Link to="/signup">
            <MuiLink component="span" variant="body2" color="primary">
              Don't have an account? Sign Up
            </MuiLink>
          </Link>
        </Box>
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogin}
        fullWidth
        sx={{ width: 320, mt: 2, bgcolor: '#2c2c2c' }}
      >
        Login
      </Button>
    </Box>
  );
};

export { LoginForm };
