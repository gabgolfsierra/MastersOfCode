import React from "react";
import { Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from "./apis/authcontext";
import { Challenge1 } from "./components/challenges/challenge1.component";
import { Challenge2 } from "./components/challenges/challenge2.component";
import { Challenge3 } from "./components/challenges/challenge3.component";
import { Challenge4 } from "./components/challenges/challenge4.component";
import { Challenge5 } from "./components/challenges/challenge5.component";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { SignupPage } from "./pages/signup.page";



const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenge/1" element={<Challenge1 />} />
        <Route path="/challenge/2" element={<Challenge2 />} />
        <Route path="/challenge/3" element={<Challenge3 />} />
        <Route path="/challenge/4" element={<Challenge4 />} />
        <Route path="/challenge/5" element={<Challenge5 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
