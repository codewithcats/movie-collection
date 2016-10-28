import React from 'react'
import axios from 'axios'
import { SearchForm } from './search-form'

const MovieList = (props) => (
    <ul>
    {props.movies.map((movie, i) => {
        return (
            <li key={i}>{movie.Title}</li>
        )
    })}
    </ul>
)

export class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
        if (props.location.query.s) {
            this.onSearch(props.location.query.s)
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