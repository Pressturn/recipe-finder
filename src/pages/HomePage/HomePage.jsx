import { searchMealsByName } from "../../services/mealdbService"
import { useState } from "react"
import RecipeCard from "../../components/RecipeCard/RecipeCard"

function HomePage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setsearchResults] = useState([])

    async function handleSearch() {
        const meals = await searchMealsByName(searchTerm)
        setsearchResults(meals)
    }

    return (
        <div>
            <h1>Recipe Finder</h1>
            <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {searchResults.map((meal) => (
                    <RecipeCard
                        key={meal.idMeal} // for react rendering engine
                        id={meal.idMeal} 
                        title={meal.strMeal}
                        thumbnail={meal.strMealThumb}
                    />
                ))}
            </ul>
        </div>

    )
}

export default HomePage



