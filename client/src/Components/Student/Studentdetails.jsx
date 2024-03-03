import React, { useEffect, useState, useContext } from "react";
import StudentProjectCards from "./StudentProjectCards";
import StudentPopdet from "./StudentPopdet";
import StudentContext from "../../Context/student/studentContext";

export default function Studentdetails() {
  const context = useContext(StudentContext);
  const { notes, fetchDetails } = context;

  useEffect(()=>{
    fetchDetails(); 
  })

  const [showPpop,setshowPpop] = useState(false);
  const [showUpdate, setShowUpdate]=useState(false);

  return (
    <div>
        <StudentPopdet showPpop={showPpop} setshowPpop={setshowPpop} showUpdate={showUpdate} setShowUpdate={setShowUpdate}/>
        <StudentProjectCards showPpop={showPpop} setshowPpop={setshowPpop} showUpdate={showUpdate} setShowUpdate={setShowUpdate}/>
    </div>
  );
}
