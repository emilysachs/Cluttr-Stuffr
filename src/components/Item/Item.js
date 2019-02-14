import React, { Component } from 'react';

class Item extends Component {
  constructor(props){
    super(props);
    // Only expand upon initial load if item has less than 6 children, otherwise show collapsed view
    this.state = {
      display: this.props.kids < 6 || this.props.id === "1" ? 'block' : 'none',
      displayCount: this.props.kids < 6 || this.props.id === "1" ? 'none' : 'block',
      expanded: this.props.kids < 6 || this.props.id === "1" ? true : false,
    }
  }

  // Expand to show children
  showKids(){
    this.setState({
      display: 'block',
      displayCount: 'none',
      expanded: true,
    })
  }

  // Collapse to hide children
  hideKids(){
    this.setState({
      display: 'none',
      displayCount: 'block',
      expanded: false
    })
  }

  // Zoom to view data from context of selected item
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
    return <div id={this.props.id} className="item" >
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

export default Item;