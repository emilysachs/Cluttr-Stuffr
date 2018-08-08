import React, { Component } from 'react';
import logo from './logo.svg';
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
function flatten(array, depth) {
  return array.reduce((p, c, i, a) => {
    if (c.children) {
        const item = {name: c.name, depth: depth};
        const flatChildren = flatten(c.children, depth + 1);
        return p.concat([item]).concat(flatChildren);
    } else {
        const item = {name: c.name, depth: depth};
        return p.concat([item]);
    }
  }, [])
}



class App extends Component {
  render() {
    console.log(localStorage.getItem("data"));
    var data = JSON.parse(localStorage.getItem("data"));
    return (
      <div className="App" style={{display: 'flex',flexDirection: 'column', }}>
        <header className="App-header" style={{width: '100%'}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Cluttr Stuffr</h1>
        </header>
        <div style={{margin: 50, display: "block"}}>
          <Box data={data} display="block" height="100%" maxWidth="100%" border="none"/>

        </div>
      </div>
    );
  }
}

export default App;
