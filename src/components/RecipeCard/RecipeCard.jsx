import React from 'react'

function RecipeCard({ id, title, thumbnail, onSave, onDelete }) {

    return (
        <div>
            <img
                src={thumbnail}
                alt={title} />
            <p>{title}</p>

            {onSave && <button onClick={() => onSave({ id, title, thumbnail })}>Save</button>}

            {onDelete && <button onClick={() => onDelete(id)}>Delete</button>}

        </div>
    )
}


export default RecipeCard