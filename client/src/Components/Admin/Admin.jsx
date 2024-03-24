import React, { useState, useEffect } from "react";
import Navbar from "../AllPage/Navbar";
import Footer from "../AllPage/Footer";
import "../../assets/css/admin.css";
import "../../assets/css/aboutus.css";
import AdminDashboard from "./AdminChart";

export default function Admin() {
  const [details, setDetails] = useState([]);
  const [count, setCount] =useState([]);

  useEffect(()=>{
    fetchAllTableData();
    fetchCount();
    
  },[count])

  const handleDelete= async(email)=>{
    const response = fetch(`/${email}`);

  }

  const fetchAllTableData =() =>{

  }

  const fetchCount=()=>{

  }

  // Sample data for testing
  const sampleData = [
    { name: "John Doe", email: "johndoe@example.com", isMentor: true },
    { name: "Jane Smith", email: "janesmith@example.com", isMentor: false },
    { name: "Alice Johnson", email: "alicejohnson@example.com", isMentor: true },
  ];

  // useEffect to simulate fetching data and updating state
  useEffect(() => {
    setDetails(sampleData);
  }, []);

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
        <td className="w-1/2 text-2xl text-center text-medblue">COUNT MENTOR<br />400</td>
        <td className="w-1/2 text-2xl text-center text-medblue">COUNT STUDENT <br /> 300 </td>
      </tr>
    </tbody>
  </table>
</div>

<div className="flex flex-row">
    
<div className="" style={{'width':'50%'}}>
    <AdminDashboard type={'doughnut'}/>
</div>
<div className="" style={{'width':'40%'}}>
<AdminDashboard type={'pie'}/>
</div>
</div>
<div className="my-20">
<AdminDashboard type={'bar'}/>

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
              {details.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{item.isMentor ? "Yes" : "No"}</td>
                  <td className="border px-4 py-2">
                    <button onClick={handleDelete(item.email)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
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
