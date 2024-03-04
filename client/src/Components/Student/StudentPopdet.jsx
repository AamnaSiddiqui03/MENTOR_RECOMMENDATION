import React, { useContext, useRef, useState } from "react";
import StudentContext from "../../Context/student/studentContext";
import "../../assets/css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"; // Corrected icon names
// import MentorsRecommended from "./MentorsRecommended";

export default function StudentPopdet(props) {
  // const [showUpdate, setShowUpdate] = useState(false);
  // const [details, setDetails] = useState({
  //   name: "",
  //   Institution: "",
  //   interests: "",
  //   project: "",
  // });

  const context = useContext(StudentContext);
  const { notes, addDetails,updateDetails } = context;
  const popstate = useRef(null);
  const [details, setDetails] = useState({
    name: "",
    Institution: "",
    interests: "",
    project: "",
  });

  const cut = () => {
    if (popstate.current) {
      popstate.current.style.display = "none";
      props.setshowPpop(false);
    }
  };

  const handleAdd = async () => {
    try {
       addDetails(
        details.name,
        details.Institution,
       details.interests,
       details.project
      );
      props.setshowPpop(false);
    } catch (error) {
      console.error("An error occurred while adding details:", error);
      // Handle the error here (e.g., display an error message to the user)
    }
  };

  const handleUpdate = () => {
    updateDetails(
      props.notesid,
      details.name,
      details.Institution,
      details.interests,
      details.project
    );
    // props.setshowPpop(false);
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {props.showPpop && (
        <div className="form-popup" id="myForm" ref={popstate}>
          <form action="" className="form-container">
            <div className="relative">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="closingicon-form absolute top-0 right-0 cursor-pointer hover:text-red-500 transform hover:scale-125"
                style={{ fontSize: "16px" }}
                onClick={cut}
              />
            </div>
            <h1 className="aboutusH1">Student Details</h1>

            <label htmlFor="name" className="text-medblue">
              <b>Name</b>
            </label>
            <input
              type="text"
              className="text-medblue"
              name="name"
              placeholder="Enter Name"
              value={details.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="Institution">
              <b>Institution</b>
            </label>
            <input
              type="text"
              name="Institution"
              placeholder="Enter Institution"
              value={details.Institution}
              onChange={handleChange}
              required
            />

            <div style={{ position: "relative" }}>
              <label htmlFor="Interests">
                <b>Interests</b>
              </label>
              <select
                id="Interests"
                name="interests"
                value={details.interests}
                onChange={handleChange}
                required
                style={{
                  margin: "4px",
                  height: "20px",
                  overflowY: "auto",
                }}
              >
                <option value="">Select Interests</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Data Mining">Data Mining</option>
                <option value="Data Science">Data Science</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Big Data">Big Data</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Embedded Systems">Embedded Systems</option>
                <option value="Computer Engineering">
                  Computer Engineering
                </option>
                <option value="Blockchain Technology">
                  Blockchain Technology
                </option>
                <option value="Cryptocurrency">Cryptocurrency</option>
                <option value="Database Management">Database Management</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="React Native">React Native</option>
                <option value="Deep Learning">Deep Learning</option>
                <option value="Web Development">Web Development</option>
              </select>
            </div>

            <label htmlFor="Project">
              <b>Project Details</b>
            </label>
            <input
              type="text"
              name="project"
              placeholder="Enter Project"
              value={details.project}
              onChange={handleChange}
              required
            />
            {!props.showUpdate? (
              <button type="button" className="btn" onClick={handleAdd}>
                Add Details
              </button>
            ) : (
              <button type="button" className="btn" onClick={handleUpdate}>
                Update Details
              </button>
            )}
          </form>
        </div>
      )}
      <div>{/* Other content */}</div>
    </>
  );
}
