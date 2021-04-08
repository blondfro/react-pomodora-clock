import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from "popper.js";
import {
    faPlayCircle,
    faPauseCircle,
    faArrowCircleUp,
    faArrowCircleDown,
    faRedo} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import './App.css';
import PomodoraClock from "./components/PomodoraClock";

library.add(
    faPlayCircle,
    faPauseCircle,
    faArrowCircleUp,
    faArrowCircleDown,
    faRedo
);


function App() {
  return (
    <div className="App">
      <PomodoraClock />
    </div>
  );
}

export default App;
