import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getMealById } from "../../services/mealdbService"

function RecipeDetails({ onSave, isAlreadySaved }) {
    const { mealId } = useParams()
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        async function fetchRecipe() {
            const recipeData = await getMealById(mealId)
            setRecipe(recipeData)
        }
        fetchRecipe()
    }, [mealId])

    if (!recipe) {
        return <div>Loading...</div>
    }

    function getIngredientsList(recipe) {
        const ingredientsList = []
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`]
            const measure = recipe[`strMeasure${i}`]

            if (ingredient) {
                ingredientsList.push((measure || "") + " " + ingredient)
            }
        }
        return ingredientsList
    }

    const ingredients = getIngredientsList(recipe)

    async function handleSave() {
        const favourite = {
            mealId: recipe.idMeal,
            title: recipe.strMeal,
            thumb: recipe.strMealThumb,
        }
        await onSave(favourite)
    }

    return (
        <div className="p-12 min-h-screen">
            <div className="grid grid-cols-2 gap-16 w-full px-8">
                <div>
                    <h1 className="text-4xl font-bold mb-6">{recipe.strMeal}</h1>
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-96 object-cover rounded mb-8"
                    />

                    <div className="space-x-4">
                        <button
                            onClick={handleSave}
                            disabled={isAlreadySaved(recipe.idMeal)}
                            className="px-6 py-3 bg-green-500 text-white rounded text-lg"
                        >
{isAlreadySaved(recipe.idMeal) ? "Saved" : "Save"}
                        </button>

                        <Link to="/">
                            <button
                                className="px-6 py-3 bg-blue-500 text-white rounded text-lg">
                                Back to Search</button>
                                </Link>
                    </div>
                </div>
                <div>
                    <h2 className="text-5xl font-semibold mb-6">Ingredients</h2>
                    <ul className="mb-8 space-y-2 text-lg">
                        {ingredients.map((ingredientLine, index) => (
                            <li
                                key={index}
                                className="mb-1">{ingredientLine}</li>
                        ))}
                    </ul>

                    <h2 className="text-5xl font-semibold mb-6">Instructions</h2>
                    <div className="leading-relaxed text-lg">
                        {recipe.strInstructions}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RecipeDetails