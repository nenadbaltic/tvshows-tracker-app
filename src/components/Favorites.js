import React, { useState, useEffect } from "react";

import Shows from "./Shows";
import Spinner from "./Spinner";
import { fetchFavoriteShows } from "./../api/index";

const Favorites = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getShows = async () => {
    const accountid = localStorage.getItem("accountid");
    const sessionid = localStorage.getItem("sessionid");
    const { data } = await fetchFavoriteShows(accountid, sessionid);

    setIsLoading(false);
    setShows(data.results);
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <div className="main">
      {isLoading ? <Spinner /> : <Shows shows={shows} />}
    </div>
  );
};

export default Favorites;
