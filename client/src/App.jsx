import React from 'react'
import './App.css'
import Recommend from './Components/Recommend'
import {Routes, Route} from "react-router-dom";

import MainPage from './Components/MainPage'
;
import SignIn from './Components/Signin';
import Login from './Components/Login';
// import SignIn from './Components/Signin';
// import LoginPage from './Components/LoginPage';
// import SignInPage from './Components/Signuppage';


function App() {

  return (
    <>
    <div className='App'>
      <Routes>
        <Route path='/' element={ <MainPage/>}></Route>
        
        <Route path='/recommend' element={ <Recommend/>}></Route>
        <Route path='/login' element={ <Login/>}></Route>
        <Route path='/signup' element={ <SignIn/>}></Route>
        {/* <Route path='/virtualmeet' element={ }></Route> */}
      </Routes>
   

     
    </div>

    </>
  )
}

export default App
