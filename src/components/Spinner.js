import React from "react";
import spinner from "../images/loading.gif";

const Spinner = () => {
  return (
    <div className="loader">
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Spinner;
