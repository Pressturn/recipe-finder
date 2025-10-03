const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="

const searchMealsByName = async (searchTerm) => {
    try {
        const mealDbResponse = await fetch(`${BASE_URL}${searchTerm}`)

        if (!mealDbResponse.ok) {
            throw new Error("Failed to fetch meals");
        }

        const mealDbData = await mealDbResponse.json();
        if (!mealDbData.meals) {
            return [];
        }

        return mealDbData.meals
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}

const getMealById = async (mealId) => {
    try {
        const mealDbResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const mealDbData = await mealDbResponse.json()

        if (!mealDbData.meals) {
            return null
        }

        // API returns an array with a single meal object
        return mealDbData.meals[0]
    } catch (error) {
        console.error("Failed to get meal:", error)
        return null
    }
}

export { searchMealsByName, getMealById }