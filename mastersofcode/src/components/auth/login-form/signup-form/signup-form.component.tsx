import { Button, TextField, Link as MuiLink, Box, Paper, Typography, IconButton, InputAdornment, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useAuth } from "../../../../apis/authcontext";
import { AxiosError } from "axios";
import Alert from '@mui/material/Alert';

const ParallaxBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2;
  background-color: #1a1a1a; 
  overflow: hidden;
  position: relative;
`;

const ParallaxLayer = styled.div`
  position: absolute;
  background: url('https://www.transparenttextures.com/patterns/clean-gray-paper.png'); 
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  opacity: 0.2;
  transition: transform 0.1s ease-out;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 20px; 
  width: 320px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  backface-visibility: hidden;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    color: #fff;
  }
  & .MuiFormLabel-root {
    color: #ccc;
  }
  & .MuiInput-underline:before {
    border-bottom-color: #ccc;
  }
  & .MuiInput-underline:hover:before {
    border-bottom-color: #fff;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #4caf50;
  }
`;

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailErrored, setEmailErrored] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErrored, setPasswordErrored] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrored, setConfirmPasswordErrored] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error message
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const parallaxLayer = document.getElementById('parallax-layer');
      if (parallaxLayer) {
        const x = (window.innerWidth - event.clientX * 10) / 100;
        const y = (window.innerHeight - event.clientY * 10) / 100;
        parallaxLayer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCloseSnackbar = () => {
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setEmailErrored(true);
      return;
    } else {
      setEmailErrored(false);
    }

    if (!password) {
      setPasswordErrored(true);
      return;
    } else {
      setPasswordErrored(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordErrored(true);
      setError("Passwords do not match.");
      return;
    } else {
      setConfirmPasswordErrored(false);
    }

    try {
      await register(email, password);
      navigate('/login');
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 500) {
          setError("User already exists. Try another email.");
        } else {
          setError("Unexpected error occurred.");
        }
      }
    }
  };

  function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ParallaxBox>
      <ParallaxLayer id="parallax-layer" />
      <Typography fontFamily={"-moz-initial"} variant="h2" color="#ffffff" gutterBottom>
        CREATE YOUR ACCOUNT
      </Typography>
      <StyledPaper elevation={3}>
        <StyledTextField
          label="Email"
          type="email"
          required
          helperText={emailErrored && "Please enter a valid Email."}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailErrored}
          fullWidth
        />

        <StyledTextField
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
        <StyledTextField
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
      </StyledPaper>
      <Button
        variant="contained"
        color="warning"
        onClick={handleSubmit}
        sx={{ width: 320, mt: 2 }}
      >
        Sign Up
      </Button>


      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={!!error}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </ParallaxBox>
  );
};

export { SignupForm };
