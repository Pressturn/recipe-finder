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

    function isAlreadySaved(mealId) {
        return favourites.some(fav => fav.mealId === mealId)
    }

    function handleSave(meal) {
        const favourite = {
            mealId: meal.idMeal,
            title: meal.strMeal,
            thumb: meal.strMealThumb
        }
        onSave(favourite)
    }

    return (
        <div>
            <h1>Recipe Finder</h1>
            <input
                className="border border-solid rounded-full"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
            />

            <button className="bg-blue-500" onClick={handleSearch}>Search</button>
            <div>
                {searchResults.map((meal) => (
                    <div key={meal.idMeal}>
                        <RecipeCard
                            mealId={meal.idMeal}
                            title={meal.strMeal}
                            thumb={meal.strMealThumb}
                        />
                        <div>
                            <button
                                onClick={() => handleSave(meal)}
                                disabled={isAlreadySaved(meal.idMeal)}
                            >
                                {isAlreadySaved(meal.idMeal) ? "Saved" : "Save"}
                            </button>

                            <Link to={`/recipe/${meal.idMeal}`}>
                                <button>View</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default HomePage



