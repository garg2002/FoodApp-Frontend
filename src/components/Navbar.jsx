import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { fetchCart } from "../redux-toolkit/cartSlice";
import { SlHandbag } from "react-icons/sl";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch cart items on component mount
    dispatch(fetchCart());
  }, [dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="shadow-xl bg-white max-w h-20 max-h w-full font-serif text-md md:text-xl p-2 flex items-center justify-between md:justify-evenly">
      {/* Logo & Location */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="TastyTrail"
            className="w-24 md:w-32 h-20 md:h-20 "
          />
        </Link>
        <div className="hidden md:flex flex-col">
          <div className="mt-2 ml-6">
            <label className="flex">
              <CiLocationOn />
              <select
                name="selectedFruit"
                className="outline-none font-[550] hover:text-blue-500"
              >
                <option value="indore">Indore</option>
                <option value="pune">Pune</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="banglore">Bangalore</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* SearchBar */}
      <Link to="/search" className="hidden md:flex cursor-pointer font-[550]">
        <span>
          <CiSearch className="md:text-2xl text-gray-800 font-[550] w-4 md:w-12 mt-1" />
        </span>
        <p>Search</p>
      </Link>

      {/* Login, Help & Cart */}
      <div className="hidden md:flex w-1/3 font-[550] justify-around">
        <div className="lg:flex w-24 h-14 gap-3 hidden hover:text-blue-500">
          <span>
            <IoHelpBuoyOutline className="mt-4 text-2xl" />
          </span>
          <button>Help</button>
        </div>
        <Link to="/cart" className="flex w-24 h-14 gap-3 hover:text-blue-500">
          <span className="flex justify-center ">
            <SlHandbag className="mt-4 text-2xl" />
            {items.length > 0 && (
              <p className=" h-5  rounded-full w-5 text-[#1a8cff]">{items.length}</p>
            )}
          </span>
          <button>Cart</button>
        </Link>
        <Link
          to={`/login`}
          className="flex w-24 h-14 gap-3 hover:text-blue-500"
        >
          <span>
            <CgProfile className="mt-4 text-2xl" />
          </span>
          <button>Login</button>
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute w-60 top-20 right-0 bg-white shadow-lg z-10 flex flex-col items-center">
          <Link
            to="/search"
            className="flex cursor-pointer font-[550] py-2"
            onClick={toggleMenu}
          >
            <CiSearch className="text-2xl text-gray-800 font-[550] w-12 mt-1" />
            <p>Search</p>
          </Link>
          <Link
            to="/cart"
            className="flex w-24 h-14 gap-3 hover:text-blue-500 py-2"
            onClick={toggleMenu}
          >
            <SlHandbag className="mt-4 text-2xl" />
            <button>Cart</button>
          </Link>
          <Link
            to="/login"
            className="flex w-24 h-14 gap-3 hover:text-blue-500 py-2"
            onClick={toggleMenu}
          >
            <CgProfile className="mt-4 text-2xl" />
            <button>Login</button>
          </Link>
          <div className="flex w-24 h-14 gap-3 hover:text-blue-500 py-2">
            <IoHelpBuoyOutline className="mt-4 text-2xl" />
            <button>Help</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
