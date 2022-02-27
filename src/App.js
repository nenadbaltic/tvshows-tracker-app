import React, { useContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import Favorites from "./components/Favorites";
import ShowDetails from "./components/ShowDetails";
import SeasonDetails from "./components/SeasonDetails";
import Viewed from "./components/Viewed";
import EpisodeDetails from "./components/EpisodeDetails";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Header />}
        <div className="wrapper">
          <Switch>
            <PublicRoute path="/login" exact component={Login} />
            <PrivateRoute path="/" exact component={Main} />
            <PrivateRoute path="/favorites" component={Favorites} />
            <PrivateRoute path="/viewed" component={Viewed} />
            <PrivateRoute path="/show/:showid" exact component={ShowDetails} />
            <PrivateRoute
              path="/show/:showid/season/:seasonnumber"
              exact
              component={SeasonDetails}
            />
            <PrivateRoute
              path="/show/:showid/season/:seasonnumber/episode/:episodenumber"
              component={EpisodeDetails}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
