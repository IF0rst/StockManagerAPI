import { colors } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300  ],
  ["2017", 1030, 540, 350],
];

// Material chart options
const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales and Expenses and Profit: 2014-2017",
    },
    colors: ["rgba(53, 138, 148)", "rgb(37, 11,165)", "#188310"],
};

function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width={"100%"}
      height={"350px"}
      data={data}
      options={options}
    />
  );
}

export default BarChart;