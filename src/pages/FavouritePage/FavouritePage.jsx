import React from 'react'
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { Link } from "react-router-dom"

function FavouritePage({ items, onDelete }) {
  return (
    <div>
      <h1>Favourites</h1>

      {items.length === 0 ? (
        <p>No favourites yet</p>
      ) : (
        <div>
        {items.map(item => (
          <div key={item.id}>
            <RecipeCard
              mealId={item.mealId}
              title={item.title}
              thumb={item.thumb}
              onDelete={() => onDelete(item.id)}
              />

            <div>
              <Link to="/details" state={{ mealId: item.mealId }}>
                <button>View</button>
              </Link>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavouritePage