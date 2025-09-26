import React from 'react'

function RecipeCard({ mealId, title, thumb, onSave, onDelete }) {
    function handleSave() {
        const fav = { mealId: mealId, title, thumb: thumb }
        onSave && onSave(fav)
    }

    return (
<>
            <img
                src={thumb}
                alt={title} />
            <p>{title}</p>

            {onSave && <button onClick={handleSave} >Save</button>}
            {onDelete && <button onClick={() => onDelete(mealId)}>Delete</button>}
        </>

    )
}


export default RecipeCard