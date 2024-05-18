import React, { useEffect, useState } from "react";
import { db, signOutOfGoogle } from "../utils/firebase";
import { useAuthContext, useDataContext } from "../context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CiSearch } from "react-icons/ci";
import { countries, goods, languages } from "../utils/constants";
import { DataDisplay } from "../components/data-display/dataDisplay copy";
import { doc, getDoc } from "firebase/firestore";
// import { DataDisplay } from "../components/data-display/dataDisplay copy";

export const Homepage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTagg, setSearchTagg] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const { user, logoutUser, setLoggedIn } = useAuthContext();
  const { data, search, setSearch, setData } = useDataContext();
  // logoutUser()
  const logOutGoogleUser = async () => {
    try {
      const response = await signOutOfGoogle();
      // console.log(response);
      logoutUser();
      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const fetchData = (searchTag) => {
    setIsLoading(true);
    // apikey = "API_KEY";
    const url =
      `https://gnews.io/api/v4/search?q=${
        searchTag.length > 0 ? `${searchTag}` : undefined
      }&lang=${
        selectedLanguage.length > 0 ? `${selectedLanguage}` : "en"
      }&country=${
        selectedCountry.length > 0 ? `${selectedCountry}` : "us"
      }&max=40&apikey=` + "24caa0b591918de3438845394255e99b";
    // console.log(searchTerm);
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log('here');
        const articles = data.articles;
        setData(data.articles);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    // If Enter key is pressed (keyCode 13), perform the search
    if (event.key === "Enter") {
      setSearchTagg("");
      fetchData(searchTerm);
    }
  };

  useEffect(() => {
    if (!data) {
      fetchData(searchTerm);
    }
    // fetchDataAxios()
  }, []);

  useEffect(() => {
    // Retrieve search parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");

    // Set the retrieved search value in state
    if (searchParam) {
      console.log(searchParam);
      setSearchTerm(searchParam);
      setSearchTagg(searchParam);
      fetchData(searchParam);
    }
  }, []);

  useEffect(() => {
    fetchData(searchTagg ?? searchTerm);
  }, [selectedCountry, selectedLanguage]);

  return (
    <div className="pt-24 text-center w-screen text-black">
      <div>
        {/* <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a> */}
        {/* <a href="https://react.dev" target="_blank">
          <img src={logo} className="logo" alt="React logo" />
        </a> */}
      </div>
      <h1 className="text-3xl font-semibold">Hi {user.name}</h1>
      <h2>Welcome to the homepage</h2>
      <div className="flex flex-col lg:flex-row lg:justify-center gap-8 px-4 lg:px-8 ">
        <div className="w-1/5 hidden lg:block">
          <div className="border border-gray-400 flex flex-col items-center rounded">
            {goods.map((good, i) => (
              <div
                className={`p-2 border-b border-gray-400 w-full cursor-pointer hover:text-white hover:bg-Opurple ${
                  searchTagg === good ? "text-white bg-Opurple" : ""
                }`}
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.set("search", good);
                  // window.open(url.toString(), "_blank");
                  setIsLoading(true)
                  setSearchTerm("");
                  setSearchTagg(good);
                  fetchData(good);
                }}
              >
                {good}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <div className="border border-[#DADCE0] h-[45px] rounded-lg flex items-center overflow-hidden">
            <div className="w-[10%] text-[#A8A8A8] flex items-center justify-center h-full">
              <CiSearch fontSize={25} />
            </div>
            <input
              type="text"
              placeholder="Search for news topic"
              className="h-full w-[80%] md:w-full outline-none placeholder:text-xs bg-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              value={searchTerm}
            />
            <button
              onClick={() => {
                setSearchTagg("");
                fetchData(searchTerm);
              }}
              className="text-white bg-Opurple"
            >
              Search
            </button>
          </div>
          <DataDisplay
            chartTitle={searchTagg ?? searchTerm}
            isLoading={isLoading}
          />
        </div>
        <div className="w-full justify-between items-center lg:w-1/5 -order-1 lg:order-1 flex lg:block mt-8 lg:mt-0">
          <div className="flex flex-col">
            <label htmlFor="languageSelect" className="text-left mb-1">
              Select a Language:
            </label>
            <select
              id="languageSelect"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
            >
              <option value="">Select Language</option>
              {languages.map((language, index) => (
                <option key={index} value={language.value}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col lg:mt-5">
            <label htmlFor="countrySelect" className="text-left mb-1">
              Select your preferred country:
            </label>
            <select
              id="countrySelect"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="h-13 md:h-14 flex w-full text-dark rounded-md border border-gray1 focus:border-2 focus:border-Opurple/30 bg-gray-300/40 py-1 px-3 text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.value}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={logOutGoogleUser}
        className="text-white bg-Opurple hidden"
      >
        Sign Out
      </button>
    </div>
  );
};
