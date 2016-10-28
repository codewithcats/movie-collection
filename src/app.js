import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'
import axios from 'axios'

import { Home } from './home'
import { Search } from './search/search'



class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Home} />
                <Route path="/search" component={Search} />
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))