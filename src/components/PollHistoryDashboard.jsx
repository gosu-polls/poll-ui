import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

//dummy data for testing
const data = {
  labels: ["Eng VS NZ", "Ned vs Pak", "Afg Vs Ban", "SA vs SL", "Ind vs Aus", "Ned vs NZ"],
  datasets: [
    {
      label: "Total polling happen match level",
      backgroundColor: "rgb(255, 0, 0)",
      borderColor: "rgb(0, 124, 132)",
      data: [4, 3, 5, 3, 8, 6],
    },
  ],
};

const PollHistoryDashboard = () => {
  return (
    <div>
      <Line data={data} widht={300} height={180} />
    </div>
  );
};

export default PollHistoryDashboard;