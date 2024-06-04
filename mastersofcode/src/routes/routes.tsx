import React from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { SignupPage } from "../pages/signup.page";
import { ProtectedRoute } from "./protected-route.component";
import { Challenge1 } from "../components/challenges/challenge1.component";



const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={ <ProtectedRoute> <HomePage/> </ProtectedRoute> }/>
    
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />

      <Route path="challenge/1" element={<Challenge1 />} />
      
    </ReactRouterRoutes>
  );
};

export { Routes };