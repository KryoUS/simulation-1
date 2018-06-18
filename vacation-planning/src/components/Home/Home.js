import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const expenseAPI = `http://localhost:3005/api/expenses`

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            expenses: [],
            total: 0
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

    deleteExpense = (id) => {
        axios.delete(expenseAPI+'/'+id).then(res => {
            this.getExpenses()
        }).catch(error => {
            console.log(error)
        })
    }

    totalExpenses = () => {
        let expenseTotal = 0
        this.expenses.map(obj => {
            expenseTotal += parseFloat(obj.price)
        })
        this.setState({ total: expenseTotal })
    }

    render () {
        return (
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
                                <td><Link to ={`/Edit/${obj.expenseid}`}><div className="button">Edit</div></Link></td>
                                <td><div className="button" onClick={() => this.deleteExpense(obj.expenseid) }>Delete</div></td>
                            </tr>
                        )) }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{ this.state.total }</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}