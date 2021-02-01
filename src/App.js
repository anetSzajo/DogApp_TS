import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import BreedPage from "./Components/BreedPage/BreedPage";
import Footer from "./Components/Footer";
import {BreedsListPage} from "./Components/BreedsListPage/BreedsListPage";

export default function App() {
  return (
      <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={BreedsListPage}/>
            <Route exact path="/:breedKey" component={BreedPage}/>
          </Switch>
        </Router>
        <Footer/>
      </div>
  );
}

