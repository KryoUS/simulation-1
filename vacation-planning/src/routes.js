import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Add from './components/Add/Add';
import Edit from './components/Edit/Edit';

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Add" component={Add} />
        <Route path="/Edit/:id" component={Edit} />
    </Switch>
)