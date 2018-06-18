import React, { Component } from 'react';
import axios from 'axios';

const expenseAPI = `http://localhost:3005/api/expenses`

export default class Add extends Component {
    constructor() {
        super ()

        this.state = {
            username: '',
            type: '',
            description: '',
            price: '',
            link: ''
        }
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

    getExpenses = () => {
        axios.get(expenseAPI).then(res => {
            this.setState({ expenses: res.data })
        }).catch(error => console.log(error))
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        })
    }

    render () {
        return (
        <div className="form">
            <input className="form-input" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
            <input className="form-input" name="type" type="text" placeholder="Type" value={this.state.type} onChange={this.handleChange}/>
            <input className="form-input" name="description" type="text" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
            <input className="form-input" name="price" type="text" placeholder="Price" value={this.state.price} onChange={this.handleChange}/>
            <input className="form-input" name="link" type="url" placeholder="Link" value={this.state.link} onChange={this.handleChange}/>
            <div className="form-button" onClick={() => this.formSubmit() }>Submit</div>
            }
        </div>
        )
    }
}