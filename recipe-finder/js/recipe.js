document.addEventListener("DOMContentLoaded", loadRecipe);

/* ======================================================
   LOCAL RECIPE DETAILS (USED IN recipe.html)
====================================================== */
const recipeDetails = {
  // 🌴 SOUTH INDIAN
  local_dosa: {
    name: "Dosa",
    image: "https://images.pexels.com/photos/20422121/pexels-photo-20422121.jpeg",
    calories: 180,
    video: "https://www.youtube.com/results?search_query=dosa+recipe",
    ingredients: [
      "Rice – 2 cups",
      "Urad Dal – ½ cup",
      "Fenugreek – 1 tsp",
      "Salt – to taste",
      "Oil – for cooking"
    ],
    instructions:
      "Soak rice and urad dal for 5–6 hours. Grind into smooth batter and ferment overnight. Heat a tawa, spread batter thin, drizzle oil and cook until crispy."
  },

  local_idli: {
    name: "Idli",
    image: "https://images.pexels.com/photos/8312083/pexels-photo-8312083.jpeg",
    calories: 150,
    video: "https://www.youtube.com/results?search_query=idli+recipe",
    ingredients: [
      "Idli Rice – 2 cups",
      "Urad Dal – 1 cup",
      "Salt – to taste"
    ],
    instructions:
      "Soak rice and dal, grind into batter and ferment overnight. Pour into idli moulds and steam for 10–12 minutes."
  },

  local_vada: {
    name: "Vada",
    image: "https://images.pexels.com/photos/5410401/pexels-photo-5410401.jpeg",
    calories: 220,
    video: "https://www.youtube.com/results?search_query=medu+vada+recipe",
    ingredients: [
      "Urad Dal",
      "Green Chilli",
      "Onion",
      "Oil"
    ],
    instructions:
      "Grind soaked dal into thick batter. Shape vadas and deep fry in hot oil until golden brown."
  },

  local_pongal: {
    name: "Pongal",
    image: "https://images.pexels.com/photos/8472511/pexels-photo-8472511.jpeg",
    calories: 250,
    video: "https://www.youtube.com/results?search_query=pongal+recipe",
    ingredients: [
      "Rice",
      "Moong Dal",
      "Pepper",
      "Ghee"
    ],
    instructions:
      "Cook rice and dal together until soft. Temper with ghee, pepper and cumin. Mix well and serve hot."
  },

  // 🫓 NORTH INDIAN
  local_paneer_butter_masala: {
    name: "Paneer Butter Masala",
    image: "https://media.istockphoto.com/id/1292628327/photo/paneer-tikka-masala-is-a-famous-indian-dish-served-over-a-rustic-wooden-background-selective.jpg",
    calories: 320,
    video: "https://www.youtube.com/results?search_query=paneer+butter+masala+recipe",
    ingredients: [
      "Paneer",
      "Butter",
      "Tomato",
      "Cream",
      "Spices"
    ],
    instructions:
      "Prepare tomato gravy, add butter and spices. Add paneer cubes and cream. Simmer and serve hot with naan."
  },

  local_chole_bhature: {
    name: "Chole Bhature",
    image: "https://media.istockphoto.com/id/1209870678/photo/choley-bhature.jpg",
    calories: 380,
    video: "https://www.youtube.com/results?search_query=chole+bhature+recipe",
    ingredients: [
      "Chickpeas",
      "Onion",
      "Tomato",
      "Spices",
      "Flour"
    ],
    instructions:
      "Cook chickpeas in spicy gravy. Prepare dough and deep fry bhature. Serve hot together."
  },

  
  // 🥤 JUICES
  local_mango_juice: {
    name: "Mango Juice",
    image: "https://media.istockphoto.com/id/1181659429/photo/mango-smoothie-juice-and-fruit-un-drinking-glass-on-wooden-table-in-rustic-kitchen.jpg",
    calories: 140,
    video: "https://www.youtube.com/results?search_query=mango+juice+recipe",
    ingredients: [
      "Mango",
      "Sugar",
      "Water"
    ],
    instructions:
      "Blend mango with sugar and water. Serve chilled."
  },

  local_orange_juice: {
    name: "Orange Juice",
    image: "https://media.istockphoto.com/id/915657126/photo/orange-juice-glass-jar-shot-on-rustic-wooden-table.jpg",
    calories: 110,
    video: "https://www.youtube.com/results?search_query=orange+juice+recipe",
    ingredients: [
      "Fresh Oranges",
      "Sugar (optional)",
      "Ice cubes"
    ],
    instructions:
      "Extract juice from oranges, add sugar if required and serve fresh."
  },

  
};

/* ======================================================
   LOAD RECIPE
====================================================== */
function loadRecipe() {
  const id = localStorage.getItem("recipeId");
  const box = document.getElementById("recipeDetails");
  if (!id || !box) return;

  if (recipeDetails[id]) {
    const r = recipeDetails[id];
    box.innerHTML = buildHTML(id, r);
    applyRatings();
    return;
  }

  // API fallback
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      const m = data.meals[0];
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        if (m[`strIngredient${i}`]) {
          ingredients.push(m[`strIngredient${i}`]);
        }
      }

      box.innerHTML = buildHTML(id, {
        name: m.strMeal,
        image: m.strMealThumb,
        calories: 240,
        ingredients,
        instructions: m.strInstructions,
        video: m.strYoutube
      });

      applyRatings();
    });
}

/* ======================================================
   HTML BUILDER
====================================================== */
function buildHTML(id, r) {
  return `
    <div class="detail-img-wrapper">
  <img src="${image}" class="detail-img">
</div>

    <h2>${r.name}</h2>

    <div class="stars" data-id="${id}">
      ${[1,2,3,4,5].map(i =>
        `<span onclick="rateRecipe('${id}',${i})">★</span>`
      ).join("")}
    </div>

    <div class="nutrition-box">
      🔥 Calories: <b>${r.calories} kcal</b>
      <button onclick="addToCalories(${r.calories})">
        ➕ Add to Today’s Calories
      </button>
    </div>

    <h3>🧺 Ingredients</h3>
    <ul>${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>

    <h3>📖 Instructions</h3>
    <p>${r.instructions}</p>

    <a href="${r.video}" target="_blank" class="video-btn">
      ▶ Watch Cooking Video
    </a>
  `;
}

/* ======================================================
   RATINGS
====================================================== */
function rateRecipe(id, rating) {
  let ratings = JSON.parse(localStorage.getItem("ratings")) || {};
  ratings[id] = rating;
  localStorage.setItem("ratings", JSON.stringify(ratings));
  applyRatings();
}

function applyRatings() {
  const ratings = JSON.parse(localStorage.getItem("ratings")) || {};
  document.querySelectorAll(".stars").forEach(div => {
    const id = div.dataset.id;
    [...div.children].forEach((star, i) => {
      star.style.color = i < (ratings[id] || 0) ? "gold" : "#ccc";
    });
  });
}

/* ======================================================
   CALORIES
====================================================== */
function addToCalories(cal) {
  const day = new Date().toISOString().slice(0, 10);
  let data = JSON.parse(localStorage.getItem("calorieData")) || {};
  data[day] = (data[day] || 0) + cal;
  localStorage.setItem("calorieData", JSON.stringify(data));
  alert("Calories added 🔥");
}
