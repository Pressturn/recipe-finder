import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/favourites">Favourites</NavLink>
            </nav>
        </header>

    )
}

export default Header