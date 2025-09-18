import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header/Header'
import HomePage from "./pages/HomePage/HomePage"
import FavouritePage from "./pages/FavouritePage/FavouritePage"
import { useState } from 'react'

function App() {
  const [favourites, setFavourites] = useState([])

  function onSave(meal) {
    const fav = {
      id: meal.idMeal,
      title: meal.strMeal,
      thumbnail: meal.strMealThumb,
    }

    setFavourites(prev => {
      prev.some(item => item.id === fav.id) ? prev : [...prev, fav]
      console.log("i have saved to favourite:")
     
    })
  }

  function onDelete(id) {
    setFavourites(prev => prev.filter(item => item.id !== id))
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage onSave={onSave} />
          }
        />

        <Route
          path="/favourites"
          element={
            <FavouritePage
              items={favourites}
              onDelete={onDelete} />
          }
        />
      </Routes>
    </>
  )
}

export default App
