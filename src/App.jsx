import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import FavouritePage from "./pages/FavouritePage/FavouritePage";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import { useState, useEffect } from "react";
import { getFavourites, createFavourite, deleteFavourite, } from "./services/airtableService";

function App() {
  const [favourites, setFavourites] = useState([]);

  // Load favourites when app starts
  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      const data = await getFavourites();

      // Convert Airtable format to a simple array.
      const items = data.records ?
        data.records.map((record) => ({
          airtableId: record.id,
          ...record.fields
        }))
        :
        data;

      setFavourites(items)
    } catch (error) {
      setFavourites([])
      console.error("Failed to load favourites:", error);
    }
  };

  // Add a recipe to favourites
  const addFavourite = async (meal) => {
    try {
      const result = await createFavourite(meal)
      const newFavourite = { airtableId: result.id, ...result.fields }
      setFavourites((prev) => [...prev, newFavourite])
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  }

  function isAlreadySaved(mealId) {
    return favourites.some(fav => fav.mealId === mealId)
  }

  // Remove a recipe from favourites
  const removeFavourite = async (airtableId) => {
    try {
      await deleteFavourite(airtableId)
      setFavourites((prev) => prev.filter((item) => item.airtableId !== airtableId))
    } catch (error) {
      console.error("Failed to delete favourite:", error)
    }
  };

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSave={addFavourite}
                favourites={favourites}
                isAlreadySaved={isAlreadySaved} />}
          />
          <Route
            path="/favourites"
            element={
              <FavouritePage
                favourites={favourites}
                onDelete={removeFavourite} />}
          />
          <Route
            path="/recipe/:mealId"
            element={
              <RecipeDetails
                onSave={addFavourite}
                favourites={favourites}
                isAlreadySaved={isAlreadySaved} />}
          />
        </Routes>
      </main>
    </div >
  )
}

export default App;