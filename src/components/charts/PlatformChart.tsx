import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PieConfig } from "@ant-design/charts";
const Pie = dynamic(() => import("@ant-design/charts").then(({ Pie }) => Pie), {
  ssr: false,
});

const PlatformChart = () => {
  const config: PieConfig = {
    data: [
      { type: "Facebook", value: 27 },
      { type: "LinkedIn", value: 25 },
      { type: "Shoppee", value: 18 },
      { type: "Instagram", value: 15 },
      { type: "Twitch", value: 10 },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    width: 300,  // Optional: set width if needed
    legend: {
      color: {
        title: false,
        position: "top",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};
export default PlatformChart;
