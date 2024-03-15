import React from "react";
import { BsPersonFillCheck   } from "react-icons/bs";

const Header = () => {
  //llamamos los datos guardados en el local
const userEmail = localStorage.getItem('userEmail');



    return (
      <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end">
        <nav className="flex items-center gap-2">
          <div className="flex items-center gap-4">
         < BsPersonFillCheck  className="text-primary"  />
            <span className="text-white">{userEmail}</span>
          </div>
        </nav>
      </header>
    );
  };
  
  
  export default Header;