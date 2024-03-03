import React, { useRef, useState } from 'react'
import '../assets/css/login.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { NavLink, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(true);
  const popstate =useRef(null);
  const [signinstatus, setSigninstatus] = useState('');

  const [Signindetails,setSignindetails] = useState({
    name:'',
    email:'',
    password:''
  })

  //value={Signindetails.email} onChange={(e)=>setSignindetails.email(e.target.value)}

  



//all function i am writing
const [isMentor, setIsMentor]= useState(false);

const navigate= useNavigate();
const signinStudent=()=>{
 setIsMentor(false);
 
}
const signinMentor=()=>{
  setIsMentor(true);
  
}
const cut=()=>{
  if(popstate.current){
    setIsOpen(false);
    navigate('/')
    popstate.current.style.display='none';
  }
}


const handlesigninonclick = () => {
  fetch('http://localhost:8080/api/auth/signup/student', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email: Signindetails.email, name: Signindetails.name, password: Signindetails.password })
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json(); // Parse the response body as JSON
      } else {
        throw new Error('User already Exists');
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.authtoken);
      localStorage.setItem("userid", data.userid);
      setSigninstatus("User Signed Up Successfully");
      // navigate recommended
    })
    .catch((err) => {
      console.error(err);
      setSigninstatus('Error in signing in');
    });
}








  return (
    <>
{isOpen && <div className="overlay" onClick={cut}></div>}
<div class="form-popup" id="myForm" ref={popstate}>
  <form action="" class="form-container">
  <div className="relative">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="closingicon-form absolute top-0 right-0 cursor-pointer hover:text-red-500 transform hover:scale-125"
        style={{ fontSize: '16px' }} // Adjust the font size as needed
        onClick={cut}
      />
      {/* Your other content */}
    </div>
    <h1 className='aboutusH1'>SignIn {isMentor? 'Mentor':'Student'}</h1>

    <label for="name" className='text-medblue'><b>Name</b></label>
    <input type="text" className='text-medblue' placeholder="Enter Full name" name="name" required value={Signindetails.name} onChange={(e)=>setSignindetails({...Signindetails, name: e.target.value})}/>
    <label for="email" className='text-medblue' ><b>Email</b></label>
    <input type="text" className='text-medblue' placeholder="Enter Email" name="email" required value={Signindetails.email} onChange={(e)=>setSignindetails({...Signindetails, email: e.target.value})}/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required value={Signindetails.password} onChange={(e)=>setSignindetails({...Signindetails, password: e.target.value})}/>


    <div>
    <button type="button"  className={`selectsigninform ${!isMentor ? 'selected-signin-metstu' : ''}`}  onClick={signinStudent} >STUDENT</button> 
    <button type="button"  className={`selectsigninform ${!isMentor ? '' : 'selected-signin-metstu'}`}  onClick={signinMentor}>MENTOR</button> 

    </div>
    <button type="button" onClick={handlesigninonclick} class="btn">Sign In</button>
    {signinstatus}
    <h3>login? <NavLink to="/login" style={{ color: 'blue' }}>login</NavLink></h3>

  </form>
</div></>
  )
}
