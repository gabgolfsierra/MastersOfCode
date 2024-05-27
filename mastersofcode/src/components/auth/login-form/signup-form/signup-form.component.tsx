import { Button, TextField, Link as MuiLink, Box, Paper, Typography, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { User } from "../../../../models/User";
import { useLoginMutation } from "../../../../apis/auth.api";
import { useCreateUserMutation } from "../../../../apis/users.api";
import { useAppDispatch } from "../../../../app/hooks";
import { setAuthState } from "../../../../slices/auth.slice";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailErrored, setEmailErrored] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErrored, setPasswordErrored] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrored, setConfirmPasswordErrored] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [createUser] = useCreateUserMutation();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignup = async () => {
    let isValid = true;

    if (!email) {
      setEmailErrored(true);
      isValid = false;
    } else {
      setEmailErrored(false);
    }

    if (!password) {
      setPasswordErrored(true);
      isValid = false;
    } else {
      setPasswordErrored(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordErrored(true);
      isValid = false;
    } else {
      setConfirmPasswordErrored(false);
    }

    if (isValid) {
      try {
        await createUser({ email, password });
        const response = (await login({ email, password })) as { data: User };
        dispatch(setAuthState({ user: response.data }));
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#424242"
      padding={2}
      gap={2}
    >
      <Typography fontFamily={"-moz-initial"} variant="h2" color="#212121" gutterBottom>
        Create your account
      </Typography>
      <Paper
        elevation={3}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 320, p: 3, bgcolor: 'black' }}
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
          type={showPassword ? "text" : "password"}
          required
          helperText={passwordErrored && "Password may not be empty."}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordErrored}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          required
          helperText={confirmPasswordErrored && "Passwords do not match."}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={confirmPasswordErrored}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box textAlign="left" mt={2}>
          <Link to="/login">
            <MuiLink component="span" variant="body2" color="info.main">
              Return to login page
            </MuiLink>
          </Link>
        </Box>
      </Paper>
      <Button
        variant="contained"
        color="success"
        onClick={handleSignup}
        sx={{ width: 320, mt: 2}}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export { SignupForm };
