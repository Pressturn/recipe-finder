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
        <div>
            <h1>{details.strMeal}</h1>
            <img src={details.strMealThumb} alt={details.strMeal} />

            <div>
                <button onClick={handleSave}>Save to Favourites</button>
                <Link to="/"><button>Back to Search</button></Link>
            </div>

            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((ingredientLine, index) => (
                    <li key={index}>{ingredientLine}</li>
                ))}
            </ul>

            <h2>Instructions</h2>
            {details.strInstructions}
        </div>
    )
}

export default RecipeDetails