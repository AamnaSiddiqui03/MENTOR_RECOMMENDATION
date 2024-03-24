// App.js

import React from 'react';
import { Routes, Route } from "react-router-dom";
import StudentState from './Context/student/studentState'; // Corrected import
import MainPage from './Components/MainPage/MainPage';
import Recommend from './Components/RecommendPage/Recommend';
import Login from './Components/Auth/Login';
import SignIn from './Components/Auth/Signin';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import LobbyScreen from './Components/webrtc/Screens/Lobby';
import RoomPage from './Components/webrtc/Screens/Room';
import Admin from './Components/Admin/Admin';

function App() {
  return (
    <StudentState>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignIn />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/virtualmeet' element={<LobbyScreen />} />
          <Route path='/room/:roomId' element={<RoomPage />} />
          <Route path='/admin' element={<Admin/>} />
        </Routes>
      </div>
    </StudentState>
  );
}

export default App;
