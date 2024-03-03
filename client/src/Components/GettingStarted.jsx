import React, { useState } from 'react';
import myVideo from '../assets/bgVideo2.mp4';
import TextApp from './Text';
import SwiperCard from './Swiper';
import '../assets/css/main-page.css'; // Importing the CSS file
import CardHomeDisplay from './CardHomeDisplay';
import mentor from '../assets/data.json';
import { useNavigate } from "react-router-dom";
import Login from './Login';

export default function GettingStarted() {
  const [login, setLoggedin] = useState(true);
  const navigateTo = useNavigate();

  const handleClick = () => {
    if(!login){
      navigateTo('/login');
    }else{
      navigateTo('/recommend'); // Always navigate to '/recommend'

    }
   
  }

  return (
    <>
      <div className="custom-container">
        <div className="video-container">
          <video className="video-background z-8" src={myVideo} autoPlay loop muted></video>
          <div className="content-wrapper">
            <div className="content">
              <h1 className="heading">
                <TextApp />
              </h1>
              <button className="cta-button" onClick={handleClick}>Get Started</button>
            </div>
          </div>
        </div>
        <div className="spacer"></div>
      </div>
     










      <div>
        <SwiperCard child={CardHomeDisplay} heading={'Namma Mentors'} array={mentor} />
      </div>

      {/* {login && <Login />}  */}
    </>
  )
}
