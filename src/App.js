import React, { Component } from 'react';
import logo from './sock.svg';
import './App.css';
import Box from './components/Box/Box.js';
import sampleData from './sampleData.js';

const data = sampleData.startData; // need to fix to avoid crash without using duplicate variable while fetching localStorage

class App extends Component {
  render() {
    var data = JSON.parse(localStorage.getItem("data"));
    return (
      <div className="App">
        <header className="App-header" style={{display: 'flex', justifyContent: 'center'}}>
          <div id="headerBox">
            <img src={logo} className="sock--left" alt="sock" />
            <h1 className="App-title">Cluttr Stuffr</h1>
            <img src={logo} className="sock--right" alt="sock" />
          </div>
        </header>
        <div id="boxWrapper">
          <Box data={data} display="block" height="100%" maxWidth="100%" border="none"/>
        </div>
      </div>
    );
  }
}

export default App;
