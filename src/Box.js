import React, { Component } from 'react';
import ReactJson from 'react-json-view';

const data = [{name:"Root",children:
                [{name:"One",children:
                  [{name:"A1",children:
                    [{name:"x"},
                    {name:"y"}]
                  }]
                },
                {name:"Two",children:
                  [{name:"A2"}]
                }]
              }];

class Box extends Component {
  constructor(props){
    super(props);
    this.state = {
      bins: [],
      data: this.props.data,
      dataView: this.props.data[0],
      lastData: [],
      height: this.props.height,
      maxWidth: this.props.maxWidth,
      border: this.props.border,
    }
  }
  addBox(){
    var copy = this.state.data;
    var dataString = JSON.stringify(copy);
    var node = this.state.dataView;
    var nodeString = JSON.stringify(this.state.dataView);
    node.children.push({name:"Three!"});
    var updatedString = JSON.stringify(node);
    var newString = dataString.replace(nodeString, updatedString);
    console.log("dataString");
    console.log(dataString);
    console.log("nodeString");
    console.log(nodeString);
    console.log("updatedString");
    console.log(updatedString);
    console.log("newString");
    console.log(newString);
    this.setState({
      data: JSON.parse(newString),
      dataView: JSON.parse(updatedString)
    })
    
    
    localStorage.setItem("data", newString);
    
  }
  reload(){
    
    localStorage.setItem("data", JSON.stringify(data));
    this.setState({
      data: data
    });
  }
  zoomer(i){
    console.log("last data");
    console.log(this.state.lastData);
    console.log(this.state.data);
    console.log(this.state.data.children);
    console.log(this.state.data[0]);
    var newData = this.state.lastData;
    newData.unshift(this.state.dataView)
    this.setState({
      dataView: this.state.dataView.children[i],
      lastData: newData,
    })
  }
  saver(edit){
    console.log("hello");
    console.log(edit);
    localStorage.setItem("data", JSON.stringify(edit.updated_src));
    return true;
  }
  zoomOut(){
    if(this.state.lastData.length > 0){
      var back = this.state.lastData[0];
      var newData = this.state.lastData;
      newData.shift();
      this.setState({
        dataView: back,
        lastData: newData
      })
    }
  }
 
  render() {
    var root = this.state.dataView;
    return (
      <div style={{flexGrow: 1, maxHeight: 400, margin: 1, maxWidth: this.state.maxWidth, border: this.state.border}}>
          {/*<input style={{margin: 5}} placeholder={root.name}></input>
          <button onClick={this.zoomOut.bind(this)}>X</button>
          <button onClick={this.addBox.bind(this)}>+</button><button onClick={this.saver.bind(this)}>S</button>
          <button onClick={this.reload.bind(this)}>R</button>
          <br></br>
          <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
          {root.children && root.children.map((item, i) => {
            return <div onClick={this.zoomer.bind(this, i)} id={"child-"+i} style={{height: 50, margin: 1, minWidth: 200, flexGrow: 1, border: '3px solid blue', borderRadius: 20}}>{item.name}</div> 
          })}
          </div>*/} 
          <ReactJson 
            name={false}
            defaultValue="yo"
            onEdit={this.saver.bind(this)}
            onAdd={this.saver.bind(this)}
            onDelete={this.saver.bind(this)}
            enableClipboard={false}
            iconStyle="circle"
            style={{height: '100%'}}
            displayObjectSize={true}
            displayDataTypes={false}
            theme="rjv-default"
            src={this.state.data} />

          
      </div>
    );
  }
}

export default Box;
