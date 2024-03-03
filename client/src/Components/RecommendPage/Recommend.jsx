import React, {useEffect, useState} from 'react'
import Navbar from '../AllPage/Navbar'
import Footer from '../AllPage/Footer'
import ReviewCard from '../Cards/RevCard'
// import SwiperCardRev from './SwiperRev'
import SwiperCard from '../AllPage/Swiper'
// import CardHomeDisplay from './CardHomeDisplay'
import student from '../../assets/review.json'
import StudentPopdet from '../Student/StudentPopdet'
// import MentorsRecommended from '../Student/MentorsRecommended'
import ShowAllMentors from './ShowAllMentors'

// import AddMetordetails from './AddMetordetails'
import '../../assets/css/aboutus.css'
import { useNavigate } from 'react-router-dom'
import Studentdetails from '../Student/Studentdetails'
// import Studentprojects from './Studentprojects'

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
    {/* add the student reviews */}
    {/* <SwiperCardRev child={CardHomeDisplay}/> */}
    {/* add the student add project button */}
    {/* add the student recommend button */}
    {/* add loader */}
    {/* add the swiper.js of all student */}
    {/* add all mentors */}

    <SwiperCard child={ReviewCard} array={student} heading={'Reviews'}/>
    {/* <AddMetordetails/> */}

    {showStudentPop && <StudentPopdet/>}
    <Studentdetails/>
    {/* <MentorsRecommended/> */}
    <ShowAllMentors/>
    
  
    <Footer/>
    </>
  )
}
