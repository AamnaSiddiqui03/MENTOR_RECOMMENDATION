import React from 'react';

export default function ModalMentor(props) {
  const handleClose = () => {
    props.setOpenModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-3 rounded-lg shadow-lg" style={{ marginTop: '5vh' , 'width':'50%'}}>
        <h2 className="text-xl font-bold mb-4">Update Details</h2>
        <form className="space-y-4" onSubmit={props.handleSubmitUpdate}>
          <div className="w-full mx-auto">
            {/* Name */}
            <div>
              <h6 className="text-sm font-semibold">Name</h6>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={props.mentorDetails.name}
                onChange={props.handleChange}
                required
                className="input-field w-full text-center border-4 my-1 rounded-md shadow-xl border-orange-100"
              />
            </div>
            {/* Photo URL */}
            <div>
              <h6 className="text-sm font-semibold">Photo URL</h6>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                value={props.mentorDetails.photo}
                onChange={props.handleChange}
                required
                className="input-field w-full text-center my-1 rounded-md border-4 shadow-xl border-orange-100"
              />
            </div>
            {/* Gender */}
            <div>
              <h6 className="text-sm font-semibold">Gender</h6>
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={props.mentorDetails.gender}
                onChange={props.handleChange}
                required
                className="input-field w-full text-center border-4 rounded-md my-1 shadow-xl border-orange-100"
              />
            </div>
            {/* Expertise */}
            <div>
              <h6 className="text-sm font-semibold">Expertise (comma-separated)</h6>
              <input
                type="text"
                name="expertise"
                placeholder="Expertise"
                value={props.mentorDetails.expertise.join(',')}
                onChange={props.handleExpertiseChange}
                required
                className="input-field w-full text-center border-4 my-1 rounded-md shadow-xl border-orange-100"
              />
            </div>
            {/* Working Place */}
            <div>
              <h6 className="text-sm font-semibold">Working Place</h6>
              <input
                type="text"
                name="working_place"
                placeholder="Working Place"
                value={props.mentorDetails.working_place}
                onChange={props.handleChange}
                required
                className="input-field w-full text-center border-4 rounded-md my-1 shadow-xl border-orange-100"
              />
            </div>
            {/* Bio */}
            <div>
              <h6 className="text-sm font-semibold">Bio</h6>
              <textarea
                name="bio"
                placeholder="Bio"
                value={props.mentorDetails.bio}
                onChange={props.handleChange}
                required
                className="input-field w-full border-4 my-1 rounded-md shadow-xl border-orange-100"
              />
            </div>
            {/* Experience */}
            <div>
              <h6 className="text-sm font-semibold">Experience</h6>
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={props.mentorDetails.experience}
                onChange={props.handleChange}
                required
                className="input-field w-full text-center border-4 rounded-md my-1 shadow-xl border-orange-100"
              />
            </div>
            {/* Projects */}
            <div>
              <h6 className="text-sm font-semibold">Projects (comma-separated)</h6>
              <input
                type="text"
                name="projects"
                placeholder="Projects"
                value={props.mentorDetails.projects.join(',')}
                onChange={props.handleProjectsChange}
                required
                className="input-field w-full text-center border-4 my-1 rounded-md shadow-xl border-orange-100"
              />
            </div>
            {/* Qualifications */}
            <div>
              <h6 className="text-sm font-semibold">Qualifications</h6>
              <input
                type="text"
                name="qualifications"
                placeholder="Qualifications"
                value={props.mentorDetails.qualifications}
                onChange={props.handleChange}
                required
                className="input-field w-full text-center border-4 rounded-md my-1 shadow-xl border-orange-100"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end">
            <button type="button" onClick={handleClose} className="px-1 py-1 bg-orange-500 text-white rounded-md shadow-md hover:bg-red-600">Cancel</button>
            <button type="submit" className="ml-1 px-1 py-1 bg-medblue text-white rounded-md shadow-md hover:bg-blue-600">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
