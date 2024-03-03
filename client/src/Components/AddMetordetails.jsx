import React, { useState } from 'react';

export default function AddMentorDetails() {
    const [mentorDetails, setMentorDetails] = useState({
        _id: '',
        isMentor: true,
        mentor_id: '',
        name: '',
        photo: '',
        gender: '',
        email: '',
        expertise: [],
        working_place: '',
        bio: '',
        experience: '',
        projects: [],
        qualifications: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMentorDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleExpertiseChange = (e) => {
        const { value } = e.target;
        setMentorDetails(prevState => ({
            ...prevState,
            expertise: value.split(',')
        }));
    };

    const handleProjectsChange = (e) => {
        const { value } = e.target;
        setMentorDetails(prevState => ({
            ...prevState,
            projects: value.split(',')
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(mentorDetails);
    };

    return (
        <>
        <h1 className="aboutusH1">Add Mentor Details</h1>
        <div className="w-full h-full flex items-center justify-center shadow p-8">
            <div className="w-96">
                <form onSubmit={handleSubmit} className="flex flex-col items-center text-center">
                    <input type="text" name="_id" placeholder="ID" value={mentorDetails._id} onChange={handleChange} required className="input-field w-full my-2 text-center border rounded-md shadow-xl border-blue-900" />
                    <input type="text" name="mentor_id" placeholder="Mentor ID" value={mentorDetails.mentor_id} onChange={handleChange} required className="input-field my-2 w-full text-center rounded-md border shadow-xl border-blue-900" />
                    <input type="text" name="name" placeholder="Name" value={mentorDetails.name} onChange={handleChange} required className="input-field w-full text-center border my-2 rounded-md shadow-xl border-blue-900" />
                    <input type="text" name="photo" placeholder="Photo URL" value={mentorDetails.photo} onChange={handleChange} required className="input-field w-full text-center my-2 rounded-md border shadow-xl border-blue-900" />
                    <input type="text" name="gender" placeholder="Gender" value={mentorDetails.gender} onChange={handleChange} required className="input-field w-full text-center border rounded-md my-2 shadow-xl border-blue-900" />
                    <input type="email" name="email" placeholder="Email" value={mentorDetails.email} onChange={handleChange} required className="input-field w-full text-center border rounded-md shadow-xl border-blue-900" />
                    <input type="text" name="expertise" placeholder="Expertise (comma-separated)" value={mentorDetails.expertise.join(',')} onChange={handleExpertiseChange} required className="input-field w-full shadow-xl text-center rounded-md border my-2 border-blue-900" />
                    <input type="text" name="working_place" placeholder="Working Place" value={mentorDetails.working_place} onChange={handleChange} required className="input-field w-full text-center border rounded-md my-2 shadow-xl border-blue-900" />
                    <textarea name="bio" placeholder="Bio" value={mentorDetails.bio} onChange={handleChange} required className="input-field w-full border my-2 border-blue-900 p-2" />
                    <input type="text" name="experience" placeholder="Experience" value={mentorDetails.experience} onChange={handleChange} required className="input-field w-full text-center rounded-md border my-2 shadow-xl border-blue-900" />
                    <input type="text" name="projects" placeholder="Projects (comma-separated)" value={mentorDetails.projects.join(',')} onChange={handleProjectsChange} required className="input-field w-full shadow-xl rounded-md text-center border my-2 border-blue-900" />
                    <input type="text" name="qualifications" placeholder="Qualifications" value={mentorDetails.qualifications} onChange={handleChange} required className="input-field w-full text-center shadow-xl rounded-md border my-2 border-blue-900" />
                    
                    <button type="submit" className="btn mt-4 px-4 py-1 hover:scale-105 bg-orange-500 shadow-2xl rounded-3xl">Submit</button>
                </form>
            </div>
        </div>
        </>
    );
}
