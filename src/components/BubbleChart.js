import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

const BubbleChart = ({ selectedPoint, peakPoint }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  const rawData = {
    datasets: [
      {
        label: "Selected Point",
        data: [
          {
            x: new Date(selectedPoint.timestamp),
            y: selectedPoint.value,
            r: 15,
          },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Peak Point",
        data: [
          {
            x: new Date(peakPoint.timestamp),
            y: peakPoint.value,
            r: 15,
          },
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return <Bubble options={options} data={rawData} />;
};

export default BubbleChart;
