import { searchMealsByName } from "../../services/mealdbService"
import { useState } from "react"

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
                    <li key={meal.idMeal}>{meal.strMeal}</li>
                ))}
            </ul>
        </div>

    )
}

export default HomePage



