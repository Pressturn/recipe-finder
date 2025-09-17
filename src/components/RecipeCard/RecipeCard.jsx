import React from 'react'

function RecipeCard({ id, title, thumbnail, onSave }) {
    function handleClick() {
        if (onSave)
            onSave({ id, title, thumbnail })
    }

    return (
        <div>
            <img
                src={thumbnail}
                alt={title} />
            <p>{title}</p>
            <button onClick={handleClick}>Save</button>
        </div>
    )
}


export default RecipeCard