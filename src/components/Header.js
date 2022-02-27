import React from "react";
import { NavLink, Link } from "react-router-dom";
import { deleteSession } from "../api";

const Header = () => {
  const logout = async () => {
    const session_id = localStorage.getItem("sessionid");
    await deleteSession({ data: { session_id } });
    localStorage.removeItem("sessionid");
    localStorage.removeItem("accountid");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div className="header">
      <div className="wrapper">
        <Link to="/">TV shows I've watched</Link>
        <ul className="nav">
          <li>
            <NavLink to="/favorites" activeClassName="is-active">
              Favorites
            </NavLink>
            <NavLink to="/viewed" activeClassName="is-active">
              Viewed
            </NavLink>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
