// src/services/airtableService.js

// get all favourites from proxy server
export const getFavourites = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/favourites");
    if (!res.ok) {
      throw new Error("Failed to fetch favourites");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching favourites:", error);
    throw error;
  }
};

// add a new favourite to Airtable through proxy
export const createFavourite = async (fav) => {
  try {
    const res = await fetch("http://localhost:3001/api/favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fav),
    });
    if (!res.ok) {
      throw new Error("Failed to create favourite");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating favourite:", error);
    throw error;
  }
};

// delete a favourite by Airtable record id
export const deleteFavourite = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/api/favourites/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete favourite");
    }
    return await res.json();
  } catch (error) {
    console.error("Error deleting favourite:", error);
    throw error;
  }
};