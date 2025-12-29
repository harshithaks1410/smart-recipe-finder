console.log("✅ search.js loaded");

/* ================= SEARCH FUNCTION ================= */

function searchRecipe() {
  const input = document.getElementById("query").value;
  const query = input.trim().toLowerCase();
  const container = document.getElementById("recipes");

  container.innerHTML = "";

  if (!query) {
    alert("Please enter a recipe name");
    return;
  }

  const foodType =
    document.querySelector('input[name="foodType"]:checked')?.value || "all";

  const region =
    document.querySelector('input[name="region"]:checked')?.value || "all";

  let results = [];

  /* ================= LOCAL RECIPES ================= */
  localIndianRecipes.forEach(meal => {
    const mealName = meal.strMeal.toLowerCase();

    const nameMatch =
      mealName.includes(query) ||
      query.includes(mealName) ||
      mealName.split(" ").some(w => w.startsWith(query));

    const vegMatch =
      foodType === "all" ||
      (foodType === "veg" && meal.strCategory === "Vegetarian") ||
      (foodType === "nonveg" && meal.strCategory !== "Vegetarian");

    const regionMatch =
      region === "all" ||
      (region === "south" && meal.strArea === "South Indian") ||
      (region === "north" && meal.strArea === "North Indian");

    if (nameMatch && vegMatch && regionMatch) {
      results.push(meal);
    }
  });

  /* ================= API RECIPES ================= */
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.meals) {
        data.meals.forEach(meal => {
          // 👇 API veg/non-veg logic
          const isVegAPI =
            meal.strCategory === "Vegetarian" ||
            meal.strCategory === "Dessert" ||
            meal.strCategory === "Side";

          const vegMatch =
            foodType === "all" ||
            (foodType === "veg" && isVegAPI) ||
            (foodType === "nonveg" && !isVegAPI);

          if (vegMatch) {
            results.push(meal);
          }
        });
      }

      renderResults(results);
    })
    .catch(() => {
      renderResults(results);
    });
}

/* ================= RENDER ================= */
function renderResults(meals) {
  const container = document.getElementById("recipes");

  if (meals.length === 0) {
    container.innerHTML = "<p>No recipes found 😔</p>";
    return;
  }

  const seen = new Set();

  meals.forEach(meal => {
    const key = meal.strMeal.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);

    container.innerHTML += `
      <div class="recipe-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>

        <button onclick="openRecipe('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')">
          👁 View Recipe
        </button>
      </div>
    `;
  });
}

/* ================= OPEN DETAILS ================= */
function openRecipe(id, name, img) {
  let recent = JSON.parse(localStorage.getItem("recentRecipes")) || [];

  recent = recent.filter(r => r.id !== id);
  recent.unshift({ id, name, img });
  recent = recent.slice(0, 10);

  localStorage.setItem("recentRecipes", JSON.stringify(recent));
  localStorage.setItem("recipeId", id);

  window.location.href = "recipe.html";
}

/* ================= NAVIGATION ================= */
function goToFavourites() {
  window.location.href = "favourites.html";
}

function goToRecent() {
  window.location.href = "recent.html";
}
