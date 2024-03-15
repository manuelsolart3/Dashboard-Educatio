import React from 'react';
import { IoShieldCheckmark } from "react-icons/io5";

const Verificacion = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl text-white my-4 md:my-10">Por Verificar</h1>
      <div className="bg-secondary-100 p-4 md:p-8 rounded-xl">
        {/* Títulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          <h5 className="text-white font-bold mb-2 md:text-lg">Usuario</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg">Hoja de vida</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg">Estatus</h5>
        </div>
        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          {/* Icono de perfil y texto */}
          <div className="flex items-center">
            <IoShieldCheckmark className="w-10 h-10 rounded-full object-cover mr-2 text-primary" />
            <div className="text-xs text-white">
              <p>Nombre del Usuario</p>
              <p>correo@example.com</p>
            </div>
          </div>
          {/* Campo para mostrar el URL */}
          <div className="text-xs text-white">
            <p>URL: <a href="#" className="text-blue-500">https://www.ejemplo.com/archivo.pdf</a></p>
          </div>
          {/* Botones Aceptar y Rechazar */}
          <div className="flex justify-center md:justify-end space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Aceptar
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verificacion;
