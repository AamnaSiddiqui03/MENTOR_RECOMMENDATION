import React from 'react'
import GettingStarted from './GettingStarted'
import Navbar from './Navbar'
import AboutUs from './Aboutus'
import Contactus from './Contactus'
import Footer from './Footer'

import SignIn from './Signin'
import Login from './Login'



export default function MainPage() {
  let x=0;
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
