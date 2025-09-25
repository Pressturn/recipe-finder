import React from 'react'

function RecipeCard({ mealId, title, thumb, onSave, onDelete }) {
    function handleSave() {
        const fav = { mealId: mealId, title, thumb: thumb }
        console.log("recipe card check", fav)
        onSave && onSave(fav)
    }

    return (
        <div>
            <img
                src={thumb}
                alt={title} />
            <p>{title}</p>

            {onSave && <button onClick={handleSave} >Save</button>}

            {onDelete && <button onClick={() => onDelete(mealId)}>Delete</button>}

        </div>
    )
}


export default RecipeCard