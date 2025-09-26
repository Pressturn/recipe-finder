const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="

async function searchMealsByName(searchTerm) {

    try {
        const response = await fetch(`${BASE_URL}${searchTerm}`)

        if (!response.ok) {
            throw new Error("Failed to fetch meals");
        }

        const data = await response.json();
        if (!data.meals) {
            return [];
        }

        return data.meals
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}

export { searchMealsByName }