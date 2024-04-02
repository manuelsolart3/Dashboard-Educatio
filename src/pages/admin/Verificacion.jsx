import React, { useState, useEffect } from "react";
import { IoShieldCheckmark } from "react-icons/io5";

const Verificacion = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bdeducatio.vercel.app/api/usuarios"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        const usuariosConArchivoUrl = data.usuarios.filter(
          (user) => user.archivoUrl
        );
        setUsuarios(usuariosConArchivoUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const actualizarEstado = async (userId) => {
    try {
      const response = await fetch(
        `https://bdeducatio.vercel.app/api/usuarios/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rol:
              usuarios.find((user) => user._id === userId).rol === "usuario"
                ? "docente"
                : "usuario",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el estado del usuario");
      }

      const updatedUsers = usuarios.map((user) =>
        user._id === userId
          ? { ...user, rol: user.rol === "usuario" ? "docente" : "usuario" }
          : user
      );
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          <h5 className="text-white font-bold mb-2 md:text-lg">Usuario</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg">Hoja de vida</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg">Estatus</h5>
          <div className="flex justify-end">
            <span className="text-white font-bold mb-2 md:text-lg">Acción</span>
          </div>
        </div>
        {usuarios.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
          >
            <div className="col-span-1">
              <div className="flex items-center">
                <IoShieldCheckmark className="w-10 h-10 rounded-full object-cover mr-2 text-primary" />
                <div className="text-xs text-white">
                  <p>{user.NomCompleto}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-white col-span-1">
              <p>
                URL:{" "}
                <a href="#" className="text-blue-500">
                  {user.archivoUrl}
                </a>
              </p>
            </div>
            <div className="col-span-1">
              <span
                className={`py-1 px-2 ${
                  user.rol === "usuario" ? "bg-green-500" : "bg-red-500"
                }/10 text-${
                  user.rol === "usuario" ? "green" : "red"
                }-500 rounded-lg ml-16`}
              >
                {user.rol === "usuario" ? "Usuario" : "Docente"}
              </span>
            </div>
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
