import React from 'react'

function RecipeCard({ mealId, title, thumb, onSave, onDelete }) {
    function handleSave() {
        const favourite = { mealId: mealId, title, thumb: thumb }
        onSave(favourite)
    }

    return (
        <div>
            <img
                src={thumb}
                alt={title}
                className="w-full h-32 object-cover rounded mb-3"
            />
            <h3>{title}</h3>

            <div className="recipe-buttons">
                {onSave && (
                    <button
                        onClick={handleSave}
                        className="w-full py-1 px-2 text-sm bg-green-500 text-white rounded"
                    >Save</button>
                )}
                {onDelete && (
                    <button
                        onClick={() => onDelete(mealId)}
                        className="w-full py-1 px-2 text-sm bg-red-500 text-white rounded"

                    >Delete</button>
                )}
            </div>
        </div>
    )
}


export default RecipeCard