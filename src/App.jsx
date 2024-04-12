import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

//Layout
import LayoutAdmin from "./layout/LayoutAdmin";

//Pages auth
import Login from "./pages/auth/Login";

//Pages Admin
import Home from "./pages/admin/Home";
import Error404 from "./pages/Error404";

import Verificacion from "./pages/admin/Verificacion";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("https://bdeducatio.vercel.app/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const data = await response.json();
      const accessToken = data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      checkAuthentication(); // Actualiza el estado de autenticación
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <LayoutAdmin />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<Home />} />
          <Route path="verificacion" element={<Verificacion />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
