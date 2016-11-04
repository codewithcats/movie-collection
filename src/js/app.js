import '../css/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { SearchForm } from './search-form'
import {
    Router,
    Route,
    hashHistory,
    Link,
    IndexRoute
} from 'react-router'

/*
 ?s=Batman
 {
     pathname: '/search',
     query: {
         s: "Batman"
     }
 }
 ?s=Batman&p=2
 {
     pathname: '/search',
     query: {
         s: "Batman",
         p: 2
     }
 }
*/

const batmanQuery = {
    pathname: '/search',
    query: {
        s: 'batman'
    }
}

const avengersQuery = {
    pathname: '/search',
    query: {
        s: 'avengers'
    }
}

const drStrangeQuery = {
    pathname: '/search',
    query: {
        s: 'doctor strange'
    }
}

const Home = () => (
    <section>
        <h1>This is home</h1>
        <ul>
            <li><Link to={batmanQuery}>Batman</Link></li>
            <li><Link to={avengersQuery}>Avengers</Link></li>
            <li><Link to={drStrangeQuery}>Doctor Strange</Link></li>
        </ul>
    </section>
)

const Nav = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/detail">Detail</Link></li>
        </ul>
    </nav>
)

const MovieList = (props) => (
    <ul>
    {props.movies.map((movie, i) => {
        const query = {
            pathname: '/detail',
            query: {
                id: movie.imdbID
            }
        }
        return (
            <li key={i}>
                <h4><Link to={query}>{movie.Title}</Link></h4>
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

class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: {
                Title: 'Unknown'
            }
        }
        if (props.location.query.id) {
            const id = props.location.query.id
            axios.get(`http://www.omdbapi.com/?i=${id}&plot=short&r=json`)
                .then(response => {
                    const movie = response.data
                    this.setState({
                        movie: movie
                    })
                })
        }
    }
    render() {
        const {
            Title,
            Genre,
            Poster
        } = this.state.movie
        return (
            <section>
                <h1>{Title}</h1>
                <small>{Genre}</small>
                <div>
                    <img src={Poster} />
                </div>
            </section>
        )
    }
}

const App = props => (
    <section>
        <Nav />
        {props.children}
    </section>
)

class Main extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="search" component={Search}/>
                    <Route path="detail" component={MovieDetail}/>
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))