import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEye2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center" >
    <div className="bg-secondary-900 p-9 rounded-xl shadow-lg">
      <h1 className="text-3xl uppercase font-semibold tracking-[2px] text-white mb-7">
        Iniciar <span className="text-primary">Sesión</span> 
      </h1>
      <form>
        <div className="relative mb-5">
          <IoMdMail className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />

          <input
            type="email"
            className="text-sm placeholder-white text-white py-3 pl-8 pr-4 bg-secondary-fondo w-full outline-none rounded-lg  focus:border focus:border-primary"
            placeholder="correo electrónico "
          />
        </div>
        <div className="relative mb-5">
          <FaLock className="absolute top-1/2 -translate-y-1/2 left-2  text-primary" />

          <input
            type={showPassword ? "text" : "password"}
            className=" text-sm placeholder-white text-white font-b py-3 pl-8 pr-4 bg-secondary-fondo w-full outline-none rounded-lg hover:cursor-pointer  focus:border focus:border-primary"
            placeholder="contraseña "
          />
          {showPassword ? (
            <RiEye2Line
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2  text-primary"
            />
          ) : (
            <RiEyeCloseLine
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2  text-primary"
            />
          )}
        </div>
        <div>
          <Link to="/home">
          <button
            type="submit"
            className="mb-3 text-sm text-white bg-primary w-full py-3 px-4 rounded-lg hover:text-gray-700 hover:rounded-full transition-all font-bold"
          >
            Ingresar
          </button>
          </Link>
        </div>
      </form>
      <p className="text-xs font-semibold text-center text-white hover:text-primary transition-colors">
        Uso exclusivo de <span className="text-primary  hover:text-white transition-colors">Admin</span> 
      </p>
    </div>
    </div>
  );
};

export default Login;
