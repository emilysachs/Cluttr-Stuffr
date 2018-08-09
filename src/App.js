import React, { Component } from 'react';
import logo from './sock.svg';
import './App.css';
import Box from './Box';

const data = [{id: "1", name:"Root",children:
                [{id: "2", name:"One",children:
                  [{id: "3", name:"A1",children:
                    [{id: "4", name:"x", children: []},
                    {id: "5", name:"y", children: []}]
                  }]
                },
                {id: "6", name:"Two",children:
                  [{id: "7", name:"A2", children: []}]
                }]
              }];

class App extends Component {
  render() {
    var data = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : data;
    return (
      <div className="App" style={{display: 'flex',flexDirection: 'column', }}>
        <header className="App-header" style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{maxWidth: 400, margin: 0, display: 'flex', flexDirection: 'row'}}>
            <img src={logo} className="sock--left" alt="sock" />
            <h1 className="App-title">Cluttr Stuffr</h1>
            <img src={logo} className="sock--right" alt="sock" />
          </div>
        </header>
        <div style={{margin: "10px 50px", display: "block"}}>
          <Box data={data} display="block" height="100%" maxWidth="100%" border="none"/>

        </div>
      </div>
    );
  }
}

export default App;
