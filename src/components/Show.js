import React from "react";
import { useHistory } from "react-router-dom";

import noImage from "../images/no-image.jpg";

const Show = ({ id, posterPath, name }) => {
  const history = useHistory();

  return (
    <li onClick={() => history.push(`/show/${id}`)}>
      <img
        src={
          posterPath ? `https://image.tmdb.org/t/p/w300/${posterPath}` : noImage
        }
        alt="show"
      />
      <div className="text">
        <h3>{name}</h3>
      </div>
    </li>
  );
};

export default Show;
