import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header className="bg-grey border-b border-grey">
            <nav className="max-w-6xl mx-auto px-8 py-4 flex items-center gap-8">

                <NavLink to="/" className="text-white hover:text-gray">Home</NavLink>
                <NavLink to="/favourites" className="text-white hover:text-gray" >Favourites</NavLink>
            </nav>
        </header>

    )
}

export default Header