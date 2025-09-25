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
            mealId={item.mealId}
            title={item.title}
            thumb={item.thumb}
            onDelete={() => onDelete(item.id)}
          />
        ))
      )}
    </div>
  )
}

export default FavouritePage