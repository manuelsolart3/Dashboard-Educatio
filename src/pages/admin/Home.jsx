
import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

const Home = () => {
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Efecto para realizar la solicitud a la API cuando el componente se monta
  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchData = async () => {
      try {
        // Realiza la solicitud a la API
        const response = await fetch("https://bdeducatio.vercel.app/api/usuarios");
        // Verifica si la solicitud es exitosa
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        // Convierte la respuesta a formato JSON
        const data = await response.json();
        // Actualiza el estado con la lista de usuarios obtenida
        setUsuarios(data.usuarios);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Llama a la función fetchData
    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <div>
        <h1 className="text-2xl text-white my-10">Usuarios</h1>
      </div>
      <div className="bg-secondary-100 p-8 rounded-xl">
        {/* Títulos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-8 bg-secondary-900 p-4 rounded-xl">
          <h5 className="text-white font-bold mb-2 md:text-lg ml-5">Usuario</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg ml-10">Created at</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg ml-16">Rol</h5>
        </div>
        {/* Contenido de usuarios */}
        {usuarios.map((usuario) => (
          <div key={usuario._id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
            {/* Icono de perfil y texto */}
            <div className="flex items-center">
              <CgProfile className="w-10 h-10 rounded-full object-cover mr-2 text-primary" />
              <span className="text-xs text-white ml-1">
                {/* Muestra el nombre del usuario y su correo */}
                <p>{usuario.NomCompleto}</p>
                <p>{usuario.email}</p>
              </span>
            </div>
            {/* Muestra la fecha de creación del usuario */}
            <div>
              <p className="text-xs text-white ml-14">{new Date(usuario.createdAt).toLocaleDateString()}</p>
            </div>
            {/* Muestra el estatus del usuario (activo o inactivo) */}
            <div>
              <span className={`py-1 px-2 ${usuario.rol === "usuario" ? "bg-green-500" : "bg-red-500"}/10 text-${usuario.rol === "usuario" ? "green" : "red"}-500 rounded-lg ml-16`}>
                {usuario.rol === "usuario" ? "Usuario" : "Docente"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;