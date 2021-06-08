import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Home from './pages/index'; 
import About from './pages/about/About.jsx'; 
import "./styles.css";
import Navbar from "./componenets/navbar/Navbar";

 function App() {
  return ( 
      <Router> 
        <Navbar/>
        <Switch> 
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About/>
          </Route>
        </Switch>
      </Router> 
    ); 
}
export default App; 