import React, { useContext , useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import StudentContext from "../../Context/student/studentContext";
import MentorsRecommended from "./MentorsRecommended";

export default function StudentProjectCards(props) {
  const context = useContext(StudentContext);
  const { notes, deleteDetails } = context;
  const [mentorid, setMentorId] = useState(null);

  const handleRecommendMentor =(noteid)=>{
    setMentorId(noteid);
  }

  return (
    <>
      <div className="aboutusH1 text-center text-3xl font-bold my-8 text-black">
        Project Details
      </div>
      <div className="grid grid-cols-4 gap-8 m-10">
        {notes.map((note) => (
          <div key={note._id} className="relative border border-medblue rounded-lg shadow-md">
            <div className="absolute top-0 right-0 m-2 z-10 flex">
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 mr-3 hover:scale-105 cursor-pointer my-3"
                size="xs"
                onClick={() => deleteDetails(note._id)}
              />
              <FontAwesomeIcon
                icon={faPen}
                className="text-orange-500 mr-8 hover:scale-105 cursor-pointer my-3"
                size="xs"
                onClick={() => {
                  props.setNotesid(note._id);
                  props.setshowPpop(true);
                  props.setShowUpdate(true);
                }}
              />
            </div>
            <div className="p-4">
              <h1 className="text-center font-semibold text-lg italic bg-blue-200 text-medblue rounded-md mb-2">
                Name: {note.name}
              </h1>
              <h1 className="text-center font-normal text-m text-black mb-2">
                <span className="italic">Institution:</span> {note.educationalInstitute}
              </h1>
              <h1 className="text-center font-semibold text-s italic text-discord mb-2">
                Interests: {note.interests}
              </h1>
              <h1 className="text-center font-normal text-base text-orange-300">
                Project: {note.WorkingOn}
              </h1>
              <button
                onClick={() => handleRecommendMentor(note._id)}
                className="bg-orange-500 text-white font-bold px-4 py-2 rounded-md mt-4 hover:bg-orange-600"
              >
                Recommend Mentor
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            props.setshowPpop(true);
            props.setShowUpdate(false);
          }}
          className="flex justify-center items-center border-dotted border-2 border-blue-500 p-4 w-full h-full hover:scale-105 hover:cursor-pointer"
        >
          <div className="text-center">
            <h1 className="my-2 "> ADD PROJECT</h1>
            <h1 className="font-bold text-2xl">+</h1>
          </div>
        </button>
      </div>
      {/* Render MentorRecommended component */}
      {mentorid && <MentorsRecommended id={mentorid} />}
      
    </>
  );
}