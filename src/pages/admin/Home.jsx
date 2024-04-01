import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  //Estado para almacenar termino de la busqueda
  const [buscarTermino, setBuscarTermino] = useState("");

  //funcion funcion de filtro
  const usuariosFiltrados = (usuario) => {
    return (
      usuario.NomCompleto.toLowerCase().includes(
        buscarTermino.toLocaleLowerCase()
      ) ||
      new Date(usuario.createdAt)
        .toLocaleDateString()
        .includes(buscarTermino) ||
      usuario.rol.toLowerCase().includes(buscarTermino.toLowerCase())
    );
  };

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
        // Actualiza el estado con la lista de usuarios obtenida
        setUsuarios(data.usuarios);
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
      //si la solicitud fue exitosa
      setUsuarios(updatedUsers);
      console.log("El rol del usuario se actualizó correctamente");
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    }
  };
  const eliminarUsuario = async (userId) => {
    try {
      const response = await fetch(
        `https://bdeducatio.vercel.app/api/usuarios/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      // Filtra los usuarios para mantener solo aquellos cuyo ID no coincida con el ID del usuario eliminado
      const updatedUsers = usuarios.filter((user) => user._id !== userId);
      setUsuarios(updatedUsers);

      console.log("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl text-primary my-10 font-bold">Usuarios</h1>
      </div>
      {/*barra de busqueda*/}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, fecha o rol..."
          value={buscarTermino}
          onChange={(e) => setBuscarTermino(e.target.value)}
          className="text-sm text-gray-600 placeholder-gray-400 py-3 px-4 bg-gray-200 w-full outline-none rounded-lg focus:ring-2 focus:ring-primary border border-blue-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaSearch className="text-primary" />
        </div>
      </div>

      <div className="bg-secondary-100 p-8 rounded-xl">
        {/* Títulos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-8 bg-secondary-900 p-4 rounded-xl">
          <h5 className="text-white font-bold mb-2 md:text-lg ml-5">Usuario</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg ml-10">
            Created at
          </h5>
          <h5 className="text-white font-bold mb-2 md:text-lg ml-16">Rol</h5>
        </div>
        {/* Contenido de usuarios */}
        {usuarios.filter(usuariosFiltrados).map((usuario) => (
          <div
            key={usuario._id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
          >
            {/* Icono de perfil y texto */}
            <div className="flex items-center">
              <CgProfile className="w-10 h-10 rounded-full object-cover mr-2 text-primary" />
              <span className="text-xs text-white ml-1">
                {/* Muestra el nombre del usuario y su correo */}
                <p>{usuario.NomCompleto}</p>
                <p>{usuario.email}</p>
                <p>{usuario._id}</p>
                <p>{usuario.rol}</p>
              </span>
            </div>
            {/* Muestra la fecha de creación del usuario */}
            <div>
              <p className="text-xs text-white ml-14">
                {new Date(usuario.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Muestra el estatus del usuario (usuario o docente) */}
            <div>
              <span
                className={`py-1 px-2 shadow-md ${
                  usuario.rol === "usuario" ? "bg-green-500 text-green-500" : "bg-red-500 text-red-500"
                }/10 text-${
                  usuario.rol === "usuario" ? "green" : "red"
                } rounded-lg ml-16`}
              >
                {usuario.rol === "usuario" ? "Usuario" : "Docente"}
              </span>
            </div>
            {/* Botones de actualizar y elimninar */}
            <div className="flex justify-end space-x-4 md:space-x-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => actualizarEstado(usuario._id)}
              >
                actualizar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => eliminarUsuario(usuario._id)}
              >
                eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
