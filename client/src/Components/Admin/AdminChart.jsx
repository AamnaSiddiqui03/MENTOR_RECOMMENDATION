import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AdminDashboard = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: props.type,
      data: {
        labels: ['Mentors', 'Students'],
        datasets: [
          {
            label: 'Count',
            data: [props.mentorCount, props.studentCount], // Replace with your actual data
            backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Allow the chart to adjust size based on width and height
        width: 200, // Adjust width as needed
        height: 300, // Adjust height as needed
        scales: {
          y: {
            type: 'linear',
            ticks: {
              beginAtZero: true,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [props.mentorCount, props.studentCount]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default AdminDashboard;
