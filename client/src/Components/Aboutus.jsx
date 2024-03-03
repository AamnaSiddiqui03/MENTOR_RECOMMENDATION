import React from "react";
import "../assets/css/aboutus.css";

export default function ServiceList() {
  const services = [
    { bgColor: "#1abc9c", title: "Skill Enhancement", description: "Helping mentees enhance their skills and knowledge in various domains to prepare them for career growth." },
    { bgColor: "#3498db", title: "Career Guidance", description: "Providing mentees with valuable career guidance, advice, and strategies to help them navigate their professional journey." },
    { bgColor: "#9b59b6", title: "Networking", description: "Facilitating networking opportunities for mentees to connect with industry professionals, peers, and potential collaborators." }
  ];

  return (
    <>
      <h1 className="aboutusH1">ABOUT US</h1>
      <div className="section">
        {services.map((service, index) => (
          <div
            className="item"
            key={index}
            style={{ borderColor: service.bgColor }}
          >
            <div className="icon" style={{ backgroundColor: service.bgColor }}>
              <svg
                className="vector"
                viewBox="0 0 512 512"
                width="100"
                fill="#fff"
              >
                <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" />
              </svg>
            </div>
            <h3 className="title">{service.title}</h3>
            <p className="text">{service.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
