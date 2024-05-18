import React from "react";
import { useDataContext } from "../../context";
import { format } from "date-fns";
import { ChartDisplayLine } from "../charts/chart";
import { ChartDisplayBar } from "../charts/chart copy";
import { Link } from "react-router-dom";

export const DataDisplay = ({ chartTitle, isLoading }) => {
  const { data } = useDataContext();
  return (
    <div className="mt-5">
      <div className="flex gap-3 flex-col border border-gray-400">
        <div className=" py-2 px-8">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <h1 className="font-bold text-left text-3xl mb-2">NEWS</h1>
            <h1 className="font-bold text-left text-3xl mb-2">ANALYSIS</h1>
          </div>
          {/* <h1 className="font-bold text-left text-3xl mb-2">NEWS</h1> */}
          <div className="h-[75vh] overflow-scroll no-scrollbar">
            {isLoading ? (
              <>Loading news...</>
            ) : (
              <div className="flex flex-col gap-4">
                {data
                  // ?.slice(0)
                  // ?.reverse()
                  ?.filter((_, i) => i < 24 && _.title !== "undefined")
                  ?.map((news) => (
                    <div className="border-b border-gray-400 grid grid-cols-1 lg:grid-cols-2 gap-3 pb-4">
                      <Link
                        to={news.url}
                        target="_blank"
                        className="border border-Opurple text-left  rounded-lg overflow-hidden"
                      >
                        {/* <img src={news.image} alt="" className="w-32" /> */}
                        <div
                          style={{ backgroundImage: `url(${news.image})` }}
                          className="bg-cover bg-center h-24"
                        >
                          &nbsp;
                        </div>
                        <div className="p-3">
                          <p className="font-medium mb-2 hover:underline">
                            {news.title}
                          </p>
                          <p className="text-Opurple text-sm font-semibold">
                            Published at :{" "}
                            {format(
                              new Date(news.publishedAt),
                              "d/M/yyyy, h:mm:ss a"
                            )}
                          </p>
                          <span className="text-black">{news.description}</span>
                        </div>
                      </Link>
                      <div className="">
                        <ChartDisplayBar article={news} />
                        {/* <ChartDisplayLine article={news} /> */}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {data?.length === 0 && !isLoading && (
              <div className="h-full flex justify-center items-center">
                No results for the selected options
              </div>
            )}
          </div>
        </div>
        {/* <div className="py-2 px-8 hidden">
          <h1 className="font-bold text-left text-3xl mb-2">ANALYSIS</h1>
          <div className="">
            {isLoading ? (
              <>Loading charts...</>
            ) : (
              <div className="flex flex-col gap-3">
                {data
                  ?.filter((_, i) => i < 24)
                  .map((article) => (
                    <ChartDisplayBar article={article} />
                  ))}
                <ChartDisplayBar chartTitle={chartTitle} />
                <ChartDisplayLine chartTitle={chartTitle} />
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};
