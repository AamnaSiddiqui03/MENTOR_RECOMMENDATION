// LobbyScreen.jsx

import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../Context/webrtc/SocketProvider";
// import Navbar from "./Navbar"; // Import Navbar component
import Navbar from "../../AllPage/Navbar";
import Footer from "../../AllPage/Footer";
import "../../../assets/css/lobbyscreen.css";

const LobbyScreen = () => {
  const [userdet, setUserDet] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("Token:", token);
    if (!token) {
      navigate("/login");
    }


  }, []);

  useEffect(() => {
    fetchUserDetails();
}, []);

const fetchUserDetails = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/getUser', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUserDet(data.result);
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
 

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      <Navbar />
      <div className="webrtc-container" style={{"height":"470px", 'marginTop':'60px'}}>
        <h1 className="aboutusH1">Lobby {userdet && userdet.isMentor ? "mentor":"student"}</h1>
        <form className="webrtc-form" onSubmit={handleSubmitForm}>
          <label className="webrtc-label" htmlFor="email">Email ID</label>
          <input
            className="webrtc-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="webrtc-label" htmlFor="room">Room Number</label>
          <input
            className="webrtc-input"
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <button className="webrtc-button">Join</button>
        </form>
      </div>
        <Footer/>
    </>
  );
};

export default LobbyScreen;
