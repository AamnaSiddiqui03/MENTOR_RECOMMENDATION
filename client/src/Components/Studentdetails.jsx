import React, { useState } from "react";
import StudentProjectCards from "./StudentProjectCards";
import StudentPopdet from "./StudentPopdet";

export default function Studentdetails() {
  const [userNote, setUserNote] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  const [showPcard, setshowPcard] = useState(false);
  const [showPpop, setshowPpop] = useState(false);

  return (
    <div>
      <StudentProjectCards
        showPcard={showPcard}
        showUpdate={showUpdate}
        setShowUpdate={setShowUpdate}
        showPpop={showPpop}
        setshowPcard={setshowPcard}
        setshowPpop={setshowPpop}
        userNote={userNote}
        setUserNote={setUserNote}
      />
      {showPpop && (
        <StudentPopdet
          showPcard={showPcard}
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          showPpop={showPpop}
          setshowPcard={setshowPcard}
          setshowPpop={setshowPpop}
          userNote={userNote}
          setUserNote={setUserNote}
        />
      )}
    </div>
  );
}
