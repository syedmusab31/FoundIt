 import React from 'react'
 import { assets, menuLinks } from "../assets/assets";
import { Link} from "react-router-dom";

 const Navbar1 = () => {
  const [open, setOpen] = React.useState(false);
//  const [showLogin, setShowLogin] = React.useState(false);
   return (
     <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all         ${
        location.pathname === "/" && "bg-light"
      } `}
    >
      {/* <Link to="/">
        <img src={assets.logo_i} alt="logo" className="h-8" />
      </Link> */}
      <Link to="/" className="text-2xl logo-font text-primary tracking-wide">
        FoundIt
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
         
          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu "
          className=""
        />
      </button>
    </div>
   )
 }
 
 export default Navbar1
 