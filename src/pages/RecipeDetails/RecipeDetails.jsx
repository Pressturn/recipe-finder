import React from 'react'
import { useLocation, Link } from "react-router-dom"
import { createFavourite } from "../../services/airtableService"

function RecipeDetails() {
    const location = useLocation()
    const details = location.state?.meal

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
        try {
            await createFavourite(fav)
            console.log("Saved to favourites:", fav)
        } catch (error) {
            console.log("Did not save", error)
        }
    }

    return (
        <div>
            <h1>{details.strMeal}</h1>
            <img src={details.strMealThumb} alt={details.strMeal} />
            <button onClick={handleSave}>Save</button>
            <Link to="/"><button>Back</button></Link>

            <h2>Ingredients</h2>
            {ingredients.map((ingredientLine, index) => (
                <li key={index}>{ingredientLine}</li>
            ))}

            <h2>Instructions</h2>
            {details.strInstructions}
        </div>
    )
}

export default RecipeDetails