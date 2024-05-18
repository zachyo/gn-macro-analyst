import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import "./pricing.css";

export const Pricing = ({ setShowCheckout, setCheckoutDetails }) => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Smooth scrolling animation
    });
  };
  return (
    <div className="text-left px-8 mb-12 lg:mb-0">
      <h1 className="text-2xl font-bold">Select plan</h1>
      <p>Simple and flexible pre-userpricing</p>
      <div className="mt-7">
        <h2 className="font-semibold">Benefits</h2>
        <div className="border-b border-gray-300 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between mt-2 ">
            <div className="flex gap-1 items-center">
              <IoIosCheckmark fontSize={30} />
              Expert Guidance
            </div>
            <div className="flex gap-1 items-center">
              <IoIosCheckmark fontSize={30} />
              Informed Decision-Making
            </div>
            <div className="flex gap-1 items-center">
              {" "}
              <IoIosCheckmark fontSize={30} />
              Better Efficiency
            </div>
            <div className="flex gap-1 items-center">
              <IoIosCheckmark fontSize={30} />
              Risk Mitigation
            </div>
            <div className="flex gap-1 items-center">
              <IoIosCheckmark fontSize={30} />
              Continuous Learning
            </div>
            <div className="flex gap-1 items-center">
              <IoIosCheckmark fontSize={30} />
              Tailored Solutions
            </div>
          </div>
          <p className="flex items-center gap-1">
            <IoIosCheckmark fontSize={30} />
            Money back guarantee,
            <br className="lg:hidden" /> and can opt out from annual contract
          </p>
        </div>
      </div>
      <div className="plans mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className=" plan rounded-lg border border-gray-300 p-3 cursor-pointer hover:border-2 hover:border-Opurple">
          <p className="mb-10 font-semibold text-xl">Standard</p>
          <p>
            <span className="text-3xl font-semibold tracking-wide">$9.99</span>
            /month
          </p>
          <button
            className="w-full mt-2 bg-[#E5E5E5]"
            onClick={() => {
              setCheckoutDetails((prev) => ({ ...prev, amount: 9.99 }));
              setShowCheckout(true);
            }}
          >
            Select plan
          </button>
        </div>
        <div className="plan rounded-lg border border-gray-300 p-3 cursor-pointer hover:border-2 hover:border-Opurple">
          <p className="mb-10 font-semibold text-xl">Pro</p>
          <p>
            <span className="text-3xl font-semibold tracking-wide">$69.99</span>
            /yearly
          </p>
          <button
            className="w-full mt-2 bg-[#E5E5E5]"
            onClick={() => {
              setCheckoutDetails((prev) => ({ ...prev, amount: 69.99 }));
              setShowCheckout(true);
            }}
          >
            Select plan
          </button>
        </div>
      </div>
    </div>
  );
};

//4105 4000 1391 5424 03/25
