import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { SearchForm } from './search-form'
import {
    Router,
    Route,
    hashHistory
} from 'react-router'

const MovieList = (props) => (
    <ul>
    {props.movies.map((movie, i) => {
        return (
            <li key={i}>
                <h4>{movie.Title}</h4>
                <img src={movie.Poster} />
            </li>
        )
    })}
    </ul>
)

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }
    onSearch(query) {
        axios.get(`http://www.omdbapi.com/?s=${query}&plot=short&r=json`)
            .then(response => {
                const movies = response.data.Search
                this.setState({
                    movies: movies
                })
            })
    }
    render() {
        return (
            <section>
                <h1>Movie Collection</h1>
                <SearchForm onSearchSubmit={this.onSearch.bind(this)} />
                <MovieList movies={this.state.movies} />
            </section>
        )
    }
    
}

class Main extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/search"
                    component={Search}
                />
            </Router>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))