import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/landing/landing'
import Home from './components/home/home'
import Form from './components/form/form'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={LandingPage}></Route>
      <Route path='/videogames' component={Home}></Route>
      <Route path='/create' component={Form}></Route>
    </React.Fragment>
  );
}

export default App;
