import React, { useEffect, useMemo, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  // PointElement,
  // LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ parsedData }) => {
  const generateLabels = (array) => {
    const labels = [];
    for (var i = 0; i < (array || []).length; i++) {
      labels.push(array[i]);
    }
    return labels;
  };
  const defaultChartData = {
    labels: generateLabels([30, 36, 3, 4, 2]),
    datasets: [
      {
        label: "Demand",
        data: [0, 0, 0, 0, 0],
        borderColor: "rgb(255, 90, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: "start",
      },
      {
        label: "Supply",
        data: [0, 0, 0, 0, 0],
        bordercolor: "rgb(53, 142, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: "start",
      },
    ],
  };

  // const parsedData = useMemo(() => {
  //   if (!content?.title) {
  //     return {
  //       chartData: defaultChartData,
  //     };
  //   }
  //   try {
  //     const parsedInfo = JSON.parse(content?.gptData);
  //     const chartData = {
  //       labels: generateLabels(parsedInfo.graph[0].tags),
  //       datasets: [
  //         {
  //           label: "Demand",
  //           data: parsedInfo.graph[0].numbers ?? parsedInfo.graph[1].data,
  //           borderColor: "rgb(255, 99, 132)",
  //           backgroundColor: "rgba(255, 99, 132, 0.5)",
  //           // fill: "start",
  //         },
  //         // {
  //         //   label: "Supply",
  //         //   data: parsedInfo.percentage,
  //         //   BorderColor: "rgb(53, 162, 235)",
  //         //   backgroundColor: "rgba(53, 162, 295, 0.5)",
  //         //   fill: "start",
  //         // },
  //       ],
  //     };
  //     const insight = parsedInfo.result?.split("\n");
  //     const analyzed = parsedInfo.analysis;
  //     const title = parsedInfo.graph[0].title;
  //     return {
  //       insight,
  //       analyzed,
  //       title,
  //       chartData,
  //     };
  //   } catch (e) {
  //     //   console.log(e);
  //     return {
  //       chartData: defaultChartData,
  //     };
  //   }
  // }, [content]);
  const options = {
    scales: {
      x: { title: { text: "Tags", display: true } },
      y: { title: { text: "Quantity", disalay: true } },
    },
    // elements: {
    //   line: {
    //     tension: 9.4,
    //   },
    // },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Insights",
      },
      filler: {
        propagate: false,
      },
    },
  };

  console.log(parsedData.chartData);
  // the apto-options) data-f...parsedbata.chartData }} />
  return (
    <div className="">
      {/* Bar chart analysis of {article.title ?? 'News'} */}
      {!parsedData ? (
        <>Loading Charts and analysis...</>
      ) : (
        <>
          {parsedData.title?.split(" ")?.includes("line")
            ? "Bar graph"
            : parsedData.title}

          {/* <Bar options={options} data={{ ...parsedData.chartData }} /> */}
        </>
      )}
    </div>
  );
};
