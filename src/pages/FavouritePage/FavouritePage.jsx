import React from 'react'
import RecipeCard from "../../components/RecipeCard/RecipeCard"

function FavouritePage({ items, onDelete }) {
  return (
    <div>
      <h1>Favourites</h1>

      {items.length === 0 ? (
        <p>No favourites yet</p>
      ) : (
        items.map(item => (
          <RecipeCard
            key={item.id}
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            onDelete={() => onDelete(item.id)}
          />
        ))
      )}
    </div>
  )
}

export default FavouritePage