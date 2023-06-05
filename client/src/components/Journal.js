import React, { Component } from 'react';
import Header from './Header';
import ResponsePanel from './ResponsePanel';

class Journal extends Component {

  constructor(props) {
    super(props);
    this.state = {entry: '', value: "", finished: false, classifications: []};
    // value has to stay, it clears the text area so that a character is only added once

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
    this.setState({entry: this.state.entry + event.target.value});
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
        <div>
          <h1>Geode Journaling</h1>
          <h2>Write a journal entry below:</h2><br></br>
        </div>
        { !finished ? (
          // if not finished:
          <div>
            <ul className="plaintext">
              <form onSubmit={ this.handleSubmit }>
                <p>your entry:
                {/* manual spacing, can replace with CSS/styling */}
                <br></br>
                <br></br>
                {this.state.entry}</p>

                <textarea value={this.state.value} onChange={this.handleChange}/>
                <br></br> 

                <input type="submit" value="Done editing"></input>
              </form>
            </ul>
          </div>
        ) : (
          // if finished
          <div>
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