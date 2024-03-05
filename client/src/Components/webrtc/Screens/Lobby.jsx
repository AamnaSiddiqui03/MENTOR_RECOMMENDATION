// LobbyScreen.jsx

import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../Context/webrtc/SocketProvider";
import Navbar from "../../AllPage/Navbar";
import Footer from "../../AllPage/Footer";

import "../../../assets/css/lobbyscreen.css";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (socket) {
        socket.emit("room:join", { email, room });
      }
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      navigate(`/room/${room}`);
      const { email, room } = data;
    },
    [navigate]
  );

  useEffect(() => {
    if (socket) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);

  return (
    <>
      <Navbar />
      <div className="webrtc-container" style={{ height: '470px', marginTop: '50px' }}>
        <h1 className="aboutusH1">Lobby</h1>
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
          <button className="webrtc-button" onClick={handleJoinRoom}>Join</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LobbyScreen;
