import React from 'react'
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import { Link } from "react-router-dom"

function FavouritePage({ favourites, onDelete }) {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Favourite Recipes</h1>

      {favourites.length === 0 ? (
        <p>You haven't saved any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6 w-full">
          {favourites.map(favourite => (
            <div key={favourite.id} className="rounded-lg shadow-md p-4">
              <RecipeCard
                mealId={favourite.mealId}
                title={favourite.title}
                thumb={favourite.thumb}
                onDelete={() => onDelete(favourite.id)}
              />



              <div>
                <Link to={`/recipe/${favourite.mealId}`}>
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