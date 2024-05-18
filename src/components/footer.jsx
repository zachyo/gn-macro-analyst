import React from "react";

export const Footer = () => {
  return (
    <div className="bg-black text-white mt-8">
      <div className="px-8 py-4">
        <div className="flex justify-between items-end">
          <div className="text-left">
            <p>Made by GoodNews App LLC</p>
            <p> Chapel Hill USA</p>
          </div>
          <div className="text-right">
            {" "}
            <p>Subscribed users need to repurchase plan once it expires</p>
            <p>Want to cancel contract or have any inquiry?</p>
            <p>
              Contact us at:
              <a href="mailto:contact@getgoodnewsapp.com">
                {" "}
                contact@getgoodnewsapp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
