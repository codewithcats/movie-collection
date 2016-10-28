import React from 'react'
import { Link } from 'react-router'

const batman = {
    pathname: '/search',
    query: {
        s: 'Batman'
    }
}

const avengers = {
    pathname: '/search',
    query: {
        s: 'avengers'
    }
}

export const Home = () => (
    <section>
        <h1>Home</h1>
        <ul>
            <li><Link to={batman}>Batman</Link></li>
            <li><Link to={avengers}>Avengers</Link></li>
        </ul>
    </section>
)