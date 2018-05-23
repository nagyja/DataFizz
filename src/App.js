import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './container/home';

class App extends Component {
  constructor() {
    super();
    this.showHidden = this.showHidden.bind(this);
    this.state = {
     signIn: true,
    };
  }
  showHidden(e) {
    const toBeVisible = e.target.key;
    const States = ["bookList", "cardMaker", "boxes"];
    States.forEach((x) => {
        return (x===toBeVisible)? this.setState({ [x]: false }) : this.setState({ [x]: true });
    });
}
  render() {
    return (
      <div className="App">
        {this.state.signIn && <Home/> }
      </div>
    );
  }
}

export default App;
