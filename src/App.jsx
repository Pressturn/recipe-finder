import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header/Header'
import HomePage from "./components/HomePage/HomePage"
import FavouritePage from "./components/FavouritePage/FavouritePage"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/favourites" element={<FavouritePage />} />
      </Routes>
    </>
  )
}

export default App
