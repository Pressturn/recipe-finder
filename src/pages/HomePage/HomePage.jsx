import { searchMealsByName } from "../../services/mealdbService"
import { useState } from "react"
import RecipeCard from "../../components/RecipeCard/RecipeCard"

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
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} />
            <button onClick={handleSearch}>Search</button>

            {searchResults
                .filter((meal) => !favourites.some((fav) => fav.id === meal.idMeal))
                .map((meal) => (
                    <RecipeCard
                        key={meal.idMeal}
                        id={meal.idMeal}
                        title={meal.strMeal}
                        thumbnail={meal.strMealThumb}
                        onSave={onSave}
                    />
                ))}

        </div >

    )
}

export default HomePage



