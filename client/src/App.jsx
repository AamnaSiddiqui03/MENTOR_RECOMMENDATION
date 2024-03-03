import React from 'react';
import './App.css';
import Recommend from './Components/RecommendPage/Recommend';
import { Routes, Route } from "react-router-dom";
import StudentState from './Context/student/studentState'; // Corrected import
import MainPage from './Components/MainPage/MainPage';
import SignIn from './Components/Auth/Signin';
import Login from './Components/Auth/Login';

function App() {
  return (
    <StudentState> {/* Wrap the entire application with StudentState */}
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignIn />} />
          {/* <Route path='/virtualmeet' element={}></Route> */}
        </Routes>
      </div>
    </StudentState>
  );
}

export default App;
