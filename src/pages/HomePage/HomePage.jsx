import { searchMealsByName } from "../../services/mealdbService"
import { useState } from "react"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { Link } from "react-router-dom"

function HomePage({ onSave, isAlreadySaved }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [recipes, setRecipes] = useState([])

    async function handleSearch() {
        const meals = await searchMealsByName(searchTerm)
        setRecipes(meals)
    }

    return (
        <div className="p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Recipe Finder</h1>

            <div className="w-full max-w-2xl mx-auto mb-8">
                <input
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-full text-lg"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                />

                <button
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleSearch}>Search</button>
            </div>

            <div className="grid grid-cols-4 gap-6 w-full">
                {recipes.map((meal) => (
                    <div key={meal.idMeal} className=" rounded-lg shadow-md p-4">
                        <RecipeCard
                            mealId={meal.idMeal}
                            title={meal.strMeal}
                            thumb={meal.strMealThumb}
                            onSave={onSave}
                            isAlreadySaved={isAlreadySaved(meal.idMeal)}
                        />

                        <Link to={`/recipe/${meal.idMeal}`}>
                            <button
                                className="w-full py-1 px-2 text-sm bg-blue-500 text-white rounded">View</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default HomePage



