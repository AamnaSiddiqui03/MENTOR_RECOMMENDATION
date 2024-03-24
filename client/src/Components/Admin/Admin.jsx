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
  }, []);

  const handleDelete = async (email) => {
    try {
      const response = await fetch(`/${email}`, {
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
    fetch('http://localhost:8080/api/auth/allDetails')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched all details:', data);
        setDetails(data.mentors);
        setStudentDetails(data.students);
      })
      .catch((error) => {
        console.error('Error fetching mentor and student details:', error);
      });
  };

  const fetchCount = () => {
    fetch('http://localhost:8080/api/auth/count')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched count:', data);
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
              src="xyzimg"
              alt="Profile"
            />
            <h2 className="text-2xl font-bold text-orange-600">Hello, I am Fatima D Nagar</h2>
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
        <h1 className="aboutusH1 my-10">All details</h1>
        <div className="flex justify-center items-center">
          <table className="border-collapse border rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Is Mentor</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <h1 className='text-center'>Mentor details</h1>
              {details.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{item.isMentor ? "Yes" : "No"}</td>
                  <td className="border px-4 py-2">

                    <button onClick={() => handleDelete(item.email)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <h1 className="text-center">Student details</h1>
              {studentDetails.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{item.isMentor ? "Yes" : "No"}</td>
                  <td className="border px-4 py-2">

                    <button onClick={() => handleDelete(item.email)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
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
