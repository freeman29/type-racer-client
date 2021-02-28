import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RaceMenu from "./components/RaceMenu";
import { socket } from "./config/socket-io";
import "./styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateRace from "./components/CreateRace";

const history = createBrowserHistory();

export interface Racer {
  currentWordIndex: number;
  isPartyLeader: boolean;
  name: string;
  socketId: string;
  wpm: number;
  _id: string;
}

export interface Race {
  _id: string;
  words: string[];
  isOpen: boolean;
  isOver: boolean;
  racers: Racer[];
  startTime: number;
}

function App() {
  const [raceState, setRaceState] = useState<Race>({
    _id: "",
    words: [],
    isOpen: true,
    isOver: false,
    racers: [],
    startTime: 0,
  });

  useEffect(() => {
    socket.on("race-updated", (race: Race) => {
      console.log("race", race);
      setRaceState(race);
    });
  }, []);

  useEffect(() => {
    if (raceState._id !== "") {
      history.push(`/race/${raceState._id}`);
    }
  }, [raceState._id]);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={RaceMenu} />
        <Route path="/race/create" component={CreateRace} />
      </Switch>
    </Router>
  );
}

export default App;
