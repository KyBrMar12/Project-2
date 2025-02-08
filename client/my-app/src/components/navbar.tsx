import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 font-bold">
      <div className="container px-4 mx-auto relative">
        <div className="flex justify-between items-center">
          {/* ✅ Wrap the logo and text inside a <Link> to go home */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">BookIt</span>
          </Link>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <Link to="/login" className="bg-[#664229] text-black py-2 px-3 border rounded-md">
              Sign In
            </Link>
            <Link to="/register" className="bg-[#664229] text-black py-2 px-3 border rounded-md">
              Create an account
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-[#b99976] w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <Link to="/login" className="bg-[#664229] text-black py-2 px-3 border rounded-md">
                Sign In
              </Link>
              <Link to="/register" className="bg-[#664229] text-black py-2 px-3 border rounded-md">
                Create an account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar
