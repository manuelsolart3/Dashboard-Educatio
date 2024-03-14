import React from "react";
const Header = () => {
    return (
      <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end">
        <nav className="flex items-center gap-2">
          <div className="flex items-center gap-4">
            <img
              src="https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg"
              className="w-8 h-8 object-cover rounded-full"
              alt="Profile"
            />
            <span className="text-white">Manuel Solarte</span>
          </div>
        </nav>
      </header>
    );
  };
  
  
  export default Header;