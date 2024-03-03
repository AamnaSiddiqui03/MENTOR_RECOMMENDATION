import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import StudentPopdet from "./StudentPopdet";

export default function StudentProjectCards(props) {
  // const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userid");

    fetch(`http://localhost:8080/api/user/fetchusernote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: userId, // Set the userid in the request headers
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        props.setUserNote(data.user);
        if (data.user > 1) {
          props.setShowUpdate(true);
        } else {
          props.setShowUpdate(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user note:", error);
      });
  });

  const handleondelete = () => {
    fetch("http://localhost:8080/api/user/deleteusernote", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: localStorage.getItem("userid") }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("deleted successfully");
        } else {
          console.log("err; unable to delete");
        }
      })
      .catch((err) => {
        console.error("Internal error", err);
      });
      // props.setshowPcard(!props.showPcard);
  };

  return (
    <>
      <>
        <div className="aboutusH1"> Project Details</div>
        <div className="flex gap-2">
          {props.userNote ? (
            <div className="mx-8 my-7 flex justify-center flex-col items-center border-2 border-medblue p-4 relative w-60 h-52 hover:cursor-pointer bg-stone-50">
              <div className="flex flex-row absolute top-0 right-0 m-2 z-10">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-500 mr-1 hover:scale-105 cursor-pointer z-0"
                  size="xs"
                  onClick={handleondelete} // Corrected onClick handler
                />
                <FontAwesomeIcon
                  icon={faPen}
                  className="text-orange-500 hover:scale-105 cursor-pointerz-0 "
                  size="xs"
                  onClick={() => props.setshowPpop(true)}
                />
              </div>
              <h1 className="text-center my-2 mx-5 font-semibold text-lg italic text-medblue bg-orange-200 rounded">
                Name: {props.userNote.name}
              </h1>
              <h1 className="text-center my-2 font-normal text-m text-black">
                <span className="italic">Institution:</span>
                {props.userNote.educationalInstitute}
              </h1>
              <h1 className="text-center my-2 font-semibold text-s italic text-discord">
                Interests: {props.userNote.interests}
              </h1>
              <h1 className="text-center my-2 font-normal text-base text-orange-300">
                Project: {props.userNote.WorkingOn}
              </h1>
            </div>
          ) : (
            <button
              onClick={() => props.setshowPpop(true)}
              className="mx-8 my-7 flex justify-center flex-col items-center border-dotted border-2 hover:scale-105 border-blue-500 p-4 relative w-60 h-52 hover:cursor-pointer"
            >
              <h1 className="text-center my-2 "> ADD PROJECT</h1>
              <h1 className="font-bold text-2xl  ">+</h1>
            </button>
          )}
        </div>
      </>
    </>
  );
}
