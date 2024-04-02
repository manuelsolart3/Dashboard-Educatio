import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEye2Line } from "react-icons/ri";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);//controlar la visibilidad de la contraseña 
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const handleLogin = async (e) => { //Manejo
    e.preventDefault(); //Para que no se recargue la pagina
    const email = e.target[0].value; //valor del email
    const password = e.target[1].value; //valor de la pass

    //almacenamos el email en el almacenamiento local 
    localStorage.setItem('userEmail', email);

    try {//realizamos solicitud POST al endpoint de login
      const response = await fetch("https://bdeducatio.vercel.app/api/admin/login", {
        method: "POST", 
        headers: {  // Encabezados de la solicitud
          "Content-Type": "application/json"
        },
        body: JSON.stringify({// Cuerpo de la solicitud en formato JSON
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

       // Si la autenticación es exitosa, obtenemos el token de acceso del cuerpo de la respuesta
      const data = await response.json();
      const accessToken = data.accessToken;

      // Almacenamos el token de acceso en el almacenamiento local
      localStorage.setItem("accessToken", accessToken);

      
      // Si la respuesta es exitosa, redireccionamos a la página de inicio
      window.location.href = "/home";
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setErrorMessage(error.message); // Actualizamos el mensaje de error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-secondary-900 p-9 rounded-xl shadow-lg">
        <h1 className="text-3xl uppercase font-semibold tracking-[2px] text-white mb-7">
          Iniciar <span className="text-primary">Sesión</span>
        </h1>
        <form onSubmit={handleLogin}> {/* Al enviar el formulario, se llama a la función handleLogin.*/}
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
            <button
              type="submit"
              className="mb-3 text-sm text-white bg-primary w-full py-3 px-4 rounded-lg hover:text-gray-700 hover:rounded-full transition-all font-bold"
            >
              Ingresar
            </button>
          </div>
        </form>{/*Renderizamos el mensaje de error si existe.*/}
        {errorMessage && ( 
          <p className="text-xs text-red-500">{errorMessage}</p>
        )}
        <p className="text-xs font-semibold text-center text-white hover:text-primary transition-colors">
          Uso exclusivo de{" "}
          <span className="text-primary  hover:text-white transition-colors">
            Admin
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
