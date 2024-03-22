import React from 'react'
import GettingStarted from './GettingStarted'
import Navbar from '../AllPage/Navbar'
import AboutUs from './Aboutus'
import Contactus from './Contactus'
import Footer from '../AllPage/Footer'

import SignIn from '../Auth/Signin'
import Login from '../Auth/Login'



export default function MainPage() {
  return (
    <div className='mainbody'>
      <Navbar />
      <GettingStarted />
      <AboutUs/>
      <Contactus/>
      <Footer/>      
    </div>
  )
}
