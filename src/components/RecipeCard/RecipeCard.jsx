function RecipeCard({ mealId, title, thumb, onSave, onDelete, isAlreadySaved }) {
    function handleSave() {
        const favourite = { mealId, title, thumb }
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
                        disabled={isAlreadySaved}
                        className="w-full py-1 px-2 text-sm text-white rounded">
                        {isAlreadySaved ? "Saved" : "Save"} </button>
                )}
                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="w-full py-1 px-2 text-sm text-white rounded"
                    >Delete</button>
                )}
            </div>
        </div >
    )
}


export default RecipeCard