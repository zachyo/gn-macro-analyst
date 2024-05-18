import React, { useEffect, useMemo, useState } from "react";
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
} from "chart.js";
import { fetchChartData } from "../../utils/openai-test";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ChartDisplayLine = ({article}) => {
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
        data: [0,0,0,0,0],
        borderColor: "rgb(255, 90, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: "start",
      },
      {
        label: "Supply",
        data: [0,0,0,0,0],
        bordercolor: "rgb(53, 142, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: "start",
      },
    ],
  };

  const parsedData = useMemo(() => {
    if (!content?.title) {
      return {
        chartData: defaultChartData,
      };
    }
    try {
      const parsedInfo = JSON.parse(content?.gptData);
      const chartData = {
        labels: generateLabels(parsedInfo.tags),
        datasets: [
          {
            label: "Demand",
            data: parsedInfo.newspaper,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            fill: "start",
          },
          {
            label: "Supply",
            data: parsedInfo.percentage,
            BorderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 295, 0.5)",
            fill: "start",
          },
        ],
      };
      const insight = parsedInfo.result?.split("\n");
      const analyzed = parsedInfo.analysis;
      return {
        insight,
        analyzed,
        chartData,
      };
    } catch (e) {
      //   console.log(e);
      return {
        chartData: defaultChartData,
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
        display : false
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
  //   console.log(content)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChartData(article); // Call the fetchChartData function
        setChartData(data.aiResponse); // Set the chart data in state
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [article]); 
  // Call fetchData only once when the component mounts

  return (
    <div className="mt-3">
      Line chart analysis of {article.title ?? "News"}
      <Line options={options} data={{ ...parsedData.chartData }} />
      {/* <p className="text-left">{parsedData.analyzed}</p> */}
    </div>
  );
};
