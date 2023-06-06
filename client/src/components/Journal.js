import React, { Component } from 'react';
import Header from './Header';
import ResponsePanel from './ResponsePanel';
import { Link } from "react-router-dom";

class Journal extends Component {

  constructor(props) {
    super(props);
    this.state = {entry: '', finished: false, classifications: [], textAreaRows: 3};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (this.state.entry != "") {
      this.setState({finished: true}); 
      this.classifyTextAPI(this.state.entry.match(/([^.!?]+[.!?]+)|([^.!?]+$)/g));
      event.preventDefault();
    }
  }

  handleChange(event) {
    console.log(event);
    // updates entry value to include newly typed character
    this.setState({entry: event.target.value});
    const currentTextAreaHeight = event.target.scrollHeight;
    const rowHeight = 20;
    const numNewRowsNeeded = Math.ceil(currentTextAreaHeight / rowHeight) - 1;
    if (numNewRowsNeeded > this.state.textAreaRows) {
      this.setState({textAreaRows: numNewRowsNeeded});
    }
  }

  preventBackspacing(event) {
    const key = event.key; // const {key} = event; ES6+
    if (key === "Backspace" || key === "Delete") {
        // console.log("stop!!");
        event.preventDefault();
    }
    // this.setState({entry: this.state.entry + event.key});
    /*
    var key = event.keyCode || event.charCode;

    if( key == 8 || key == 46 )
        return false;*/
  }

  classifyTextAPI = (inputs) => {
    console.log("type of inputs is: " + typeof(inputs));
    var querystring = "";
    for(let i = 0; i < inputs.length; i++) {
      if(i === 0) {
        querystring += "?input=\"" + inputs[i]+"\"";
      }
      else {
        querystring += "&input=\"" + inputs[i]+"\"";
      }
    }
    querystring = encodeURI('/api/classify-text' + querystring);
    console.log("INPUT URL IN FRONTEND IS: " + querystring);
    fetch(querystring)
      .then(res => res.json())
      .then(classifications => this.setState({ classifications }));
  } 

  render() {
    const { finished } = this.state;

    return (
      <div className="App">
        <Header />
        <div className='centered'>
          <h1>Journal</h1>
          <p>let your mind flow</p><br></br>
        </div>
        { !finished ? (
          // if not finished:
          <div className='centered'>
              <form onSubmit={ this.handleSubmit } id="journal-entry-form">
                <textarea onKeyDown={this.preventBackspacing} onChange={this.handleChange} rows={this.state.textAreaRows}/>
                <br></br>
                <input type="submit" value="Done editing"></input>
              </form>
          </div>
        ) : (
          // if finished
          <div className='centered'>
            <div className="info-panel-light">
                <p>{this.state.entry}</p>
            </div>
            
            <ResponsePanel classifications={this.state.classifications} />
            <br></br>
            <Link to="/">
              <button>Back</button>
            </Link>
            <Link to="/">
              <button>Save Entry</button>
            </Link>
           
          </div>
        )}
      </div>
    );
  }
}

export default Journal;