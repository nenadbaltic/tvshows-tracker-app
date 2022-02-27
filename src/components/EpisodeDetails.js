import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import noImage from "../images/no-image.jpg";
import Notes from "./Notes";
import { fetchEpisode } from "../api";

const EpisodeDetails = () => {
  const { showid, seasonnumber, episodenumber } = useParams();

  const [notes, setNotes] = useState([]);
  const [episode, setEpisode] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getEpisode = async () => {
    const { data } = await fetchEpisode(showid, seasonnumber, episodenumber);
    const notesArr = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = notesArr.filter((note) => note.id === data.id);

    setNotes(filteredNotes);
    setIsLoading(false);
    setEpisode(data);
  };

  useEffect(() => {
    getEpisode();
  }, []);

  const handleMark = () => {
    const accountid = localStorage.getItem("accountid");
    const viewed = JSON.parse(localStorage.getItem("viewed")) || [];

    const isViewed = viewed.find(
      (view) => view.accountid === accountid && view.id === episode.id
    );

    if (!isViewed) {
      viewed.push({ ...episode, accountid, showid, seasonnumber });
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
                    episode.still_path
                      ? `https://image.tmdb.org/t/p/w500/${episode.still_path}`
                      : noImage
                  }
                  alt="show"
                />
              </div>
              <div className="details-right">
                <h3>{episode.name}</h3>
                <p>
                  Season Number: <span>{episode.season_number}</span>
                </p>
                <p>
                  Ratings: <span>{episode.vote_average}</span>
                </p>
                {episode.overview && (
                  <React.Fragment>
                    <p className="overview">Overview</p>
                    <p>
                      <span>{episode.overview}</span>
                    </p>
                  </React.Fragment>
                )}
              </div>
            </div>
            <Notes notes={notes} addingNote={addNote} id={episode.id} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
};

export default EpisodeDetails;
