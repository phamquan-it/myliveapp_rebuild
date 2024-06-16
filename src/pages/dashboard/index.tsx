"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import _ from "lodash-es";
const data:any = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: null,
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
      
    },
  ],
};
import { GetStaticPropsContext } from "next";
import { Pie } from "react-chartjs-2";
import FastInfo from "@/components/admin/FastInfo";
import { YoutubeFilled } from "@ant-design/icons";
import FastInfoList from "@/components/admin/FastInfoList";

const Page = () => {
  return (
    <>
      <div
      
      >
        <FastInfoList/>
       <div className="flex">
       
        <div className="w-2/3"><Line data={data} /></div>
        <div className="w-80">
        <Pie data={dataPie} />
        </div>
       </div>
      </div>
    </>
  );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}

const dataPie = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
