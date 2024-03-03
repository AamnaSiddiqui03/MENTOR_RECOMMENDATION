import React, { useRef, useState,useEffect } from 'react';
import '../assets/css/login.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {

  const [logindetails, setLogindetails] = useState({
    email: '',
    password:''
  });

  const [loginstatus, setLoginStatus] = useState('');



  const popstate = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  // const [error, setError] = useState('')
const navigate= useNavigate();
  const cut = () => {
    if (popstate.current) {
      setIsOpen(false);
      popstate.current.style.display='none';
      navigate('/') 
      }
    }

    const submitlogin=()=>{
      fetch('http://localhost:8080/api/auth/login/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: logindetails.email, password: logindetails.password })
      }).then(res => {
        if (res.ok) {
          return res.json(); // Parse the response body as JSON
        } else {
          throw new Error('Invalid Credentials');
        }
      }).then(data => {
        setLoginStatus("User Logged Successfully");
        localStorage.setItem("token", data.authtoken);
        localStorage.setItem("userid",data.userid);
        navigate('/');
        
        // Access the authtoken property from the parsed JSON data
        //navigate recommended
      }).catch(err => {
        console.error('Error logging in:', err);
        setLoginStatus('Error in logging in');
      });
    }
      
  
    // useEffect(()=>{
    //   fetch('http://localhost:8080/login', {
    //     method: "GET",
    //     credentials: 'include',
    //   }).then((res)=>{
    //     console.log("fetched");
    //     // return res.json();
    //   })

    //   .catch(e=>{
    //     console.error(e);
    //   })
    // }, [])



  

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
          <h1 className="aboutusH1">Login</h1>

          <label for="email" className="text-medblue">
            <b>Email</b>
          </label>
          <input type="text" className="text-medblue" placeholder="Enter Email" name="email" required  value={logindetails.email} onChange={(e) => setLogindetails({ ...logindetails, email: e.target.value })}/>

          <label for="psw">
            <b>Password</b>
          </label>
          <input type="password" placeholder="Enter Password" name="psw" required  value={logindetails.password} onChange={(e) => setLogindetails({ ...logindetails, password: e.target.value })}/>

          <button type="button" class="btn" onClick={submitlogin} >
            Login
          </button>
          {/* <button type="button" class="btn cancel" onClick={cut}>Close</button> */}
          {loginstatus}
          <h3>
            Signin? <NavLink to="/signup" style={{ color: 'blue' }}>
              Signin
            </NavLink>
          </h3>
        </form>
      </div>
    </>
  );
}
