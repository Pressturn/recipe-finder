// src/services/airtableService.js

// get all favourites from proxy server
const getFavourites = async () => {
  const response = await fetch("http://localhost:3001/api/favourites");

  if (!response.ok) {
    throw new Error("Failed to fetch favourites");
  }

  // Parses JSON
  return await response.json();
};

// add a new favourite to Airtable through proxy
const createFavourite = async (favourite) => {
  const response = await fetch("http://localhost:3001/api/favourites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(favourite),
  });

  if (!response.ok) {
    throw new Error("Failed to create favourite");
  }

  // Parses JSON
  return await response.json();

}

// delete a favourite by Airtable record id
const deleteFavourite = async (id) => {
  const response = await fetch(`http://localhost:3001/api/favourites/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete favourite");
  }

  // Parses JSON
  return await response.json();
}

export { getFavourites, createFavourite, deleteFavourite }