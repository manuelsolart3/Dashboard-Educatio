import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiBarChart2Line,
  RiEarthLine,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
  RiUserSettingsFill,
} from "react-icons/ri";

import { IoDocuments } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleLogout = () => {
    // Limpiar los datos de sesión
    localStorage.removeItem("accessToken");
    // Redirigir a la página de inicio de sesión
    window.location.href = "/";
  };

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          <div className="flex items-center justify-center mb-10">
            <img
              src="/src/img/LogoPNG.png"
              alt="Logo"
              className="w-22 h-20 mr-8"
            />
          </div>
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-bold text-white">Admin</h1>
            <span className="text-primary text-center text-4xl">.</span>
          </div>

          <ul>
            <li>
              <button
                onClick={() => setShowSubmenu(!showSubmenu)}
                className="w-full flex items-center justify-between py-6 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4 text-white font-bold">
                  <FaUsers className="text-white" /> Gestión de usuarios
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${
                    showSubmenu && "rotate-90"
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu ? "h-[130px]" : "h-0"
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="/home"
                    className="text-white flex items-center gap-5 py-2 px-2 rounded-lg hover:bg-secondary-900 transition-colors border-gray-500 ml-6 block relative font-bold"
                  >
                   <RiUserSettingsFill className="text-white " /> Usuarios
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/home/verificacion"
                className="text-white flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors font-bold"
              >
                <IoDocuments className="text-white " /> Verificaciones
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <Link
            onClick={handleLogout}
            className="text-white flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors font-bold"
          >
            <RiLogoutCircleRLine className="text-white " /> Cerrar sesión
          </Link>
        </nav>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar;
