import React from "react";
import { CgProfile } from "react-icons/cg";


const Docente = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl text-white my-10">Docentes</h1>
      </div>
      <div className="bg-secondary-100 p-8 rounded-xl">
        {/* Títulos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-8 bg-secondary-900 p-4 rounded-xl ">
          <h5 className="text-white font-bold mb-2 md:text-lg ml-5 ">Docente</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg ml-10">Created at</h5>
          <h5 className="text-white font-bold mb-2 md:text-lg ml-16">Estatus</h5>
        </div>
        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          {/* Icono de perfil y texto */}
          <div className="flex items-center">
          <CgProfile className="w-10 h-10 rounded-full object-cover mr-2 text-primary"  />
            <span className="text-xs text-white ml-1">
              
              <p>Nombre del Usuario</p>
              <p>correo@example.com</p>
            </span>
          </div>
          <div>
            <p className="text-xs text-white ml-14">25/02/2024</p>
          </div>
          <div>
            <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg ml-16">
              Activo
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          {/* Icono de perfil y texto */}
          <div className="flex items-center">
          <CgProfile className="w-10 h-10 rounded-full object-cover mr-2 text-primary"  />
            <span className="text-xs text-white ml-1">
              
              <p>Nombre del Usuario</p>
              <p>correo@example.com</p>
            </span>
          </div>
          <div>
            <p className="text-xs text-white ml-14">25/02/2024</p>
          </div>
          <div>
            <span className="py-1 px-2 bg-red-500/10 text-red-500 rounded-lg ml-16">
              Activo
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          {/* Imagen de perfil y texto */}
          <div className="flex items-center">
          <CgProfile className="w-10 h-10 rounded-full object-cover mr-2 text-primary"  />
            <span className="text-xs text-white ml-1">
              
              <p>Nombre del Usuario</p>
              <p>correo@example.com</p>
            </span>
          </div>
          <div>
            <p className="text-xs text-white ml-14">25/02/2024</p>
          </div>
          <div>
            <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg ml-16">
              Activo
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          {/* Icono de perfil y texto */}
          <div className="flex items-center">
          <CgProfile className="w-10 h-10 rounded-full object-cover mr-2 text-primary"  />
            <span className="text-xs text-white ml-1">
              
              <p>Nombre del Usuario</p>
              <p>correo@example.com</p>
            </span>
          </div>
          <div>
            <p className="text-xs text-white ml-14">25/02/2024</p>
          </div>
          <div>
            <span className="py-1 px-2 bg-red-500/10 text-red-500 rounded-lg ml-16">
              Activo
            </span>
          </div>
        </div>  
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          {/* Icono de perfil y texto */}
          <div className="flex items-center">
          <CgProfile className="w-10 h-10 rounded-full object-cover mr-2 text-primary"  />
            <span className="text-xs text-white ml-1">
              
              <p>Nombre del Usuario</p>
              <p>correo@example.com</p>
            </span>
          </div>
          <div>
            <p className="text-xs text-white ml-14">25/02/2024</p>
          </div>
          <div>
            <span className="py-1 px-2 bg-red-500/10 text-red-500 rounded-lg ml-16">
              Activo
            </span>
          </div>
        </div> <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          {/* Icono de perfil y texto */}
          <div className="flex items-center">
          <CgProfile className="w-10 h-10 rounded-full object-cover mr-2 text-primary"  />
            <span className="text-xs text-white ml-1">
              
              <p>Nombre del Usuario</p>
              <p>correo@example.com</p>
            </span>
          </div>
          <div>
            <p className="text-xs text-white ml-14">25/02/2024</p>
          </div>
          <div>
            <span className="py-1 px-2 bg-red-500/10 text-red-500 rounded-lg ml-16">
              Activo
            </span>
          </div>
        </div>
        </div>
      </div>
   
  );
};
export default Docente;
