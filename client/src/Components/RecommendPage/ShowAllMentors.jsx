import React, { useState, useEffect, useRef } from 'react';

export default function ShowAllMentors() {
    const btnRef = useRef(null);
    const perPage = 16;

    const [pagination, setPagination] = useState({
        start: 0,
        end: perPage,
        currentPage: 1,
        totalPages: 0
    });

    const [mentorData, setMentorData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/mentors/fetchAllMentors', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            const mentors = data.mentors;
            setMentorData(mentors);
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
        <h1 className='aboutusH1 text-center text-3xl font-bold my-8 text-black'>All Mentors</h1>
        <div className="grid grid-cols-4 gap-8">
            {myMentors.map((mentor) => (
                <div key={mentor._id} className="bg-white p-8 rounded-md shadow-md">
                    <img src={mentor.photo} alt={mentor.name} className="w-full h-60 object-cover mb-4 rounded-md shadow-md" />
                    <p className="font-bold text-xl mb-2 text-black">{mentor.name}</p>
                    <p className="text-gray-600 mb-2">{mentor.email}</p>
                    <p className="text-gray-600 mb-4">{mentor.gender === 'm' ? 'Male' : mentor.gender === 'f' ? 'Female' : mentor.gender}</p>
                    {mentor.expertise && Array.isArray(mentor.expertise) && (
                        <p className="text-gray-600 mb-4">Expertise: {mentor.expertise.join(', ')}</p>
                    )}
                </div>
            ))}
        </div>
        <div className='flex justify-center my-8 mt-8'>
            <button disabled={pagination.currentPage === 1} onClick={handlePrevPage} className="bg-blue-500 text-white font-bold px-6 py-2 rounded-md mr-4">Previous</button>
            <button disabled={pagination.currentPage === pagination.totalPages} onClick={handleNextPage} className="bg-orange-500 text-white font-bold px-6 py-2 rounded-md">Next</button>
        </div>
        </>
    );
}
