import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import Chartify from "./components/Chartify";
import BubbleChart from "./components/BubbleChart";
import Modal from "./components/Modal";
import rawData from "./rawData.json";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState("day");
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setData(rawData);
  }, []);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    setSelectedDataPoint(null);
    setIsModalOpen(false);
  };

  const handleDataPointClick = (dataPoint) => {
    setSelectedDataPoint(dataPoint);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const findPeakPoint = () =>
    data.reduce(
      (max, point) => (point.value > max.value ? point : max),
      data[0]
    );

  const exportChart = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `${timeframe}_chart.png`;
        link.click();
      });
    }
  };

  const buttonStyle = (buttonTimeframe) => ({
    backgroundColor: timeframe === buttonTimeframe ? "#4CAF50" : "#f0f0f0",
    color: timeframe === buttonTimeframe ? "white" : "#333",
    border: "none",
    padding: "10px 20px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow:
      timeframe === buttonTimeframe ? "0 2px 5px rgba(0,0,0,0.2)" : "none",
  });

  return (
    <div className="buttu">
      <div className="App mobile-container">
        <h1 className="app-title">Chartify</h1>
        <p className="app-subtitle">Transforming numbers into visual stories</p>
        <div className="controls-container">
          <div className="controls">
            <button
              type="button"
              onClick={() => handleTimeframeChange("day")}
              style={buttonStyle("day")}
            >
              Daily
            </button>
            <button
              type="button"
              onClick={() => handleTimeframeChange("week")}
              style={buttonStyle("week")}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => handleTimeframeChange("month")}
              style={buttonStyle("month")}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => handleTimeframeChange("year")}
              style={buttonStyle("year")}
            >
              Yearly
            </button>
          </div>
          <button type="button" onClick={exportChart} className="export-button">
            Export
          </button>
        </div>

        <div ref={chartRef} className="chart-container">
          <Chartify
            data={data}
            timeframe={timeframe}
            onDataPointClick={handleDataPointClick}
          />
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedDataPoint && (
            <div className="data-point-info">
              <h3>Data Point Comparison</h3>
              <div className="bubble-chart-container">
                <BubbleChart
                  selectedPoint={selectedDataPoint}
                  peakPoint={findPeakPoint()}
                />
              </div>
              <div>
                <h4>Selected Point:</h4>
                <p>
                  Timestamp:{" "}
                  {new Date(selectedDataPoint.timestamp).toLocaleString()}
                </p>
                <p>
                  Value:{" "}
                  <span
                    style={{
                      color: "#11F5F6FF",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {selectedDataPoint.value}
                  </span>{" "}
                </p>
                <h4>Peak Point:</h4>
                <p>
                  Timestamp:{" "}
                  {new Date(findPeakPoint().timestamp).toLocaleString()}
                </p>
                <p>
                  Value:{" "}
                  <span
                    style={{
                      color: "#F611F280",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {findPeakPoint().value}
                  </span>
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default App;
