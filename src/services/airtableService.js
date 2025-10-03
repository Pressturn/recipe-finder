// src/services/airtableService.js

// get reqeust of all favourites from proxy server
const getFavourites = async () => {
  const serverResponse = await fetch("http://localhost:3001/api/favourites");

  if (!serverResponse.ok) {
    throw new Error("Failed to fetch favourites");
  }

  // Parses response to JSON Object
  return await serverResponse.json();
};

// post request to add a new favourite to Airtable
const createFavourite = async (favourite) => {
  const serverResponse = await fetch("http://localhost:3001/api/favourites", {
    method: "POST",
    // header tells the server in JSON format
    headers: { "Content-Type": "application/json" }, 
    // convert object to text because http needs it 
    body: JSON.stringify(favourite),
  });

  if (!serverResponse.ok) {
    throw new Error("Failed to create favourite");
  }

  // Parses response to JSON Object
  return await serverResponse.json();

}

// delete a favourite by Airtable record id
const deleteFavourite = async (airtableId) => {
  const serverResponse = await fetch(`http://localhost:3001/api/favourites/${airtableId}`, {
    method: "DELETE",
  });
  if (!serverResponse.ok) {
    throw new Error("Failed to delete favourite");
  }

  // Parses response to JSON Object
  return await serverResponse.json();
}

export { getFavourites, createFavourite, deleteFavourite }