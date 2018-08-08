import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Box from './Box';

// const data = [{name:"Root",children:
//                 [{name:"One",children:
//                   [{name:"A1",children:
//                     [{name:"x"},
//                     {name:"y"}]
//                   }]
//                 },
//                 {name:"Two",children:
//                   [{name:"A2"}]
//                 }]
//               }];
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
        <div style={{margin: 50, display: "none"}}>
          <Box data={data} display="block" height="100%" maxWidth="100%" border="none"/>
        </div>
      </div>
    );
  }
}

export default App;
