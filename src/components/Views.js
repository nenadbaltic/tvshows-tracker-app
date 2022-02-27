import React from "react";
import View from "./View";

const Views = ({ views }) => {
  return views.length === 0 ? (
    <p className="no-shows">You haven't added any TV shows to your viewed list.</p>
  ) : (
    <ul className="tvshows-list">
      {views.map((view) => {
        return (
          <View
            key={view.id}
            posterPath={view.poster_path}
            stillPath={view.still_path}
            name={view.name}
            seasonnumber={view.season_number}
            episodenumber={view.episode_number}
            id={view.id}
            showid={view.showid}
          />
        );
      })}
    </ul>
  );
};

export default Views;
