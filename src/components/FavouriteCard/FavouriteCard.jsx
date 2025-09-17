import React from 'react'

function FavouriteCard({ id, title, thumbnail, onDelete }) {
    function handleDeleteClick() {
        if (onDelete)
            onDelete(id)
    }

    return (
        <div>
            <img
                src={thumbnail}
                alt={title}
            />
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}

export default FavouriteCard