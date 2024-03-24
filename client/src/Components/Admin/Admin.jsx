import React, { useState, useEffect } from "react";
import Navbar from "../AllPage/Navbar";
import Footer from "../AllPage/Footer";
import "../../assets/css/admin.css";
import "../../assets/css/aboutus.css";
import AdminDashboard from "./AdminChart";

export default function Admin() {
  const [details, setDetails] = useState([]);
  const [mentorCount, setMentorCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [studentDetails,setStudentDetails] = useState([]);

  useEffect(() => {
    fetchAllTableData();
    fetchCount();
  }, [studentDetails, details]);

  const handleDelete = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteMyUser/${email}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted user from the details state
        setDetails((prevDetails) => prevDetails.filter((user) => user.email !== email));
        console.log('User deleted successfully:', email);
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const fetchAllTableData = () => {
    fetch('http://localhost:8080/admin/allDetails')
      .then((response) => response.json())
      .then((data) => {
        // console.log('Fetched all details:', data);
        setDetails(data.mentors);
        setStudentDetails(data.students);
      })
      .catch((error) => {
        console.error('Error fetching mentor and student details:', error);
      });
  };

  const fetchCount = () => {
    fetch('http://localhost:8080/admin/count')
      .then((response) => response.json())
      .then((data) => {
        // console.log('Fetched count:', data);
        setMentorCount(data.mentorCount);
        setStudentCount(data.studentCount);
      })
      .catch((error) => {
        console.error('Error fetching count:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="aboutusH1 my-5">Admin</h1>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img
              className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-lg mb-4"
              src="data:image/jpeg;base64,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"
              alt="Profile"
            />
            <h2 className="text-2xl font-bold text-orange-500">Hello, I am Fatima D Nagar</h2>
            <p className="text-lg text-gray-700 text-center mb-24">And I exist!</p>
          </div>
        </div>
      </div>

      <h1 className="aboutusH1 my-10">COUNT</h1>
      <div className="flex justify-center">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2 text-2xl text-center text-medblue">COUNT MENTOR<br />{mentorCount}</td>
              <td className="w-1/2 text-2xl text-center text-medblue">COUNT STUDENT <br /> {studentCount} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-row">
        <div className="" style={{ 'width': '50%' }}>
          <AdminDashboard type={'doughnut'} mentorCount={mentorCount} studentCount={studentCount} />
        </div>
        <div className="" style={{ 'width': '40%' }}>
          <AdminDashboard type={'pie'} studentCount={studentCount} mentorCount={mentorCount}/>
        </div>
      </div>
      <div className="my-20">
        <AdminDashboard type={'bar'} studentCount={studentCount} mentorCount={mentorCount}/>
      </div>

      <div>
  <h1 className="aboutusH1 my-10 text-center">All details</h1>
  <div className="flex justify-center items-center " >
    <table className="border-collapse border rounded-lg overflow-hidden" style={{'width':'80%'}}>
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-5 py-2">Name</th>
          <th className="border px-5 py-2">Email</th>
          <th className="border px-5 py-2">Is Mentor</th>
          <th className="border px-5 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4" className="border px-4 py-2 text-center text-lg font-bold">Mentor details</td>
        </tr>
        {details.map((item, index) => (
          <tr key={index}>
            <td className="border px-5 py-2">{item.name}</td>
            <td className="border px-5 py-2">{item.email}</td>
            <td className="border px-5 py-2">{item.isMentor ? "Yes" : "No"}</td>
            <td className="border px-5 py-2">
              <button onClick={() => handleDelete(item.email)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="4" className="border px-4 py-2 text-center text-lg font-bold">Student details</td>
        </tr>
        {studentDetails.map((item, index) => (
          <tr key={index}>
            <td className="border px-5 py-2">{item.name}</td>
            <td className="border px-5 py-2">{item.email}</td>
            <td className="border px-5 py-2">{item.isMentor ? "Yes" : "No"}</td>
            <td className="border px-5 py-2">
              <button onClick={() => handleDelete(item.email)} className="bg-orange-300 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      <Footer />
    </>
  );
}
