// MentorsRecommended.jsx

import React, { useState, useEffect } from 'react';
import SwiperCard from './Swiper';
import '../assets/css/main-page.css';
import CardHomeDisplay from './CardHomeDisplay';

export default function MentorsRecommended(props) {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/recommend//${props.id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMentors(data);
        } else {
          console.error("Failed to fetch mentors:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }); // Fetch mentors when props.id changes

  return (
    <div>
      <SwiperCard child={CardHomeDisplay} heading={'Recommended Mentors'} array={mentors}/>
    </div>
  );
}
