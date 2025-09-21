import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header/Header'
import HomePage from "./pages/HomePage/HomePage"
import FavouritePage from "./pages/FavouritePage/FavouritePage"
import { useState } from 'react'

function App() {
  const [favourites, setFavourites] = useState([])

   function onSave(fav) {
    setFavourites(prev => {
      const next = prev.some(item => item.id === fav.id) ? prev : [...prev, fav]
      return next
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
            <HomePage 
            onSave={onSave}
            favourites={favourites} />
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
