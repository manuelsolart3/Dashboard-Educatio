import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState, useEffect  } from "react";
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





  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<LayoutAdmin />}>
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
