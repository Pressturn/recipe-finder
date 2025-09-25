import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import FavouritePage from "./pages/FavouritePage/FavouritePage";
import { useState, useEffect } from "react";
import { getFavourites, createFavourite, deleteFavourite, } from "./services/airtableService";

function App() {
  const [favourites, setFavourites] = useState([]);

  const loadFavourites = async () => {
    try {
      const data = await getFavourites();

      // Airtable returns { records: [...] }. Convert to a simple array.
      const items = data.records
        ? data.records.map((record) => ({ id: record.id, ...record.fields }))
        : data;

      setFavourites(items);
    } catch (error) {
      console.error("Failed to load favourites:", error);
    }
  };

const addFavourite = async (meal) => {
  const mealId = meal.mealId;
  const title = meal.title;
  const thumb = meal.thumb;

  try {
    const result = await createFavourite({ mealId, title, thumb });
    // Airtable responds with { id, fields: {...} }
    const newItem = { id: result.id, ...result.fields };

    setFavourites((prev) => [...prev, newItem]);
  } catch (error) {
    console.error("Error adding meal:", error);
  }
};

  const removeFavourite = async (id) => {
    try {
      await deleteFavourite(id);
      setFavourites((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete favourite:", error);
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage onSave={addFavourite} favourites={favourites} />}
        />
        <Route
          path="/favourites"
          element={<FavouritePage items={favourites} onDelete={removeFavourite} />}
        />
      </Routes>
    </>
  );
}

export default App;