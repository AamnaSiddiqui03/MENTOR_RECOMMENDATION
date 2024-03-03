import { useContext, useState } from "react";
import studentContext from "./studentConext";

import React from 'react'


const studentState = (props) => {
    const [notes, setNotes] = useState(null);


    const host = "http://localhost:5000";

    const addDetails = async () => {

        const response = await fetch('http://localhost:8080/api/student/deleteDetails/:id', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                upname: name,
                upInstitution: Institution,
                upInterests: interests,
                upproject: project,
            })
        });

        const json = await response.json();

        setNotes(notes.concat(json));
    }

    const updateDetails = async(id) => {

        const response =await fetch(`http://localhost:8080/api/student/updateDetails/${id}`, { // Use backticks ` instead of quotes '
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                upname: name,
                upInstitution: Institution,
                upInterests: interests,
                upproject: project,
            })
        });
        const json= await response.json();
        fetchDetails();

    }


    const deleteDetails = async(id) => {
        await fetch(`http://localhost:8080/api/student/deleteDetails/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        
        const newNotes= notes.filter(note=>{ return note.id!==id} )

        setNotes(newNotes);
    }




    const fetchDetails = async() => {
        const response= await fetch('http://localhost:8080/api/student/fetchDetails',{
            method: "GET",
            headers: localStorage.getItem("token")
        })

        const json =await response.json();
        setNotes(json);
    }

    

    return (
        <studentContext.Provider value={{ notes, addDetails, updateDetails, deleteDetails, fetchDetails }}>
            {props.children}
        </studentContext.Provider>
    )
}


export default studentState;