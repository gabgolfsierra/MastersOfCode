import { Button, TextField, Link as MuiLink, Typography, Box, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../../apis/auth.api";
import { useAppDispatch } from "../../../app/hooks";
import { User } from "../../../models/User";
import { setAuthState } from "../../../slices/auth.slice";
import styled from '@emotion/styled';

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
  gap: 7px;
  width: 320px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  backface-visibility: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.03);
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

const LoginForm: React.FC = () => {
  const [errorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailErrored, setEmailErrored] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErrored, setPasswordErrored] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
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
    <ParallaxBox>
      <ParallaxLayer id="parallax-layer" />
      <Typography fontFamily={"-moz-initial"} variant="h2" color="#ffffff" gutterBottom>
        MASTERS OF CODE
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
          type="password"
          required
          helperText={passwordErrored && "Password may not be empty."}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordErrored}
          fullWidth
        />
        {errorMessage && (
          <Typography variant="body2" color="error" style={{ marginTop: '10px', textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}
        <Box textAlign="left">
          <Link to="/signup">
            <MuiLink component="span" variant="body2" color="info.main">
              Don't have an account? Sign Up
            </MuiLink>
          </Link>
        </Box>
      </StyledPaper>
      <Button
        variant="contained"
        color="warning"
        onClick={handleLogin}
        fullWidth
        sx={{ width: 320, mt: 2 }}
      >
        Login
      </Button>
    </ParallaxBox>
  );
};

export { LoginForm };
