import React, { Component } from 'react';
import './App.css';
import GitTemplate from './Components/GitTemplate.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      search:false,
    };

  }


  handleSubmit = (event) => {
    this.setState({search:true})
    //alert('A name was submitted: ' + this.state.value);
    console.log('event', event.target[0].value)
    this.setState({value: event.target[0].value});
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
          <div className="Title">
            <h1>GitApperino</h1>
            <form onSubmit={this.handleSubmit}>
              <input placeholder="Search.." type="text"/>
              <input type="submit" value="Submit" />
            </form>
          </div>
          {<GitTemplate value={this.state.value ? this.state.value :null}/>}
      </div>
    );
  }
}
export default App;
