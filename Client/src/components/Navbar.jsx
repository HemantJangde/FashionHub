import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import icon from "../assets/cart_icon.png";
import NavImage from "../assets/nav.jpeg";
import { FiMenu, FiX, FiLogOut, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { PiShoppingCartThin } from "react-icons/pi";
import { FaCartShopping } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "CART", path: "/cart" },
    { name: "CONTACT", path: "/contact" },

    { name: "ABOUT", path: "/about" },
  ];

  const isActive = (path) => pathname === path;

  // 🔹 Reusable Nav Item
  const NavItem = ({ name, path }) => (
    <li className="flex flex-col items-center gap-1">
      <Link
        to={path}
        className={`hover:text-black transition ${
          isActive(path) ? "font-bold text-black" : ""
        }`}
      >
        {name}
      </Link>
      {isActive(path) && (
        <span className="w-1/2 h-[2px] bg-black rounded"></span>
      )}
    </li>
  );

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between relative">
      {/* 🔹 Logo */}
      <Link to="/">
        <img src={NavImage} alt="logo" className="w-32 h-12 object-contain" />
      </Link>

      {/* 🔹 Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-sm text-gray-700 items-center">
        {navLinks.map((link) => (
          <NavItem key={link.name} {...link} />
        ))}

        {userInfo?.isAdmin && <NavItem name="ADMIN" path="/admin" />}
      </ul>


   {/* Cart */}
 
      {/* 🔹 Right Section */}
      <div className="flex items-center gap-4">
        {/* Auth */}
        {userInfo ? (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/orders" className="text-sm font-bold">
              Hello, {userInfo.name}
            </Link>

            


            <div className="tooltip tooltip-bottom">
              <div className="tooltip-content">
                <div className="animate-bounce text-red-500 -rotate-10 text-2xl font-black">
                  Really!
                </div>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1 border rounded text-sm hover:bg-black font-semibold hover:text-white transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
        <div className="hidden md:flex gap-3">
  <Link
    to="/login"
    className="px-4 py-2 border border-gray-700 rounded-md text-gray-700 hover:bg-gray-700 hover:text-white transition text-sm font-medium"
  >
    Login
  </Link>

  <Link
    to="/signup"
    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition text-sm font-medium"
  >
    Signup
  </Link>
</div>
        )}

        {/* 🔹 Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* 🔹 Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        ></div>
      )}

      {/* 🔹 Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold"></span>
          <FiX
            className="text-2xl cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>

        {/* Links */}
        <div className="flex flex-col p-4 gap-4 text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="border-b pb-2"
            >
              {link.name}
            </Link>
          ))}

          {userInfo?.isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b pb-2"
            >
              ADMIN
            </Link>
          )}

          {/* Auth */}
          {userInfo ? (
            <>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b pb-2"
              >
                MY ORDERS
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-500"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="border text-center py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-black text-white text-center py-2 rounded"
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
