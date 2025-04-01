import { Line } from 'react-chartjs-2';

export default function WeeklyChart({ dishName }) {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: `${dishName} Sales Prediction`,
        data: [65, 59, 80, 81, 56, 95, 40], // Replace with actual prediction data
        borderColor: '#211C84',
        backgroundColor: 'rgba(122, 115, 209, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line options={options} data={data} height={80} />;
}