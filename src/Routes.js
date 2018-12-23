import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CinemaApp from './Pages/CinemaApp/CinemaApp';

class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact component={CinemaApp} path='/' />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Routes;