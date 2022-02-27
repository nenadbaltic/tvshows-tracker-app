import React from 'react';

import Views from "./Views";

const Viewed = () => {
    const accountid = localStorage.getItem("accountid");
    const viewed = JSON.parse(localStorage.getItem("viewed")) || [];
    const userViewed = viewed.filter((view) => view.accountid === accountid);

    return (
      <div className="main">
        <Views views={userViewed} />
      </div>
    );
}

export default Viewed