import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import { Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Expense Planner</h2>
          <div className="nav-buttons">
            <Link to ='/'><div className="addbutton" >Home</div></Link>
            <Link to ='/Add'><div  className="addbutton" >Add</div></Link>
          </div>
        </header>
        { routes }
      </div>
    );
  }
}

export default App;
