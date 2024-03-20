import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";

//Layout
import LayoutAdmin from "./layout/LayoutAdmin";

//Pages auth
import Login from "./pages/auth/Login";

//Pages Admin
import Home from "./pages/admin/Home";
import Error404 from "./pages/Error404";
import Docente from "./pages/admin/Docente";
import Verificacion from "./pages/admin/Verificacion";
import Soporte from "./pages/admin/Soporte";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Lógica para verificar si el usuario está autenticado
  const checkAuthentication = () => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token); // Establece isAuthenticated en verdadero si hay un token
  };

  // Llama a checkAuthentication cuando se monta la aplicación para verificar la autenticación
  useState(() => {
    checkAuthentication();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login checkAuthentication={checkAuthentication} />}
        />

        {/* Protege todas las rutas dentro de "/home" */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <LayoutAdmin />
            ) : (
              <Navigate to="/" replace={true} /> // Redirige al inicio de sesión si no está autenticado
            )
          }
        >
          <Route index element={<Home />} />
          <Route path="docente" element={<Docente />} />
          <Route path="verificacion" element={<Verificacion />} />
          <Route path="soporte" element={<Soporte />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
