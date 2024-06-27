import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Chartify = ({
  data,
  timeframe,
  onDataPointClick,
  showTooltip = true,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${
          timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
        }Ly Chart Data`,
      },
      tooltip: {
        enabled: showTooltip,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: timeframe,
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "sales (in millions $)",
        },
      },
    },
    onClick: onDataPointClick
      ? (event, elements) => {
          if (elements.length > 0) {
            const dataIndex = elements[0].index;
            onDataPointClick(data[dataIndex]);
          }
        }
      : undefined,
  };

  const rawData = {
    datasets: [
      {
        label: "Value",
        data: data.map((item) => ({
          x: new Date(item.timestamp),
          y: item.value,
        })),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={rawData} />;
};

export default Chartify;
