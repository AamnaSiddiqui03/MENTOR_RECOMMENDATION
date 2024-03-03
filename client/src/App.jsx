import React from 'react'
import './App.css'
import Recommend from './Components/RecommendPage/Recommend'
import {Routes, Route} from "react-router-dom";
import studentState from './Context/student/studentState';
import MainPage from './Components/MainPage/MainPage';
import SignIn from './Components/Auth/Signin';
import Login from './Components/Auth/Login';
// import SignIn from './Components/Signin';
// import LoginPage from './Components/LoginPage';
// import SignInPage from './Components/Signuppage';


function App() {

  return (
    <>
    <studentState >

    <div className='App'>
      <Routes>
        <Route path='/' element={ <MainPage/>}></Route>
        
        <Route path='/recommend' element={ <Recommend/>}></Route>
        <Route path='/login' element={ <Login/>}></Route>
        <Route path='/signup' element={ <SignIn/>}></Route>
        {/* <Route path='/virtualmeet' element={ }></Route> */}
      </Routes>
   

     
    </div>

    </studentState>
    </>
  )
}

export default App
