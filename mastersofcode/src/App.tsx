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
import PrivateRoute from "./private.route";
import { LogoutPage } from "./pages/logout.page";



const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/challenge/1" element={<PrivateRoute><Challenge1 /></PrivateRoute>} />
        <Route path="/challenge/2" element={<PrivateRoute><Challenge2 /></PrivateRoute>} />
        <Route path="/challenge/3" element={<PrivateRoute><Challenge3 /></PrivateRoute>} />
        <Route path="/challenge/4" element={<PrivateRoute><Challenge4 /></PrivateRoute>} />
        <Route path="/challenge/5" element={<PrivateRoute><Challenge5 /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
