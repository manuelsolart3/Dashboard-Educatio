import React, { useState, useEffect } from "react";
import { IoShieldCheckmark } from "react-icons/io5";

const Verificacion = () => {
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Efecto para cargar los usuarios al montar el componente
  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchData = async () => {
      try {
        // Realiza la solicitud a la API
        const response = await fetch(
          "https://bdeducatio.vercel.app/api/usuarios"
        );
        // Verifica si la solicitud es exitosa
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        // Convierte la respuesta a formato JSON
        const data = await response.json();
        // Filtra los usuarios que tienen el campo archivoUrl
        const usuariosConArchivoUrl = data.usuarios.filter(
          (user) => user.archivoUrl
        );
        // Actualiza el estado con la lista de usuarios obtenida
        setUsuarios(usuariosConArchivoUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Llama a la función fetchData
    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función para actualizar el estado del usuario
  const actualizarEstado = async (userId) => {
    try {
      // Realiza una solicitud PUT al endpoint para actualizar el usuario con el ID especificado
      const response = await fetch(
        `https://bdeducatio.vercel.app/api/usuarios/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Cambia el rol de usuario a docente y viceversa
            rol:
              usuarios.find((user) => user._id === userId).rol === "usuario"
                ? "docente"
                : "usuario",
          }),
        }
      );
      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error("Error al actualizar el estado del usuario");
      }

      // Actualiza el estado local después de la actualización
      const updatedUsers = usuarios.map((user) =>
        user._id === userId
          ? { ...user, rol: user.rol === "usuario" ? "docente" : "usuario" }
          : user
      );
      // Si la solicitud fue exitosa
      setUsuarios(updatedUsers);
      console.log("El rol del usuario se actualizó correctamente");
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    }
  };

  

  return (
    <div className="p-4 md:p-8">
  <h1 className="text-2xl md:text-3xl text-white my-4 md:my-10">
    Por Verificar
  </h1>
  <div className="bg-secondary-100 p-4 md:p-8 rounded-xl">
    {/* Títulos */}
    <div className="grid grid-cols-4 gap-2 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
      <h5 className="text-white font-bold mb-2 md:text-lg col-span-1">Usuario</h5>
      <h5 className="text-white font-bold mb-2 md:text-lg col-span-1">Hoja de vida</h5>
      <h5 className="text-white font-bold mb-2 md:text-lg col-span-1 flex justify-end">Estatus</h5>
      {/* Espacio para botón Aceptar */}
      <div className="flex justify-end col-span-1"></div>
    </div>
    {/* Contenido */}
    {usuarios.map((user) => (
      <div
        key={user._id}
        className="grid grid-cols-4 gap-2 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
      >
        {/* Icono de perfil y texto */}
        <div className="col-span-1">
          <div className="flex items-center">
            <IoShieldCheckmark className="w-10 h-10 rounded-full object-cover mr-2 text-primary" />
            <div className="text-xs text-white">
              <p>{user.NomCompleto}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        {/* Campo para mostrar el URL */}
        <div className="text-xs text-white col-span-1">
          <p>
            URL: {"  "}
            <a href="#" className="text-blue-500">
              {user.archivoUrl}
            </a>
          </p>
        </div>
        {/* Muestra el estatus del usuario (usuario o docente) */}
        <div className="col-span-1 flex justify-end">
        <span
                className={`py-1 px-2 ${
                  user.rol === "usuario" ? "bg-green-500 text-green-500"  : "bg-red-500 text-green-500" 
                }/10 text-${
                  user.rol === "usuario" ? "green" : "red"
                } rounded-lg ml-16`}
              >
                {user.rol === "usuario" ? "Usuario" : "Docente"}
              </span>
        </div>
        {/* Botones Aceptar */}
        <div className="col-span-1 flex justify-center md:justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
            onClick={() => actualizarEstado(user._id)}
          >
            Aceptar
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  
  



  );
};

export default Verificacion;
