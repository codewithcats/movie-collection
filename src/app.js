import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'
import axios from 'axios'

import { Home } from './home'
import { Search } from './search/search'

const Nav = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
    </nav>
)

const Main = props => (
    <div>
        <Nav />
        {props.children}
    </div>
)


class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={Home} />
                    <Route path="search" component={Search} />
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))