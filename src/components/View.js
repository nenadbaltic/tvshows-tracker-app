import React from "react";
import { useHistory } from "react-router-dom";

import noImage from "../images/no-image.jpg";

const View = ({
  id,
  posterPath,
  stillPath,
  name,
  showid,
  seasonnumber,
  episodenumber,
}) => {
  const history = useHistory();

  let redirect;
  if (episodenumber) {
    redirect = `/show/${showid}/season/${seasonnumber}/episode/${episodenumber}`;
  } else if (seasonnumber) {
    redirect = `/show/${showid}/season/${seasonnumber}`;
  } else {
    redirect = `/show/${id}`;
  }

  return (
    <li onClick={() => history.push(redirect)}>
      {stillPath ? (
        <img
          src={
            stillPath
              ? `https://image.tmdb.org/t/p/w300/${stillPath}`
              : noImage
          }
          alt="show"
        />
      ) : (
        <img
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w300/${posterPath}`
              : noImage
          }
          alt="show"
        />
      )}
      <div className="text">
        <h3>{name}</h3>
      </div>
    </li>
  );
};

export default View;
