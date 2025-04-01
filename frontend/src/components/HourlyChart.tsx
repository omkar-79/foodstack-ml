import { Bar } from 'react-chartjs-2';

export default function HourlyChart({ dish, day }) {
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: `${dish} Sales by Hour`,
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50)), // Replace with actual data
        backgroundColor: '#FF7D7D',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Bar options={options} data={data} />
    </div>
  );
}