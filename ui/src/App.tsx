import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/home';
import Nav from './components/nav';
import Footer from './components/footer';

import './App.css';

const App: React.FunctionComponent = () => {
    return (<Router>
        <Nav />
        <Switch>
            <Route path="/"> <HomePage /> </Route>
        </Switch>
        <Footer />
    </Router>);
}

export default App;


