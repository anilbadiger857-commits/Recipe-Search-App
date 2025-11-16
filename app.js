const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const results = document.getElementById('results');

searchBtn.addEventListener('click', searchRecipe);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipe();
    }
});

async function searchRecipe() {
    const dishName = searchInput.value.trim();
    
    if (!dishName) {
        results.innerHTML = '<p class="no-results">Please enter a dish name</p>';
        return;
    }

    results.innerHTML = '<p class="no-results">Searching...</p>';

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`);
        const data = await response.json();

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            results.innerHTML = '<p class="no-results">No recipes found. Try another dish!</p>';
        }
    } catch (error) {
        results.innerHTML = '<p class="no-results">Error fetching recipes. Please try again.</p>';
        console.error('Error:', error);
    }
}

function displayRecipes(meals) {
    results.innerHTML = '';
    
    meals.forEach(meal => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        
        recipeCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="recipe-info">
                <h2>${meal.strMeal}</h2>
                <span class="category">${meal.strCategory}</span>
                <span class="area">${meal.strArea}</span>
                <div class="instructions">
                    <strong>Instructions:</strong>
                    <p>${meal.strInstructions.substring(0, 200)}...</p>
                </div>
            </div>
        `;
        
        results.appendChild(recipeCard);
    });
}
