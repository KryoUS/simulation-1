module.exports = {
    createExpense: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const { username, expensetype, description, price, link } = req.body;

        dbInstance.create_expense([username, expensetype, description, price, link])
            .then(response => {
                console.log('response: ', response)
                res.status(200).send(response)
            })
            .catch(error => {
                res.status(500).send({ ErrorMessage: `And, uh... life finds a way.` })
                console.log(error)
            })
    },

    getExpenses: ( req, res, next ) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_expenses()
            .then(response => res.status(200).send(response))
            .catch(error => {
                res.status(500).send({ ErrorMessage: `Oops, that's wrong.` })
                console.log(error)
            });
    },

    updateExpense: ( req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;

        dbInstance.update_expense([id])
            .then(response => res.status(200).send(response))
            .catch(error => {
                res.status(500).send({ ErrorMessage: `The condor has landed...` })
                console.log(error)
            });
    },

    deleteExpense: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;

        dbInstance.delete_expense([id])
            .then(response => res.status(200).send(response))
            .catch(error => {
                res.status(500).send({ ErrorMessage: `Uh oh, that doesn't go there.` })
                console.log(error)
            });
    }
}