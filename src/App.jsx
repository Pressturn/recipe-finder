import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header/Header'
import HomePage from "./pages/HomePage/HomePage"
import FavouritePage from "./pages/FavouritePage/FavouritePage"
import { useState } from 'react'

function App() {
  const [favourites, setFavourites] = useState([])

  function addFavourite(meal) {
    const fav = {
      id: meal.idMeal,
      title: meal.strMeal,
      thumbnail: meal.strMealThumb,
    }

  setFavourites(prev =>
    prev.some(item => item.id === fav.id) ? prev : [...prev, fav]
  )
}

function removeFavourite(id) {
  setFavourites(prev => prev.filter(item => item.id !== id))
}

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage onAdd={addFavourite} />
          }
        />

        <Route
          path="/favourites"
          element={
            <FavouritePage
              items={favourites}
              onDelete={removeFavourite} />
          }
        />
      </Routes>
    </>
  )
}

export default App
