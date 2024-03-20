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

  // Efecto para realizar la solicitud a la API cuando el componente se monta
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

  const actualizarEstado = async (userId, nuevoRol) => {
    try {
      // Realiza una solicitud PATCH al endpoint para actualizar el usuario con el ID especificado
      const response = await fetch(`https://bdeducatio.vercel.app/api/usuarios/:id${userId}`, {
        method: 'PUT', // Utiliza el método PATCH para actualizar la información del usuario
        headers: {
          'Content-Type': 'application/json' // Establece el tipo de contenido del cuerpo de la solicitud como JSON
        },
        body: JSON.stringify({
          rol: nuevoRol // Envia el nuevo rol del usuario en el cuerpo de la solicitud en formato JSON
        })
      });
      
      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error('Error al actualizar el estado del usuario'); // Lanza un error si la respuesta no es exitosa
      }
  
      // Actualiza el estado local de los usuarios después de la actualización
      const updatedUsers = usuarios.map(user => {
        if (user._id === userId) { // Busca el usuario correspondiente al ID y actualiza su rol
          return { ...user, rol: nuevoRol }; // Retorna una nueva copia del usuario con el rol actualizado
        }
        return user; // Retorna el usuario sin cambios si no corresponde al ID especificado
      });
      setUsuarios(updatedUsers); // Actualiza el estado local de los usuarios con los cambios
  
      console.log('Estado del usuario actualizado correctamente'); // Imprime un mensaje de éxito en la consola
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error); // Captura cualquier error y lo imprime en la consola
    }
  };
  
  const eliminarUsuario = async (userId) => {
    try {
      const response = await fetch(`https://bdeducatio.vercel.app/api/usuarios/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
  
      // Filtra los usuarios para mantener solo aquellos cuyo ID no coincida con el ID del usuario eliminado
      const updatedUsers = usuarios.filter(user => user._id !== userId);
      setUsuarios(updatedUsers);
  
      console.log('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
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
              </span>
            </div>
            {/* Muestra la fecha de creación del usuario */}
            <div>
              <p className="text-xs text-white ml-14">
                {new Date(usuario.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Muestra el estatus del usuario (activo o inactivo) */}
            <div>
              <span
                className={`py-1 px-2 ${
                  usuario.rol === "usuario" ? "bg-green-500" : "bg-red-500"
                }/10 text-${
                  usuario.rol === "usuario" ? "green" : "red"
                }-500 rounded-lg ml-16`}
              >
                {usuario.rol === "usuario" ? "Usuario" : "Docente"}
              </span>
            </div>
            {/* Botones de aceptar y rechazar */}
            <div className="flex justify-end space-x-4 md:space-x-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => actualizarEstado(usuario._id)}>
                Aceptar
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => eliminarUsuario(usuario._id)}> 
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
