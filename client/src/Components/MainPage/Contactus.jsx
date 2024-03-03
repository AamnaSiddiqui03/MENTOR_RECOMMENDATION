import React from 'react';
import '../../assets/css/contactus.css';
import Mapbox from './Mapbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight , faPhone, faLocationDot} from '@fortawesome/free-solid-svg-icons'; // Import the specific icon



export default function Contactus() {
  return (
    <>
      <section className="contactcu my-16">
        <h1 className="aboutusH1">Contact Us</h1>

        <div className='flex justify-center my-4 px-11 py-4 border shadow-lg border-yellow-100 rounded-xl m-11 box-sha'>
          <div className='flex flex-col items-center'>
            <input type="text" className='px-11 py-1 text-center my-5 mx-10 bg-white border shadow-md border-green-500 focus:border-b-blue-500 rounded-md ' placeholder='Enter your name' />
            <input type="text" className='px-11 py-1 text-center my-5 mx-10 bg-white border shadow-md border-green-500 focus:border-b-blue-500 rounded-md ' placeholder='Enter your name' />
            <input type="text" className='px-11 py-1 text-center my-5 mx-10 bg-white border shadow-md border-green-500 focus:border-b-blue-500 rounded-md ' placeholder='Enter your name' />

            <button className='bg-gray-300 hover:bg-medblue hover:scale-105 text-white font-bold py-2 px-4S rounded shadow w-32 flex items-center justify-center'>Send Gmail <FontAwesomeIcon icon={faArrowRight} className='mx-1'/></button>
            <h2 className='px-2 my-4'><FontAwesomeIcon icon={faPhone} style={{ color: 'green', margin:'3px' }} /> +919880150158</h2>
            <h2 className='px-2 my-3'><FontAwesomeIcon icon={faLocationDot}  style={{ color: 'blue' , margin:'3px'}}/>Bengaluru, Karnataka</h2>
          </div>
          <div >
            <Mapbox />
          </div>
        </div>
        <div>

        </div>

      </section>
    </>
  );
}
