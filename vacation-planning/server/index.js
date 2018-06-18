const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const expenseController = require('./controllers/expense_controller');
require('dotenv').config()

const app = express();
const cors = require('cors');
app.use( bodyParser.json() );
app.use( cors() );

massive( process.env.CONNECTION_STRING ).then( dbInstance => {
    app.set('db', dbInstance)
}).catch( error => console.log(`Something happened...`, error) );

app.get(`/api/expenses`, expenseController.getExpenses);
app.get(`/api/expenses/:id`, expenseController.getExpensesId);
app.put(`/api/expenses/:id`, expenseController.updateExpense);
app.post(`/api/expenses`, expenseController.createExpense);
app.delete(`/api/expenses/:id`, expenseController.deleteExpense);

const port = process.env.PORT || 3005;
app.listen( port, () => { console.log(`Server listening on port ${port}`)});
