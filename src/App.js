import React from 'react';
import SideBar from './sidebar';

import map from './assets/boroughs.png'


import './App.css';

export default function App() {
  return (
    <div id="App">
      <SideBar />
      <div id="page-wrap">
        <img src={map} alt="Map" />
        <h1>New York City Accident Visualiser</h1>
      </div>
    </div>
  );
}