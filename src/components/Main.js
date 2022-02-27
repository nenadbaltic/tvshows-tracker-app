import React, { useState, useEffect } from "react";

import Shows from "./Shows";
import Spinner from "./Spinner";
import Search from "./Search";
import { fetchShows, fetchShowsBySearch } from "../api/index";

const Main = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getShows = async () => {
    setIsLoading(true);
    const { data } = await fetchShows();

    setIsLoading(false);
    setShows(data.results);
  };

  const handleSearch = async (inputValue) => {
    setIsLoading(true);

    let response;
    if (inputValue.trim() === "") {
      response = await fetchShows();
    } else {
      response = await fetchShowsBySearch(inputValue);
    }

    setIsLoading(false);
    setShows(response.data.results);
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <div className="main">
      <Search onSearch={handleSearch} />
      {isLoading ? <Spinner /> : <Shows shows={shows} />}
    </div>
  );
};

export default Main;
