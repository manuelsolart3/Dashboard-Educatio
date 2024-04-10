import React, { useState, useEffect } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";
import MessageCard from './MessageCard';

import {
  FcManager,
  //FcNeutralDecision,
  FcFinePrint,
} from "react-icons/fc";

const Verificacion = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState('');

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
      setMostrarMensaje(true);
      setMensaje('El usuario ha sido aceptado como docente.');
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    }
  };

  const filtrarUsuarios = (usuario) => {
    return usuario.rol !== "docente";
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl text-white my-4 md:my-10">
        Por Verificar
      </h1>
      {mostrarMensaje && <MessageCard message={mensaje} />}
      <div className="bg-white p-6 md:p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-8">
          <div className="bg-white p-2 md:p-4 rounded-xl">
            <div className="bg-yellow-500 text-white rounded-xl flex items-center p-2 md:p-3">
              <IoShieldCheckmark className="w-8 h-8 rounded-full object-cover mr-2 text-white" />
              <div>
                <h3 className="text-base md:text-lg font-semibold">Usuarios</h3>
                <p className="text-sm md:text-base font-bold"></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="bg-primary text-white rounded-lg flex items-center p-3">
              <FcFinePrint className="w-8 h-8 rounded-full object-cover mr-2 text-white" />
              <div>
                <h3 className="text-base font-semibold">Creado</h3>
                <p className="text-lg font-bold"></p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="bg-tercero-lima text-white rounded-lg flex items-center p-3">
              <img
                src="/img/teatro.png"
                alt="Logo"
                className="w-8 h-8 mr-2"
              />
              <div>
                <h3 className="text-base font-semibold text-center">Rol</h3>
                <p className="text-lg font-bold"></p>
              </div>
            </div>
          </div>
        </div>
        {usuarios.filter(filtrarUsuarios).map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center mb-4 bg-white p-4 rounded-xl shadow-md border border-gray-200"
          >
            <div className="col-span-1">
              <div className="flex items-center">
                <IoShieldCheckmark className="w-10 h-10 rounded-full object-cover mr-2 text-yellow-500" />
                <div className="text-xs text-secondary-900 ml-1 font-bold">
                  <p className="ml-2">{user.NomCompleto}</p>
                  <p className="ml-2">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-end md:justify-center">
              <div className="text-xs text-white">
                <p>
                  <button
                    className="px-4 py-4 bg-blue-500 text-white rounded-lg border border-primary hover:bg-primary"
                    onClick={() => window.open(user.archivoUrl, "_blank")}
                  >
                    Hoja de vida
                  </button>
                </p>
              </div>
            </div>
            <div className="col-span-1 flex justify-end md:justify-center">
              <div className="col-span-1">
                <span
                  className={`py-1 px-2 shadow-md font-bold ${
                    user.rol === "usuario"
                      ? "bg-tercero-limad text-tercero-lima text-bold"
                      : "bg-white text-red-500 "
                  } rounded-lg ml-2`}
                >
                  {user.rol === "usuario" ? "Usuario" : "Docente"}
                </span>
              </div>
            </div>
            <div className="col-span-1 flex justify-center md:justify-end">
              <div className="relative">
                <div
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
                  onClick={() => actualizarEstado(user._id)}
                >
                  <FaExchangeAlt className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Verificacion;