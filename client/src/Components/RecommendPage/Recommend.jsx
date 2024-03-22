import React, {useEffect, useState} from 'react'
import Navbar from '../AllPage/Navbar'
import Footer from '../AllPage/Footer'
import ReviewCard from '../Cards/RevCard'
import SwiperCard from '../AllPage/Swiper'
import student from '../../assets/review.json'
import StudentPopdet from '../Student/StudentPopdet'
import ShowAllMentors from './ShowAllMentors'
import '../../assets/css/aboutus.css'
import { useNavigate } from 'react-router-dom'
import Studentdetails from '../Student/Studentdetails'


export default function Recommend() {

  const navigate= useNavigate();
  
  const [showStudentPop, setShowStudentPop] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if(!token) {
      navigate('/login');
    }
   
    const timer = setTimeout(() => {
      setShowStudentPop(true);
    }, 15000);

    // return () => clearTimeout(timer);
  }, []); // Empty dependency array to run the effect only once

  return (
    <>

    <Navbar/>
    <SwiperCard child={ReviewCard} array={student} heading={'Reviews'}/>
    {showStudentPop && <StudentPopdet/>}
    <Studentdetails/>
    <ShowAllMentors/>
    <Footer/>
    </>
  )
}
