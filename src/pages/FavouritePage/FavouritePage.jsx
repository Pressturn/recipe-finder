import React from 'react'
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { Link } from "react-router-dom"

function FavouritePage({ items, onDelete }) {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Favourite Recipes</h1>

      {items.length === 0 ? (
        <p>You haven't saved any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6 w-full">
          {items.map(item => (
            <div key={item.id} className="rounded-lg shadow-md p-4">
              <RecipeCard
                mealId={item.mealId}
                title={item.title}
                thumb={item.thumb}
                onDelete={() => onDelete(item.id)}
              />



              <div>
                <Link to={`/recipe/${item.mealId}`}>
                  <button className="w-full py-1 px-2 text-sm bg-blue-500 text-white rounded mt-2">
                    View</button>
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