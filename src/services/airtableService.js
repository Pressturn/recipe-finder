// src/services/airtableService.js

// get all favourites from proxy server
export const getFavourites = async () => {
    const res = await fetch("http://localhost:3001/api/favourites");

    if (!res.ok) {
      throw new Error("Failed to fetch favourites");
    }

    return await res.json();
};

// add a new favourite to Airtable through proxy
export const createFavourite = async (fav) => {
    const res = await fetch("http://localhost:3001/api/favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fav),
    });

    if (!res.ok) {
      throw new Error("Failed to create favourite");
    }

    return await res.json();

  }

// delete a favourite by Airtable record id
export const deleteFavourite = async (id) => {
    const res = await fetch(`http://localhost:3001/api/favourites/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete favourite");
    }
    return await res.json();
  }