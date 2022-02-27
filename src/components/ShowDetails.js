import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Spinner from "./Spinner";
import noImage from "../images/no-image.jpg";
import Notes from "./Notes";
import { fetchShow } from "../api";

const ShowDetails = () => {
  const { showid } = useParams();

  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getShow = async () => {
    const { data } = await fetchShow(showid);

    const notesArr = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = notesArr.filter((note) => note.id === data.id);

    setNotes(filteredNotes);
    setIsLoading(false);
    setShow(data);
  };

  useEffect(() => {
    getShow();
  }, []);

  const handleMark = () => {
    const accountid = localStorage.getItem("accountid");
    const viewed = JSON.parse(localStorage.getItem("viewed")) || [];

    const isViewed = viewed.find(
      (view) => view.accountid === accountid && view.id === show.id
    );

    if (!isViewed) {
      viewed.push({ ...show, accountid });
      localStorage.setItem("viewed", JSON.stringify(viewed));
    }
  };

  const addNote = (filteredNotes) => {
    setNotes(filteredNotes);
  };

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
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
                      : noImage
                  }
                  alt="show"
                />
              </div>
              <div className="details-right">
                <h3>{show.name}</h3>
                <p>
                  Ratings: <span>{show.vote_average}</span>
                </p>
                <p>
                  Genres:{" "}
                  <span>
                    {show?.genres?.map((genre) => genre.name).join(", ")}
                  </span>
                </p>
                <p className="overview">Overview</p>
                <p>
                  <span>{show.overview}</span>
                </p>
                <div className="seasons">
                  <p>Seasons</p>
                  <ul>
                    {show?.seasons?.map((season) => {
                      return (
                        <Link
                          to={`/show/${showid}/season/${season.season_number}`}
                          key={season.id}
                        >
                          <li>
                            <img
                              src={
                                season.poster_path
                                  ? `https://image.tmdb.org/t/p/w200/${season.poster_path}`
                                  : noImage
                              }
                              alt="season"
                            />
                            <p>{season.name}</p>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <Notes notes={notes} addingNote={addNote} id={show.id} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
};

export default ShowDetails;
