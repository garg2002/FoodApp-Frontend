import React from 'react'
import Logo from "../assets/Logo.png"
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { SlHandbag } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = () => {


  return (
    <div className=" shadow-xl  max-w h-20 max-h w-full font-serif text-md md:text-xl p-2 flex items-center justify-evenly">
      {/* Logo & Location */}
      <div className="w-1/3 flex justify-around cursor-pointer p-1 ">
        <Link to="/">
          <img
            src={Logo}
            alt="TastyTrail"
            className="w-10 md:w-32 h-16 md:h-20 py-1"
          />
        </Link>
        <div className=" mt-7 ">
          <label className="flex">
            <CiLocationOn />
            <select
              name="selectedFruit"
              className="outline-none font-[550] hover:text-blue-500 "
            >
              <option value="indore">Indore</option>
              <option value="pune">Pune</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="banglore">Banglore</option>
            </select>
          </label>
        </div>
      </div>

      {/* SearchBar */}

      <Link to="/search">
        <div className="flex cursor-pointer font-[550]">
          <span>
            <CiSearch className="md:text-2xl  text-gray-800  font-[550] w-4 md:w-12 mt-1 " />
          </span>
          <p>Search</p>
        </div>
      </Link>
      {/* Login, Help & Cart */}
      <div className="flex w-1/3 font-[550] justify-around  ">
        <div className="lg:flex w-24 h-14 gap-3  hidden hover:text-blue-500 ">
          <span>
            <IoHelpBuoyOutline className="mt-4 text-2xl " />
          </span>
          <button>Help</button>
        </div>
        <Link to='/cart'>
          <div className="flex w-24 h-14 gap-3 hover:text-blue-500">
            <span>
              <SlHandbag className="mt-4 text-2xl " />
            </span>
            <button>Cart</button>
          </div>
        </Link>
        <Link to={`/login`}>
          <div className="flex w-24 h-14 gap-3  hover:text-blue-500">
            <span>
              <CgProfile className="mt-4 text-2xl " />
            </span>
            <button>Login</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar
