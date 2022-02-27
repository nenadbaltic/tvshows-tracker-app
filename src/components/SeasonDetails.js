import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";
import noImage from "../images/no-image.jpg";
import Notes from "./Notes";
import { fetchSeason } from "../api";

const SeasonDetails = () => {
  const { showid, seasonnumber } = useParams();

  const [notes, setNotes] = useState([]);
  const [season, setSeason] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getSeason = async () => {
    const { data } = await fetchSeason(showid, seasonnumber);

    const notesArr = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = notesArr.filter((note) => note.id === data.id);

    setNotes(filteredNotes);
    setIsLoading(false);
    setSeason(data);
  };

  useEffect(() => {
    getSeason();
  }, []);

  const handleMark = () => {
    const accountid = localStorage.getItem("accountid");
    const viewed = JSON.parse(localStorage.getItem("viewed")) || [];

    const isViewed = viewed.find(
      (view) => view.accountid === accountid && view.id === season.id
    );

    if (!isViewed) {
      viewed.push({ ...season, accountid, showid });
      localStorage.setItem("viewed", JSON.stringify(viewed));
    }
  };

  const addNote = (filteredNotes) => {
    setNotes(filteredNotes);
  }
  
  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <React.Fragment>
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <div className="show-details">
              <button className="mark" onClick={handleMark}>
                Mark as Viewed
              </button>
              <div className="details-left">
                <img
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
                      : noImage
                  }
                  alt="show"
                />
              </div>
              <div className="details-right">
                <h3>{season.name}</h3>
                <p>
                  Season Number: <span>{season.season_number}</span>
                </p>
                {season.overview && (
                  <React.Fragment>
                    <p className="overview">Overview</p>
                    <p>
                      <span>{season.overview}</span>
                    </p>
                  </React.Fragment>
                )}
                <div className="seasons episodes">
                  <p>Seasons</p>
                  <ul>
                    {season?.episodes?.map((episode) => {
                      return (
                        <Link
                          to={`/show/${showid}/season/${seasonnumber}/episode/${episode.episode_number}`}
                          key={episode.id}
                        >
                          <li>
                            <img
                              src={
                                episode.still_path
                                  ? `https://image.tmdb.org/t/p/w200/${episode.still_path}`
                                  : noImage
                              }
                              alt="episode"
                            />
                            <p>{episode.name}</p>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <Notes notes={notes} addingNote={addNote} id={season.id} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
};

export default SeasonDetails;
