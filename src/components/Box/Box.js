import React, { Component } from 'react';
import { v4 } from 'node-uuid';
import Item  from '../Item/Item';
import FileSelector from '../FileSelector/FileSelector';
import sampleData from '../../sampleData.js';

// Download utility function
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      dataView: this.props.data
    }
  } 

  // Save data as JSON object in local storage
  saver(data){
    localStorage.setItem("data", JSON.stringify(data));
    return true;
  }

  // Set state from uploaded file
  upload(data) {
    data = JSON.parse(data)
    this.setState({
      data: data,
      dataView: data
    })
    this.saver(data);
  }

  // Convert data to JSON object to be downloaded
  download(){
    // Need to add dynamic filename based on date, or allow user to choose name
    download("cluttr-stuffr.txt", JSON.stringify(this.state.data));
  }

  // Traverse tree to find node and perform action 
  findObjectById(treeNodes, searchID, action, lastNode) {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length-1; nodeIdx++) {
      if(treeNodes[nodeIdx] !== undefined && treeNodes[nodeIdx] !== null){
        var currentNode = treeNodes[nodeIdx],
          currentId = currentNode.id,
          currentChildren = currentNode.children;
        if (currentId === searchID) {    
          if (action === "delete"){ 
            return lastNode;
          }
          return currentNode;
        }
        else {
          var foundDescendant = this.findObjectById(currentChildren, searchID, action, treeNodes[nodeIdx]); 
          if (foundDescendant) {
              return foundDescendant;
          }
        }
      }
    }
    return false;
  };

  // Traverse tree to correct node and add new child item
  addItem(node){
    var data = this.state.data;
    var worker = this.findObjectById(data, node.id, "add", data);
    worker.children.push({
            name: "New",
            id: v4(),
            children: []
    });
    this.setState({
      data: data,
    })
    this.saver(data);
  }

  // Autosave changes to item names 
  handleChange(node, e){
    var data = this.state.data;
    var worker = this.findObjectById(data, node.id, "change", data);
    worker.name = e.target.value;
    this.setState({
      data: data
    })
    this.saver(data);
  }

  // Traverse tree to correct node and remove it
  removeItem(node){
    if (node.id === "1"){
      window.alert('Root node cannot be deleted');
    } else {
      if (window.confirm('Are you sure you wish to delete this item?')){
        var data = this.state.data;
        var worker = this.findObjectById(data, node.id, "delete", data);
        var parent = this.findObjectById(data, worker.id, "add", data);
        worker = worker.children.filter(n => n.id !== node.id);
        parent.children = worker;
        this.setState({
          data: data
        })
        this.saver(data);
      }
    }
  }

  // View data from the context of selected node
  focusOnMe(node){
    var data = this.state.data;
    var worker = this.findObjectById(data, node.id, "add", data);
    this.setState({
      dataView: [worker],
    })
  }

  // View data from context of parent node of selected node
  focusOff(node){
    if (node.id !== "1"){
      var data = this.state.data;
      var worker = this.findObjectById(data, node.id, "delete", data);
      worker = this.findObjectById(data, worker.id, "add", data);
      this.setState({
        dataView: [worker],
      })
    }
  }

  // Load random sample data
  reload(){
    var sample = Math.floor(Math.random() * 2) === 0 ? sampleData.constData : sampleData.constData2;
    localStorage.setItem("data", JSON.stringify(sample));
    this.setState({
      data: sample,
      dataView: sample
    });
  }
  
  // Build data view
  build(data) {
    if(!data.map){
      data = data.children;
    }
    const children = (children) => {
      if (children.length > 0) {
        return <div className="list">{ this.build(children) }</div>
      }
    }
    return data.map((node, index) => {
      if(node !== null){
        return <Item key={ node.id }  
                      kids={node.children.length} 
                      handleChange={this.handleChange.bind(this, node)} 
                      removeItem={this.removeItem.bind(this, node)} 
                      focusOnMe={this.focusOnMe.bind(this, node)}
                      focusOff={this.focusOff.bind(this, node)}
                      addItem={this.addItem.bind(this, node)} 
                      id={ node.id } name={ node.name }>
          { children(node.children) }
        </Item>
      } else {
        return null;
      }
    })
  }
  
  render() {
    if(this.props.data === null){
      var data = sampleData.constData;
    }
    return <div id="render">
      { this.state.dataView !== null ? this.build(this.state.dataView) : false}
      <FileSelector data={this.props.data} upload={this.upload} />
      <ul id="legend">
        <li><i className="material-icons">playlist_add</i> 
        Add item as child of current item</li>
        <li><i className="material-icons">delete_outline</i> 
        Delete current item</li>
        <li><i className="material-icons">expand_less</i>
        Expand/collapse children of current item</li>
        <li><i className="material-icons">zoom_out_map</i> 
        Zoom to view from context of current item</li>
        <li><i className="material-icons">arrow_back</i> 
        Go to view from context of enclosing item</li>
      </ul>
      <div id="dataSave">
        <button onClick={this.reload.bind(this)}>Load sample data</button>
        <br></br>
        <button onClick={this.download.bind(this)}>Export your data</button>
      </div>
      <span id="mobile">Using an iPhone? To save data for future use, click Export and then copy all of the text to your notes. Save the file to iCloud as a .txt file.</span>
      <br></br>
      <a id="website" href="http://emilysachs.com">emilysachs.com</a>
    </div>

  }
}

export default Box;
