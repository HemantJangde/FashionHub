import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import icon from "../assets/cart_icon.png";
import NavImage from "../assets/nav.jpeg";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="bg-white mb-1 shadow-sm px-6 py-4 flex items-center justify-between font-medium relative">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={NavImage} alt="logo" className="w-36 h-14 " />
      </Link>

      {/* Desktop Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 items-center">
        {navLinks.map((link) => (
          <li key={link.name} className="flex flex-col items-center gap-1">
            <Link
              to={link.path}
              className={`hover:text-gray-900 ${
                location.pathname === link.path ? "font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
            <hr
              className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${
                location.pathname === link.path ? "block" : "hidden"
              }`}
            />
          </li>
        ))}

        {userInfo?.isAdmin && (
          <li className="flex flex-col items-center gap-1">
            <Link
              to="/admin"
              className={`hover:text-gray-900 ${
                location.pathname === "/admin" ? "font-bold" : ""
              }`}
            >
              ADMIN PANEL
            </Link>
            <hr
              className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${
                location.pathname === "/admin" ? "block" : "hidden"
              }`}
            />
          </li>
        )}
      </ul>

      {/* Right Icons / Cart / User */}
      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative">
          <img src={icon} alt="cart" className="w-5 cursor-pointer" />
        </Link>

        {userInfo ? (
          <>
            <Link to="/orders">
              <span className="text-gray-700  text-sm font-mono hidden sm:inline">
                Hello,{userInfo.name}
              </span>
            </Link>

            <div className="tooltip tooltip-bottom">
              <div className="tooltip-content ">
                <div className="animate-bounce text-orange-100 -rotate-10 text-2xl font-black">
                  Really!
                </div>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1 hidden sm:inline-block border border-gray-300 text-gray-600 rounded font-bold font-sans hover:bg-gray-300 hover:text-white transition text-sm"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="hidden sm:flex gap-2">
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Signup
            </Link>
          </div>
        )}

     
      </div>
        <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu />
          </button>

      {/* Mobile Menu */}
    <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 ">
          <span className="font-semibold text-lg"></span>
          <button onClick={() => setMobileMenuOpen(false)}>
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col p-4 gap-4 text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-gray-500/60 pb-2 hover:text-black"
            >
              {link.name}
            </Link>
          ))}

          {userInfo?.isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b pb-2 border-gray-500/60 hover:text-black"
            >
              ADMIN
            </Link>
          )}

          {/* Auth Section */}
          {userInfo ? (
            <>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center border-b border-gray-500/60  pb-2 gap-2"
              >
                 MY ORDERS
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center  gap-2 text-red-500"
              >
                <FiLogOut /> LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center border py-2 rounded-md"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-black text-white py-2 rounded-md"
              >
                Signup
              </Link>
            </>
          )}
        </div>
        </div>
    </nav>
  );
}
