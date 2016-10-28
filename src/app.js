import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'
import axios from 'axios'
import { Search } from './search/search' 



class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/search" component={Search} />
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))