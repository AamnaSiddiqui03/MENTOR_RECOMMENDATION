import React, { useEffect, useState } from "react";
import logo from "../../assets/logoNM.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

// , useNavigate

export default function Navbar() {
  const [Navlog, setNavLog] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchUserDetails();
}, []);

const fetchUserDetails = async () => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          throw new Error('Token not found in local storage');
      }

      const response = await fetch('http://localhost:8080/api/auth/getUser', {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "auth-token": token
          }
      });

      if (!response.ok) {
          throw new Error('Failed to fetch user details');
      }

      const data = await response.json();
      setIsAdmin(data.Admin);
  } catch (error) {
      console.error("Error fetching user details:", error.message);
  }
};

  const navigate = useNavigate();
  let x=false;

  const logout = () => {
    setNavLog(false);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="font-sans flex justify-between text-l items-center py-3 px-8 bg-black text-white sticky top-0 z-10">
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
            
            {isAdmin? (<li className="mx-11 hover:text-discord hover:scale-105  px-4 py-1 hover:bg-white hover:rounded-2xl">
              <NavLink to="/admin">Admin</NavLink>
            </li>):(<li className="mx-11 hover:text-discord hover:scale-105  px-4 py-1 hover:bg-white hover:rounded-2xl">
              <NavLink to="/profile">Profile</NavLink>
            </li>)}
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
