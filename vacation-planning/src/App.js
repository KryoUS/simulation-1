import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const expenseAPI = `http://localhost:3005/api/expenses`

class App extends Component {
  constructor() {
    super()

    this.state = {
      expenses: [],
      showForm: false,
      addButtonText: 'Add',
      username: '',
      type: '',
      description: '',
      price: '',
      link: ''
    }
  }

  componentDidMount = () => {
    this.getExpenses()
  }

  getExpenses = () => {
    axios.get(expenseAPI).then(res => {
      this.setState({ expenses: res.data })
    }).catch(error => console.log(error))
  }

  addExpense = () => {
    if (this.state.showForm === false) {
      this.setState({ 
        showForm: true,
        addButtonText: 'Cancel'
      })
    } else {
      this.setState({
        showForm: false,
        addButtonText: 'Add',
        username: '',
        type: '',
        description: '',
        price: '',
        link: ''
      })
    }
  }

  editExpense = (key) => {
    console.log(key)
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    })
  }

  formSubmit = () => {
    if (this.state.username && this.state.type && this.state.description && this.state.price > 0 && this.state.link) {
      axios.post(expenseAPI, {
        username: this.state.username,
        expensetype: this.state.type,
        description: this.state.description,
        price: this.state.price,
        link: this.state.link
      }).then(res => {
        this.getExpenses()
        this.setState({
          username: '',
          type: '',
          description: '',
          price: '',
          link: ''
        })
      }).catch(error => console.log(error))
    } else {
      alert('Please complete all form values.')
    }
  }

  deleteExpense = (id) => {
    axios.delete(expenseAPI+'/'+id).then(res => {
      this.getExpenses()
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Expense Planner</h2>
          <div className="addbutton" onClick={() => this.addExpense() }>{this.state.addButtonText}</div>
        </header>
        {this.state.showForm === true &&
          <div className="form">
            <input className="form-input" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
            <input className="form-input" name="type" type="text" placeholder="Type" value={this.state.type} onChange={this.handleChange}/>
            <input className="form-input" name="description" type="text" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
            <input className="form-input" name="price" type="text" placeholder="Price" value={this.state.price} onChange={this.handleChange}/>
            <input className="form-input" name="link" type="url" placeholder="Link" value={this.state.link} onChange={this.handleChange}/>
            <div className="form-button" onClick={() => this.formSubmit() }>Submit</div>
          </div>
        }
        <div className="table-flex">
          <table>
            <tbody>
              <tr>
                <th>USERNAME</th>
                <th>TYPE</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>LINK</th>
              </tr>
              { this.state.expenses.map(obj => (
                <tr key={obj.expenseid}>
                  <td >{ obj.username }</td>
                  <td>{ obj.expensetype }</td>
                  <td>{ obj.description }</td>
                  <td>{ obj.price }</td>
                  <td><a href={ obj.link }>External Site</a></td>
                  <td className="button" onClick={() => this.editExpense(obj.expenseid) }>Edit</td>
                  <td></td>
                  <td className="button" onClick={() => this.deleteExpense(obj.expenseid) }>Delete</td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
