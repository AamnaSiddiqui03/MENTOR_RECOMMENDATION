import React, { useContext } from 'react'
import studentContext from '../../Context/student/studentContext';

export default function StudentPopUpdate() {
    const context= useContext(studentContext);
    const {notes, updateDetails}= context;
    const [details, setDetails] = useState({
        name:"",
        Institution:"",
        interests:"",
        project:""
      })
      console.log(notes);


    // const handleUpdate=(id)=>{
    //     updateDetails(, name, Institution, interests, project);
    //   }
      
    return (
        <>
          {/* <div className="overlay" onClick={cut}></div> */}
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
                value={details.name}
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
                value={details.Institution}
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
                  value={details.interests}
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
                value={details.project}
                onChange={(e) => {
                  setProject(e.target.value);
                }}
                required
              />
              <button type="button" className="btn" onClick={handleUpdate}>
                {" "}
                Update Details
              </button>
            </form>
          </div>
    
          <div>
            <MentorsRecommended id={studentId} />
          </div>
        </>
      );
}
