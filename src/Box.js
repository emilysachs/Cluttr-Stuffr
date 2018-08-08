import React, { Component } from 'react';
import { v4 } from 'node-uuid';

const constData = [{id: "1", name:"Root",children:
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

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


class List extends Component {
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
    node.children.push({name:"New",children:[]});
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
  saver(){
    localStorage.setItem("data", JSON.stringify(this.state.data));
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
  onTodoChange(value){
          this.setState({
               name: value
          });
      }
 
  render() {
    var root = this.state.dataView;
    return (
      <div style={{flexGrow: 1, maxHeight: 400, margin: 1, textAlign: 'center', maxWidth: this.state.maxWidth, border: this.state.border}}>
          
          

          
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: 'block',
      displayCount: 'none'
    }
  }
  addItem(){
    var data = this.state.data;
  }
  showKids(){
    this.setState({
      display: 'block',
      displayCount: 'none'
    })
  }
  hideKids(){
    this.setState({
      display: 'none',
      displayCount: 'block'
    })
  }
  render() {
    console.log("size");
    console.log(this.props.kids);
    return <div style={{flexGrow: 1, margin: 5, minWidth: 50, minHeight: 20}} id={this.props.id} className="item" >
        <input onChange={this.props.handleChange.bind(this)}size={10} value={ this.props.name }></input>
        <button onClick={this.props.addItem.bind(this)}>+</button>
        <button onClick={this.props.removeItem.bind(this)}>-</button>
        <button onClick={this.showKids.bind(this)}>Z</button>
        <button onClick={this.hideKids.bind(this)}>H</button>
        <span style={{display: this.state.displayCount}}>{this.props.kids} items</span>
        <div className="kids" style={{display: this.state.display}}>
          { this.props.children }
        </div>
    </div>
  }
}

class FileSelector extends React.Component<undefined, undefined>
{
    constructor(props: any)
    {
        super(props);
        this.state = {
          data: this.props.data
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectorFiles: FileList, callback)

    {
        console.log(selectorFiles);
        function progressEvent(result){
          this.setState({
            data: result
          })
        }
        var file = selectorFiles[0];
        var reader = new FileReader();
          reader.onload = function(progressEvent){
            // Entire file
            console.log(this.result);
            callback(this.result);
            
          };
          reader.readAsText(file);
          
          
          
    }

    load(result){
      console.log("LOAD");
      console.log(result);
      this.setState({
        data: result
      })
    }

    upload = () => {
      var data = this.state.data;
      this.props.upload(data);
    }

    render ()
    {
        return <div>
            <input type="file" data={this.state.data} onChange={ (e) => this.handleChange(e.target.files, this.load.bind(this)) } />
            <button onClick={this.upload}>Upload</button>
        </div>;
    }
  }

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
    console.log("DATA");
    console.log(this.state.data);
  }  

  saver(){
    localStorage.setItem("data", JSON.stringify(this.state.data));
    return true;
  }

  findObjectById(treeNodes, searchID, action) {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length-1; nodeIdx++) {
      if(treeNodes[nodeIdx] !== undefined && treeNodes[nodeIdx] !== null){
              var currentNode = treeNodes[nodeIdx],
                  currentId = currentNode.id,
                  currentChildren = currentNode.children;
              console.log("Comparing treeNodes element with ID==" + 
                          currentId + " to SearchID==" + searchID);
              if (currentId == searchID) {    
                  console.log("Match!");
                  if (action === "delete"){
                    delete treeNodes[nodeIdx];
                    return true;
                  }
                  return currentNode;
              }
              else {
                  console.log("No Match! Trying " + currentChildren.length + 
                              " Children of Node ID#" + currentId);
                  var foundDescendant = this.findObjectById(currentChildren, searchID, action); 
                  if (foundDescendant) {
                      return foundDescendant;
                  }
              }
          }
        }
        console.log("Done trying " + treeNodes.length + " children. Returning False");
        return false;
  };

  addItem(node){
    console.log(node);
    var data = this.state.data;
    console.log("pre data");
    console.log(data);
    var bla = this.findObjectById(data, node.id, "add");

    console.log(bla);
    bla.children.push({
            name: "New",
            id: v4(),
            children: []
    });
    console.log(data);

    this.setState({
      data: data
    })
    this.saver();
  }

  handleChange(node, e){
    console.log(node);
    var data = this.state.data;
    console.log("pre data");
    console.log(data);
    var bla = this.findObjectById(data, node.id, "change");

    bla.name = e.target.value;
    console.log(data);

    this.setState({
      data: data
    })
    this.saver();
  }

  removeItem(node){
    console.log(node);
    var data = this.state.data;
    console.log("pre data");
    console.log(data);
    var bla = this.findObjectById(data, node.id, "delete");


    console.log(data);

    this.setState({
      data: data
    })
    this.saver();
  }

  reload(){
    localStorage.setItem("data", JSON.stringify(constData));
    this.setState({
      data: constData
    });
  }

  upload = (data) => {
    console.log("upload data");
    console.log(JSON.parse(data));
    this.setState({
      data: JSON.parse(data)
    })
    console.log(this.state.data);
    this.saver();
  }

  download(){
    download("cluttr-stuffr.txt", JSON.stringify(this.state.data));
  }
  
  list(data) {
    const children = (children) => {
      if (children) {
        return <div className="list" style={{margin: 5, minWidth: 50, minHeight: 20, border: '2px solid black', borderRadius: 10, display: 'flex', flexDirection: 'row'}}>{ this.list(children) }</div>
      }
    }
    
    return data.map((node, index) => {
      if(node !== null){
      return <Item key={ node.id }  kids={node.children.length} handleChange={this.handleChange.bind(this, node)} removeItem={this.removeItem.bind(this, node)} addItem={this.addItem.bind(this, node)} id={ node.id } name={ node.name }>
        { children(node.children) }
      </Item>
    }
    })
  }
  
  render() {
    console.log("v4");
    console.log(v4());
    return <div className="render">
      { this.props.data !== null ? this.list(this.props.data) : false}
      <button onClick={this.download.bind(this)}>Download</button>
      <button onClick={this.saver.bind(this)}>S</button>
      <button onClick={this.reload.bind(this)}>R</button>
      <FileSelector data={this.props.data} upload={this.upload} />
    </div>
  }
}

export default Box;
