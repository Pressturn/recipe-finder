import { searchMealsByName } from "../../services/mealdbService"
import { useState } from "react"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { Link } from "react-router-dom"

function HomePage({ onSave, favourites = [] }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    async function handleSearch() {
        const meals = await searchMealsByName(searchTerm)
        setSearchResults(meals)
    }

    return (
        <div>
            <h1>Recipe Finder</h1>
            <input
            className="border border-solid rounded-full"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} />
            <button className="bg-blue-500" onClick={handleSearch}>Search</button>
            <div>
                {searchResults
                    .filter((meal) => !favourites.some((fav) => fav.id === meal.idMeal))
                    .map((meal) => (
                        <div key={meal.idMeal}>
                            <RecipeCard
                                mealId={meal.idMeal}
                                title={meal.strMeal}
                                thumb={meal.strMealThumb}
                                onSave={onSave} />

                            <Link to="/details" state={{ meal }}>
                                <button>View</button>
                            </Link>
                        </div>
                ))}
        </div>
</div >
            )
}

export default HomePage



