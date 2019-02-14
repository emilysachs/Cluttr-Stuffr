import React, { Component } from 'react';

class FileSelector extends Component<undefined, undefined>{
    constructor(props: any){
        super(props);
        this.state = {
          data: this.props.data
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // Process chosen file
    handleChange(selectorFiles: FileList, callback){
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

    // Callback to set state using data from file
    load(result){
      this.setState({
        data: result
      })
    }

    // Send data to Box class to refresh state
    upload(){
      // Need to add edge cases to handle user not choosing a file or choosing the wrong type of file, etc.
      var data = this.state.data;
      this.props.upload(data);
    }

    render (){
      return <div id="fileSelector">
              <input type="file" data={this.state.data} onChange={ (e) => this.handleChange(e.target.files, this.load.bind(this)) } />
              <br></br>
              <button onClick={this.upload.bind(this)}>Import your data</button>
            </div>;
    }
  }
export default FileSelector;