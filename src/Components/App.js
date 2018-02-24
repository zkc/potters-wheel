import React, { Component } from 'react';
import '../Styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="top-bar"></div>
        <div className="list-space">
          <div className="list" id="1">
            <div className="list-title">First List</div>
            <div className="card-space">
              <div className="card">Original Card</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
