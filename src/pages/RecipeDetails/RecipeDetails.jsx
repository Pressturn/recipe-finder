import { useParams, Link } from "react-router-dom"
import { createFavourite } from "../../services/airtableService"
import { useState, useEffect } from 'react'
import { getMealById } from "../../services/mealdbService"


function RecipeDetails() {
    const { mealId } = useParams()
    const [details, setDetails] = useState(null)

    useEffect(() => {
        async function fetchRecipe() {
            const recipe = await getMealById(mealId)
            setDetails(recipe)
        }
        fetchRecipe()
    }, [mealId])

    if (!details) {
        return <div>Loading...</div>
    }

    function getIngredientsList(details) {
        const ingredientsList = []
        for (let i = 1; i <= 20; i++) {
            const ingredient = details[`strIngredient${i}`]
            const measure = details[`strMeasure${i}`]

            if (ingredient) {
                ingredientsList.push((measure || "") + " " + ingredient)
            }
        }
        return ingredientsList
    }


    const ingredients = getIngredientsList(details)

    async function handleSave() {
        const fav = {
            mealId: details.idMeal,
            title: details.strMeal,
            thumb: details.strMealThumb,
        }
        await createFavourite(fav)
    }

    return (
    <div className="p-12 min-h-screen">
        <div className="grid grid-cols-2 gap-16 w-full px-8">
                <div>
                    <h1 className="text-4xl font-bold mb-6">{details.strMeal}</h1>
                    <img src={details.strMealThumb}
                        alt={details.strMeal}
                    className="w-full h-96 object-cover rounded mb-8"
                    />

                    <div className="space-x-4">
                        <button onClick={handleSave}
                        className="px-6 py-3 bg-green-500 text-white rounded text-lg"
                        >Save to Favourites</button>
                        <Link to="/">
                        <button className="px-6 py-3 bg-blue-500 text-white rounded text-lg">
                                Back to Search</button></Link>
                    </div>
                </div>
                <div>
                <h2 className="text-5xl font-semibold mb-6">Ingredients</h2>
                <ul className="mb-8 space-y-2 text-lg">
                        {ingredients.map((ingredientLine, index) => (
                            <li key={index}
                                lassName="mb-1">{ingredientLine}</li>
                        ))}
                    </ul>

                <h2 className="text-5xl font-semibold mb-6">Instructions</h2>
                <div className="leading-relaxed text-lg">
                        {details.strInstructions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails