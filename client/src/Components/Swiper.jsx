import React from "react";
// import mentor from '../assets/data.json'
// import Navbar from "./Components/Navbar";s
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
    Parallax,
} from "swiper/modules";
import "../assets/css/main-page.css"; // Importing the CSS file


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";





function SwiperCard(props) {
    console.log();
    const CardDisplay= props.child;
    const heading= 'Namma Mentors';

    return (
        <>
        {props.heading && <h1 className="aboutusH1">{props.heading}</h1>}
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax]}
                spaceBetween={50}
                slidesPerView={3}
                parallax={true}
                loop={true}
                autoplay={{
                    delay: 2000, // Delay between slide transitions in milliseconds
                    disableOnInteraction: false, // Disable autoplay when user interacts with Swiper
                }}
                  navigation
                //   pagination={{ clickable: true }}
                //   scrollbar={{ draggable: true }}

                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
            >  
            
                {props.array.map((person) => {
                    return (
                        <SwiperSlide key={person.mentor_id? person.mentor_id : person.id?person.id: person.mentorId}>
                            {/* <div class="container">
                                <div class="avatar-flip">
                                    <img src={person.photo} height="150" width="150" />
                                    <img src={person.photo}s height="150" width="150" />
                                </div>
                                <h2>{person.name}</h2>
                                <h4>{person.working_place}</h4>
                                <p>{person.bio}</p>
                            </div> */}
                            <CardDisplay content={person.content} matchscore={person.matchScore} experience={person.experience} expertise={person.expertise} role={person.role} tag={person.tag} name={person.name? person.name: person.reviewer} work={person.working_place} bio={person.bio} photo={person.photo? person.photo: person.avatar} rating={person.rating} />
                        </SwiperSlide>
                    );
                })
                }

            </Swiper>
        </>
    );
}

export default SwiperCard;
