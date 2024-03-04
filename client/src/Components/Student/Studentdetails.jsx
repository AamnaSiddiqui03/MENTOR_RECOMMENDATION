import React, { useEffect, useState, useContext } from "react";
import StudentProjectCards from "./StudentProjectCards";
import StudentPopdet from "./StudentPopdet";
import StudentContext from "../../Context/student/studentContext";

export default function Studentdetails() {
  const context = useContext(StudentContext);
  const { notes, fetchDetails } = context;
  const [notesid, setNotesid] = useState()
  // const [details, setDetails] = useState({
  //   name: "",
  //   Institution: "",
  //   interests: "",
  //   project: "",
  // });

  useEffect(()=>{
    fetchDetails(); 
  },[])

  const [showPpop,setshowPpop] = useState(false);
  const [showUpdate, setShowUpdate]=useState(false);

  return (
    <div>
        <StudentPopdet showPpop={showPpop} setshowPpop={setshowPpop} showUpdate={showUpdate} setShowUpdate={setShowUpdate} notesid={notesid} setNotesid={setNotesid}/>
        <StudentProjectCards showPpop={showPpop} setshowPpop={setshowPpop} showUpdate={showUpdate} setShowUpdate={setShowUpdate}  notesid={notesid} setNotesid={setNotesid}/>
    </div>
  );
}
