import React from 'react'
import { Link } from 'react-router'

const batman = {
    pathname: '/search',
    query: {
        s: 'Batman'
    }
}

export const Home = () => (
    <section>
        <h1>Home</h1>
        <ul>
            <li><Link to={batman}>Batman</Link></li>
        </ul>
    </section>
)