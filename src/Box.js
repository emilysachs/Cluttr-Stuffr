import React, { Component } from 'react';
import { v4 } from 'node-uuid';

const constData = [{id: "1", name:"Home",children:
[{id: "2", name:"Bedroom",children:
[{id: "3", name:"Dresser",children:
[{id: "4", name:"Drawer 1", children: []},
{id: "5", name:"Drawer 2", children: [
{id: "8", name:"White Shirt", children: []}, 
{id: "9", name:"Black Shirt", children: []}, 
{id: "10", name:"Blue Shirt", children: []}]}]
}]
},
{id: "6", name:"Kitchen",children:
[{id: "7", name:"Fridge", children: []}]
}]
}];

const constData2 = [{"id":"1","name":"Travel","children":
[{"id":"2","name":"Canada","children":[{"id":"3","name":"Alberta","children":
[{"id":"4","name":"Jasper","children":[]},{"id":"5","name":"Banff","children":
[{"id":"8","name":"Lake Louise","children":[]},{"id":"9","name":"Moraine Lake","children":[]},
{"id":"10","name":"Bow Falls","children":[]}]},{"name":"Icefields Parkway","id":"1fce0f33-e4d9-4ee7-aa4b-93c3a8501b11",
"children":[{"name":"Athabasca Glacier","id":"a3daf8d1-e0ea-4a9f-8969-49c7c46d75c0","children":[]}]}]},
{"name":"Toronto","id":"605c5fcc-1fd7-4947-8d76-e9814835f627","children":
[{"name":"Food","id":"ec21cd7e-4b52-489f-bcbe-84e83ea9eb4a","children":
[{"name":"Rolled Ice Cream","id":"e8a5e1e0-de15-4f48-b92a-93d1222d5442","children":[]},
{"name":"Poutine","id":"73acfb1b-6c96-4aa3-ae5d-608f92c3a359","children":[]}]}]}]},
{"id":"6","name":"LA Trip","children":[{"id":"7","name":"Malibu","children":
[{"name":"El Matador","id":"d601deac-f452-4fbe-b2f0-ecf1490d4b8e","children":[]},
{"name":"Cafe Habana","id":"7098d6bb-c5c3-4bb2-a613-febaad2416cc","children":[]},
{"name":"Nobu","id":"144822f6-3f71-499b-9412-8c1163c7a4f3","children":[]},
{"name":"Malibu Farm","id":"31784bbb-08be-493e-a98f-d904d054923d","children":[]},
{"name":"Duke's","id":"613b217b-e28f-4760-98f6-b9a9353c1cb7","children":[]},
{"name":"Point Dume","id":"3fe82676-c089-42fc-99ed-c894edd8b228","children":[]}]},
{"name":"West Hollywood","id":"9ac338ff-4c26-4337-bf6f-be401dade051","children":
[{"name":"Alfred's","id":"40d5688e-c8db-4b06-be0d-0e3818abf954","children":[]},
{"name":"Pink Wall","id":"64df2531-af71-4619-987f-222bc0504bc9","children":[]}]},
{"name":"Museums","id":"46655ad3-a4a9-4242-abd5-d675c6aa97bf","children":
[{"name":"LACMA","id":"d59f204b-e218-4d65-a166-9e05ebffa3aa","children":[]},
{"name":"The Broad","id":"9476f85d-51ec-4079-ab2a-dd1cdcb531bb","children":[]},
{"name":"The Getty","id":"b61879ea-6e1e-4aa4-91ea-4c15abc5628d","children":[]}]},
{"name":"Runyon Canyon","id":"2f7782eb-1b44-4e46-acb4-ff68057e0219","children":[]},
{"name":"Rodeo Drive","id":"9d4e4635-6e8b-4f23-9f8f-d3915fae147b","children":[]}]}]}]

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: this.props.kids < 6 || this.props.id === "1" ? 'block' : 'none',
      displayCount: this.props.kids < 6 || this.props.id === "1" ? 'none' : 'block',
      expanded: this.props.kids < 6 || this.props.id === "1" ? true : false,
    }
  }
  addItem(){
    var data = this.state.data;
  }
  showKids(){
    this.setState({
      display: 'block',
      displayCount: 'none',
      expanded: true,
    })
  }
  hideKids(){
    this.setState({
      display: 'none',
      displayCount: 'block',
      expanded: false
    })
  }
  zoom(){
    this.showKids.bind(this);
    this.props.focusOnMe();
  }

  render() {
    var expand;
    if (!this.state.expanded) {
          expand = <i className="material-icons" onClick={this.showKids.bind(this)}>expand_less</i>;
        } else {
          expand = <i className="material-icons" onClick={this.hideKids.bind(this)}>expand_more</i>
        }
    return <div style={{flexGrow: 1, padding: 5, minWidth: '20%', minHeight: 20}} id={this.props.id} className="item" >
        <input onChange={this.props.handleChange.bind(this)} size={this.props.name.length + 1} value={ this.props.name }></input>
        <br></br>
        <i className="material-icons" onClick={this.props.addItem.bind(this)}>
          playlist_add
        </i>
        <i className="material-icons" onClick={this.props.removeItem.bind(this)}>
          delete_outline
        </i>
        {expand}
        <i className="material-icons" onClick={this.zoom.bind(this)}>
          zoom_out_map
        </i>
        <i className="material-icons" onClick={this.props.focusOff.bind(this)}>
          arrow_back
        </i>
        <span onClick={this.showKids.bind(this)} style={{display: this.state.displayCount}}>{this.props.kids} item(s)</span>
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
        function progressEvent(result){
          this.setState({
            data: result
          })
        }
        var file = selectorFiles[0];
        var reader = new FileReader();
          reader.onload = function(progressEvent){
            // Entire file
            callback(this.result);
            
          };
          reader.readAsText(file);         
    }

    load(result){
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
        return <div style={{float: "left"}} >
            <input type="file" style={{fontSize: 12}} data={this.state.data} onChange={ (e) => this.handleChange(e.target.files, this.load.bind(this)) } />
            <br></br>
            <button style={{float: "left"}} onClick={this.upload}>Import your data</button>
        </div>;
    }
  }

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      dataView: this.props.data
    }
  }  

  saver(data){
    localStorage.setItem("data", JSON.stringify(data));
    return true;
  }

  findObjectById(treeNodes, searchID, action, lastNode) {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length-1; nodeIdx++) {
      if(treeNodes[nodeIdx] !== undefined && treeNodes[nodeIdx] !== null){
              var currentNode = treeNodes[nodeIdx],
                  currentId = currentNode.id,
                  currentChildren = currentNode.children;
              if (currentId == searchID) {    
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

  addItem(node){
    var data = this.state.data;
    var bla = this.findObjectById(data, node.id, "add", data);
    bla.children.push({
            name: "New",
            id: v4(),
            children: []
    });
    this.setState({
      data: data,
    })
    this.saver(data);
  }

  handleChange(node, e){
    var data = this.state.data;
    var bla = this.findObjectById(data, node.id, "change", data);
    bla.name = e.target.value;
    this.setState({
      data: data
    })
    this.saver(data);
  }

  removeItem(node){
    if (node.id === "1"){
      window.alert('Root node cannot be deleted');
    } else {
      if (window.confirm('Are you sure you wish to delete this item?')){
        var data = this.state.data;
        var bla = this.findObjectById(data, node.id, "delete", data);
        var parent = this.findObjectById(data, bla.id, "add", data);
        bla = bla.children.filter(n => n.id !== node.id);
        parent.children = bla;
        this.setState({
          data: data
        })
        this.saver(data);
      }
    }
  }

  focusOnMe(node){
    var data = this.state.data;
    var bla = this.findObjectById(data, node.id, "add", data);
    this.setState({
      dataView: [bla],
    })
  }

  focusOff(node){
    if (node.id !== "1"){
      var data = this.state.data;
      var bla = this.findObjectById(data, node.id, "delete", data);
      bla = this.findObjectById(data, bla.id, "add", data);
      this.setState({
        dataView: [bla],
      })
    }
  }

  reload(){
    var sample = Math.floor(Math.random() * 2) == 0 ? constData : constData2;
    localStorage.setItem("data", JSON.stringify(sample));
    this.setState({
      data: sample,
      dataView: sample
    });
  }

  upload = (data) => {
    data = JSON.parse(data)
    this.setState({
      data: data,
      dataView: data
    })
    this.saver(data);
  }

  download(){
    download("cluttr-stuffr.txt", JSON.stringify(this.state.data));
  }
  
  list(data) {
    if(!data.map){
      data = data.children;
    }
    const children = (children) => {
      if (children.length > 0) {
        return <div className="list" style={{margin: 5, minWidth: 50, minHeight: 20, border: '2px solid black', borderRadius: 10, display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>{ this.list(children) }</div>
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
    }
    })
  }
  
  render() {
    if(this.props.data === null){
      var data = constData;
    }
    return <div className="render">
      { this.state.dataView !== null ? this.list(this.state.dataView) : false}
      <FileSelector data={this.props.data} upload={this.upload} />
      <ul style={{listStyleType: "none", width: 300, textAlign: "right", float: "right"}}>
        <li><i className="material-icons">playlist_add</i> 
        Add item within current item</li>
        <li><i className="material-icons">delete_outline</i> 
        Delete current item</li>
        <li><i className="material-icons">expand_less</i>
        Expand/collapse current item</li>
        <li><i className="material-icons">zoom_out_map</i> 
        Zoom to current item</li>
        <li><i className="material-icons">arrow_back</i> 
        Go to enclosing item</li>
      </ul>
      <div style={{float: "left"}}>
        <button style={{float: "left"}} onClick={this.reload.bind(this)}>Load sample data</button>
        <br></br>
        <button style={{float: "left"}} onClick={this.download.bind(this)}>Export your data</button>
      </div>
      <span style={{clear: "both"}} className="mobile">Using an iPhone? To save data for future use, click Export and then copy all of the text to your notes. Save the file to iCloud as a .txt file.</span>
      <br></br>
      <a style={{float: "right", clear: "both", textDecoration: "none", color: "white"}} href="http://emilysachs.com">emilysachs.com</a>
    </div>

  }
}

export default Box;
