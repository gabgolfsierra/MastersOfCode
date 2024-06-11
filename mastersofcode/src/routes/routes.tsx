import React from "react";
import { BrowserRouter as Router, Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { SignupPage } from "../pages/signup.page";
<<<<<<< Updated upstream
import { ProtectedRoute } from "./protected-route.component";

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </ReactRouterRoutes>
=======
import { Challenge1 } from "../components/challenges/challenge1.component";
import { Challenge2 } from "../components/challenges/challenge2.component";


const Routes: React.FC = () => {
  return (
   
      <ReactRouterRoutes>
        <Route path="/" element={  <HomePage/>  }/>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="challenge/1" element={<Challenge1 />} />
        <Route path="challenge/2" element={<Challenge2 />} />
      </ReactRouterRoutes>

>>>>>>> Stashed changes
  );
};

export { Routes };
