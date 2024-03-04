import { useContext, useState } from "react";
import studentContext from "./studentContext";

import React from 'react'


const studentState = (props) => {
    let initialNotes=[];
    const [notes, setNotes] = useState(initialNotes);


    const host = "http://localhost:8080";

    const addDetails = async (name, institution, interests, project) => {
        try {
            const response = await fetch('http://localhost:8080/api/student/addDetails', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: name,
                    Interests: interests,
                    Institution: institution,
                    project: project,
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to add details: ' + response.statusText);
            }
    
            const json = await response.json();
            setNotes(notes.concat(json));
            console.log(notes);
        } catch (error) {
            console.error('An error occurred while adding details:', error);
            // Handle the error here (e.g., display an error message to the user)
        }
    }
    

    const updateDetails = async(id, myname, Institution, interests, project) => {

        const response =await fetch(`http://localhost:8080/api/student/updateDetails/${id}`, { // Use backticks ` instead of quotes '
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                upname: myname,
                upInstitution: Institution,
                upInterests: interests,
                upproject: project,
            })
        });
        const json= await response.json();
        fetchDetails();

    }


    const deleteDetails = async(id) => {
        console.log("this is my idddddd", id);
        await fetch(`http://localhost:8080/api/student/deleteDetails/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        
        const newNotes= notes.filter(note=>{ return note._id!==id} )

        setNotes(newNotes);
    }


    const fetchDetails = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/student/fetchNotes', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          const data = await response.json();
        //   console.log(data);
          setNotes(data);
          // Further logic to handle the response data
        } catch (error) {
          console.error("An error occurred while fetching details:", error);
          // Handle the error here
        }
      };
      



 
        return (
            <studentContext.Provider value={{ notes:notes, addDetails, updateDetails, deleteDetails, fetchDetails }}>
                {props.children}
            </studentContext.Provider>
        );
}


export default studentState;