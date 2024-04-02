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
    // Lógica para verificar la autenticación
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para el inicio de sesión */}
        <Route path="/" element={<Login />} />
        {/* Rutas protegidas */}
        <Route path="/home" element={isAuthenticated ? <LayoutAdmin /> : <Navigate to="/" replace />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} />
        <Route path="/verificacion" element={isAuthenticated ? <Verificacion /> : <Navigate to="/" replace />} />
        {/* Ruta para el error 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;