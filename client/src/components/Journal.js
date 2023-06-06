import React, { Component } from 'react';
import Header from './Header';
import ResponsePanel from './ResponsePanel';

class Journal extends Component {

  constructor(props) {
    super(props);
    this.state = {entry: '', finished: false, classifications: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({finished: true}); 
    this.classifyTextAPI(this.state.entry.match(/([^.!?]+[.!?]+)|([^.!?]+$)/g));
    event.preventDefault();
  }

  handleChange(event) {
    // updates entry value to include newly typed character
    this.setState({entry: event.target.value});
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
          <h1>Geode Journaling</h1>
          <h2>Write a journal entry below:</h2><br></br>
        </div>
        { !finished ? (
          // if not finished:
          <div className='centered'>
            <ul className="plaintext">
              <form onSubmit={ this.handleSubmit }>
                <p>{this.state.entry}</p>
                <textarea onKeyDown={this.preventBackspacing} onChange={this.handleChange}/>
                <input type="submit" value="Done editing"></input>
              </form>
            </ul>
          </div>
        ) : (
          // if finished
          <div className='centered'>
            <ul className="plaintext">
                <p>your entry: <br></br><br></br>
                {this.state.entry}</p>
            </ul>
            
            <ResponsePanel classifications={this.state.classifications} />
           
          </div>
        )}
      </div>
    );
  }
}

export default Journal;