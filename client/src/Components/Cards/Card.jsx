import React from 'react';

export default function Card({ title, description }) {
  return (
    <div className="bg-discord text-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-lg">{description}</p>
    </div>
  );
}
