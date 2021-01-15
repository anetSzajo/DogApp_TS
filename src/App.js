import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import BreedPage from "./Components/BreedPage/BreedPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";

export default function App() {
  return (
      <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/:breedKey" component={BreedPage}/>
          </Switch>
        </Router>
        <Footer/>
      </div>
  );
}

