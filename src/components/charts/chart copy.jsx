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
  Filler,
} from "chart.js";
import { fetchChartData } from "../../utils/openai-test";
import { goods } from "../../utils/constants";
import { BarChart } from "./chart-bar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const ChartDisplayBar = ({ article }) => {
  const [chartData, setChartData] = useState(null);
  const content = { title: article.title ?? "News", gptData: chartData };
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

  const parsedData = useMemo(() => {
    if (!chartData) {
      // console.log("heress");

      return {
        chartData: defaultChartData,
        chartDataLine: defaultChartData,
      };
    }
    try {
      const parsedInfo = JSON.parse(content?.gptData);
      // console.log(parsedInfo);
      const chartData = {
        labels: generateLabels(
          parsedInfo.graph?.[0].tags ?? parsedInfo.graphs?.[0].tags
        ),
        datasets: [
          {
            label: "Demand",
            data: parsedInfo.graphs?.[0].data ?? parsedInfo.graph?.[0].data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            // fill: "start",
          },
          // {
          //   label: "Supply",
          //   data: parsedInfo.percentage,
          //   BorderColor: "rgb(53, 162, 235)",
          //   backgroundColor: "rgba(53, 162, 295, 0.5)",
          //   fill: "start",
          // },
        ],
      };
      const chartDataLine = {
        labels: generateLabels(
          parsedInfo.graph?.[1].tags ?? parsedInfo.graphs?.[1].tags
        ),
        datasets: [
          {
            label: "Demand",
            data: parsedInfo.graphs?.[1].data ?? parsedInfo.graph?.[1].data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            // fill: "start",
          },
          // {
          //   label: "Supply",
          //   data: parsedInfo.percentage,
          //   BorderColor: "rgb(53, 162, 235)",
          //   backgroundColor: "rgba(53, 162, 295, 0.5)",
          //   fill: "start",
          // },
        ],
      };
      const insight = parsedInfo.result?.split("\n");
      const analyzed = parsedInfo.analysis;
      const title = parsedInfo.graph[0].title ?? parsedInfo.graphs[0].title;
      const titleLine = parsedInfo.graph[1].title ?? parsedInfo.graphs[1].title;
      return {
        insight,
        analyzed,
        title,
        chartData,
        chartDataLine,
        titleLine,
      };
    } catch (e) {
      console.log(e)
      return {
        chartData: defaultChartData,
        chartDataLine: defaultChartData,
      };
    }
  }, [content]);

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
        propagate: true,
      },
    },
  };
  // console.log(parsedData?.chartDataLine);

  useEffect(() => {
    setChartData(null);
    const fetchData = async () => {
      try {
        const data = await fetchChartData(article); // Call the fetchChartData function
        setChartData(data.aiResponse); // Set the chart data in state
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [article]); // Call fetchData only once when the component mounts


  return (
    <div className="">
      {/* Bar chart analysis of {article.title ?? 'News'} */}
      {!chartData ? (
        <>Loading Charts and analysis...</>
      ) : (
        <>
          {parsedData.titleLine?.split(" ")?.includes("bar" || "pie")
            ? "Line graph"
            : parsedData.titleLine}

          <Line options={options} data={{ ...parsedData.chartDataLine }} />

          {/* {parsedData.title?.split(" ")?.includes("line")
            ? "Bar graph"
            : parsedData.title} */}
          {/* <BarChart parsedData={parsedData} /> */}

          <Bar options={options} data={{ ...parsedData.chartData }} />
          <p className="text-left text-sm">{parsedData.analyzed}</p>
        </>
      )}
    </div>
  );
};
