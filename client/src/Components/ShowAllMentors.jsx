import React, { useState, useEffect, useRef } from 'react';

export default function ShowAllMentors() {
    const btnRef = useRef(null);
    // const totalBoxes = Mentor.length; // Remove this line
    const perPage = 16;

    const [pagination, setPagination] = useState({
        start: 0,
        end: perPage,
        currentPage: 1,
        totalPages: 0 // Initialize totalPages with 0
    });

    const [mentorData, setMentorData] = useState([]); // Change Mentor to mentorData

    useEffect(() => {
        fetch('http://localhost:8080/api/user/recommender/student', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('fetched');
            const mentors = data.mentors; // Change Mentor to mentors
            console.log(mentors);
            setMentorData(mentors); // Change Mentors to mentors
        })
        .catch((error) => {
            console.error('Error fetching mentors:', error);
        });
    }, []);

    useEffect(() => {
        setPagination(prevState => ({
            ...prevState,
            totalPages: Math.ceil(mentorData.length / perPage)
        }));
    }, [mentorData, perPage]);

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            setPagination(prevState => ({
                ...prevState,
                start: prevState.end,
                end: Math.min(prevState.end + perPage, mentorData.length),
                currentPage: prevState.currentPage + 1
            }));
        }
    };

    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            setPagination(prevState => ({
                ...prevState,
                end: prevState.start,
                start: Math.max(0, prevState.start - perPage),
                currentPage: prevState.currentPage - 1
            }));
        }
    };

    const myMentors = mentorData.slice(pagination.start, pagination.end);

    return (
        <>
        <h1 className='aboutusH1'>All Mentors</h1>
        <div className="grid grid-cols-4 gap-4">
            {myMentors.map((mentor) => (
                <div key={mentor._id} className="bg-white p-4 rounded-md shadow-md">
                    <img src={mentor.photo} alt={mentor.name} className="w-full max h-80 object-cover mb-4 rounded-md shadow-md" />
                    <p className="font-bold text-xl mb-2">{mentor.name}</p>
                    <p className="text-gray-600">{mentor.email}</p>
                    <p className="text-gray-600">{mentor.gender}</p>
                    {mentor.expertise && Array.isArray(mentor.expertise) && (
                        <p className="text-gray-600">Expertise: {mentor.expertise.join(', ')}</p>
                    )}
                </div>
            ))}
        </div>
            <div className='h-24 relative w-full '>

            <button disabled={pagination.currentPage === 1} onClick={handlePrevPage} className=" bg-gray-200  p-2 rounded-md text-gray-700 font-bold absolute left-8">Previous</button>
            <button disabled={pagination.currentPage === pagination.totalPages} onClick={handleNextPage} className=" bg-gray-200 p-2  rounded-md text-gray-700 font-bold absolute right-8">Next</button>
            </div>
        </>
    );
}
