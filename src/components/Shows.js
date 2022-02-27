import React from "react";
import Show from "./Show";

const Shows = ({ shows }) => {
  return shows.length === 0 ? (
    <p className="no-shows">There are no TV shows.</p>
  ) : (
    <ul className="tvshows-list">
      {shows.map((show) => {
        return (
          <Show
            key={show.id}
            posterPath={show.poster_path}
            name={show.name}
            id={show.id}
          />
        );
      })}
    </ul>
  );
};

export default Shows;
