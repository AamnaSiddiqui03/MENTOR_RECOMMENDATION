import React, { useRef, useState } from "react";

import "../assets/css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"; // Corrected icon names
import MentorsRecommended from "./MentorsRecommended";

export default function StudentPopdet(props) {
  // const [showUpdate, setShowUpdate] = useState(false);

  const popstate = useRef(null);
  const cut = () => {
    if (popstate.current) {
      setIsOpen(false);
      popstate.current.style.display = "none";
      props.setshowPpop(false);
    }
  };
  const [interests, setInterests] = useState(""); // State to store selected interests
  const [name, setName] = useState("");
  const [Institution, setInstitution] = useState("");
  const [project, setProject] = useState("");
  const [showproject, setShowProject] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [studentId, setStudentId] = useState(null); // State to store student ID

  const handleAdd = () => {
    
    fetch("http://localhost:8080/api/user/studentdetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        name: name,
        Institution: Institution,
        Interests: interests,
        project: project,
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((data) => {
        setStudentId(data.id);
        console.log(data.id);
        props.setUser(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      props.setshowPcard(!props.showPcard);
    setShowProject(true);
    setIsOpen(false);
    popstate.current.style.display = "none";
  };

  const handleUpdate = () => {
    fetch("http://localhost:8080/api/user/Updatestudentdetails", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
        upname: name,
        upInstitution: Institution,
        upInterests: interests,
        upproject: project,
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((data) => {
        console.log(data.id);
        props.setUser(true);
        setStudentId(data.id);
        props.setshowPcard(!props.showPcard);
      });
    //id

    setShowProject(true);
    setIsOpen(false);
    popstate.current.style.display = "none";
  };

  // Function to handle change in interests dropdown
  const handleInterestChange = (event) => {
    setInterests(event.target.value); // Update interests state with selected value
  };
  return (
    <>
      {/* <button className="open-button" onclick="openForm()">Open Form</button> */}

      {isOpen && <div className="overlay" onClick={cut}></div>}
      <div className="form-popup" id="myForm" ref={popstate}>
        <form action="" className="form-container">
          <div className="relative">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="closingicon-form absolute top-0 right-0 cursor-pointer hover:text-red-500 transform hover:scale-125"
              style={{ fontSize: "16px" }} // Adjust the font size as needed
              onClick={cut}
            />
            {/* Your other content */}
          </div>
          <h1 className="aboutusH1">Student Details</h1>

          <label htmlFor="name" className="text-medblue">
            <b>Name</b>
          </label>
          <input
            type="text"
            className="text-medblue"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />

          <label htmlFor="Institution">
            <b>Institution</b>
          </label>
          <input
            type="text"
            placeholder="Enter Institution"
            value={Institution}
            onChange={(e) => {
              setInstitution(e.target.value);
            }}
            required
          />

          <div style={{ position: "relative" }}>
            <label htmlFor="Interests">
              <b>Interests</b>
            </label>
            <select
              id="Interests"
              value={interests}
              onChange={handleInterestChange}
              required
              style={{
                margin: "4px",
                height: "20px", // Set the height of the select element
                overflowY: "auto", // Enable vertical scrolling
              }}
            >
              <option value="">Select Interests</option>
              <option value="Mobile App Developement">
                Mobile App Developement
              </option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Data Mining">Data Mining</option>
              <option value="Data Science">Data Science</option>
              <option value="Computer Science"> Computer Science</option>
              <option value="Big Data"> Big Data</option>
              <option value="Cloud Computing"> Cloud Computing</option>
              <option value="Embedded Systems"> Embedded Systems</option>
              <option value="Computer Engineering">
                {" "}
                Computer Engineering
              </option>
              <option value="Blockchain Technology">
                {" "}
                Blockchain Technology
              </option>
              <option value="Cryptocurrency"> Cryptocurrency</option>
              <option value="Database Management"> Database Management</option>
              <option value="Computer Vision"> Computer Vision</option>
              <option value="React Native"> React Native</option>
              <option value="Deep Learning"> Deep Learning</option>
              <option value="Web Developement">Web Developement</option>
            </select>
          </div>

          <h1>{studentId}</h1>
          <label htmlFor="Project">
            <b>Project Details</b>
          </label>
          <input
            type="text"
            placeholder="Enter Project"
            value={project}
            onChange={(e) => {
              setProject(e.target.value);
            }}
            required
          />
     <button type="button" className="btn" onClick={handleAdd}>Add Details</button>
<button type="button" className="btn" onClick={handleUpdate}> Update Details</button>
          {/* <button type="button" className="btn cancel" onclick="closeForm()">Close</button> */}
          {/* <h3>Signin? <a href="URL_HERE" style={{ color: 'blue' }}>Signin</a></h3> */}
          {/* <button type="button" className="btn" onClick={handleUpdate}>
            {" "}
            Update Details
          </button> */}
        </form>
      </div>

      <div>{studentId && <MentorsRecommended id={studentId} />}</div>
    </>
  );
}
