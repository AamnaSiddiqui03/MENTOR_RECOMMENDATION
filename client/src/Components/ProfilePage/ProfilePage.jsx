import React, { useEffect, useState } from 'react';
import Navbar from '../AllPage/Navbar';
import Footer from '../AllPage/Footer';
import "../../assets/css/aboutus.css"
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const [userdet, setUserDet] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const navigate= useNavigate();

    useEffect(() => {
       
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/getUser', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            const data = await response.json();
            setUserDet(data.result);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleEditName = () => {
        setIsEditing(true);
        setEditedName(userdet.name);
    };

    const handleSaveName = async () => {
        try {
          
            const response = await fetch('http://localhost:8080/api/auth/updateUser', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ name: editedName })
            });
            if (!response.ok) {
                throw new Error('Failed to update name');
            }
            await fetchUserDetails();
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };

    const handleDeleteProfile = async() => {
        await fetch('http://localhost:8080/api/auth/deleteUser',{
            method:"DELETE",
            headers:{
                'Content-Type':'application.json',
                'auth-token':localStorage.getItem("token")
            }
        }).then(res=>{
            if(res.ok){
                // localStorage.removeItem("token");
                window.alert("User profile deleted. You will now be redirected to the login page.");
             navigate('/login');
                localStorage.removeItem("token");
                setUserDet(null); 
            }
        }).catch(err=>{
            console.error("unable to delete")
        })

    };

    return (
        <>
         

        
        <Navbar/>
        <div className='mainbody'>

        <div className="flex justify-center items-center" style={{height:'530px'}}>
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-3xl font-semibold text-center mb-4">User Profile</h1>
                {userdet && (
                    <div>
                        {isEditing ? (
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    value={editedName} 
                                    onChange={(e) => setEditedName(e.target.value)} 
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
                                    />
                                <button 
                                    onClick={handleSaveName} 
                                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-2 focus:outline-none transition duration-300"
                                    >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg mb-2"><span className="font-semibold">Name:</span> {userdet.name}</p>
                                <p className="text-lg mb-2"><span className="font-semibold">Email:</span> {userdet.email}</p>
                                <p className="text-lg mb-4"><span className="font-semibold">Is Mentor:</span> {userdet.isMentor ? 'Yes' : 'No'}</p>
                                <button 
                                    onClick={handleEditName} 
                                    className="block w-full bg-medblue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none transition duration-300"
                                    >
                                    Edit Name
                                </button>
                                <button 
                                    onClick={handleDeleteProfile} 
                                    className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mt-2 focus:outline-none transition duration-300"
                                    >
                                    Delete Profile
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {!userdet && <p>Loading...</p>}
            </div>
        </div>
        <Footer/>
        </div>
                        </>
    );
}
