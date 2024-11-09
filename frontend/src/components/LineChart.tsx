import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

interface DataItem {
  year: number;
  value: number;
}

interface LineChartProps {
  data: DataItem[];
}

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const LineChart: FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: 'Population',
        data: data.map((item) => item.value),
        borderColor: '#d9d9d9',
        backgroundColor: '#d9d9d9',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFF',
          callback: (tickValue: string | number, index: number) => {
            return index % 10 === 0 || index === data.length - 1 ? data[index].year : ''; // Exibe o rótulo de ano se for múltiplo de 10
          },
        },
        rotation: 0,
        title: {
          display: true,
          text: 'Year',
          color: '#FFF',
        },
      },
      y: {
        ticks: {
          color: '#FFF',
        },
        title: {
          display: true,
          text: 'Population',
          color: '#FFF',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '50vh', maxWidth: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
