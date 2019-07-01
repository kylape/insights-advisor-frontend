import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from '../../Utilities/asyncComponent';

const ListRules = asyncComponent(() => import(/* webpackChunkName: "ListRules" */ './ListRules'));
const Details = asyncComponent(() => import(/* webpackChunkName: "Details" */ './Details'));
const InventoryDetails = asyncComponent(() =>
    import(/* webpackChunkName: "InventoryDetails" */ '../../PresentationalComponents/Inventory/InventoryDetails'));

const Rules = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path='/rules' component={ ListRules } />
                <Route exact path='/rules/by_id/:id' component={ Details }/>
                <Route exact path='/rules/:id' component={ Details }/>
                <Route path='/rules/by_id/:id/:inventoryId/' component={ InventoryDetails }/>
                <Route path='/rules/:id/:inventoryId/' component={ InventoryDetails }/>
            </Switch>
        </React.Fragment>
    );
};

export default Rules;
