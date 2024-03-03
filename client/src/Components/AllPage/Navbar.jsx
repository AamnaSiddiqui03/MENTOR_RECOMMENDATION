import React, { useEffect, useState } from "react";
import logo from "../../assets/logoNM.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

// , useNavigate

export default function Navbar() {
  const [Navlog, setNavLog] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setNavLog(false);
  //   } else {
  //     setNavLog(true);
  //   }
  // }, []);

  const navigate = useNavigate();

  const logout = () => {
    setNavLog(false);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="font-sans z-20 flex justify-between text-l items-center py-3 px-8 bg-black text-white sticky top-0 z-10">
        <div className="flex items-center">
          <img
            src={logo}
            alt=""
            className="h-16 w-16 object-cover rounded-full"
          />
          <ul className="flex ml-5 items-center">
            <li className="mx-11 hover:text-discord hover:scale-105 px-3 py-1 hover:bg-white hover:rounded-2xl  ">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="mx-11 hover:text-discord hover:scale-105  px-3 py-1 hover:bg-white hover:rounded-2xl">
              <NavLink to="/recommend">Recommend</NavLink>
            </li>
            <li className="mx-11 hover:text-discord hover:scale-105  px-4 py-1 hover:bg-white hover:rounded-2xl">
              <NavLink to="/virtualmeet">Virtualmeet</NavLink>
            </li>
          </ul>
        </div>
        <div>
        {!localStorage.getItem("token") ? (
  <form action="">
    <Link
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
      to="/login"
      type="submit"
    >
      Login
    </Link>
    <Link
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
      to="/signup"
      type="submit"
    >
      Sign Up
    </Link>
  </form>
) : (
  <button
    className="bg-discord hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
    onClick={logout}
  >
    Logout
  </button>
)}
        </div>
      </div>
    </>
  );
}
