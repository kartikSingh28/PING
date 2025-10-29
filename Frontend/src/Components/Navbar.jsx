import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Ping.png";

export function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src={logo}
            alt="Ping Logo"
            className="h-16 w-auto object-contain" 
          />
          <span className="text-xl font-bold text-blue-600 hidden sm:block">PING</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-500 hover:scale-105"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

   
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
        </button>

        
        <Link
          to="/login"
          className="hidden sm:block bg-gradient-to-r from-blue-600 to-sky-500 text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}