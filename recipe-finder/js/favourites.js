const favBox = document.getElementById("favRecipes");
const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

if (favourites.length === 0) {
    favBox.innerHTML = "<p style='text-align:center'>No favourites yet ❤️</p>";
}

favourites.forEach(item => {
    favBox.innerHTML += `
        <div class="recipe-card">
            <img src="${item.image}">
            <h3>${item.title}</h3>
            <button onclick="openRecipe('${item.id}')">View Recipe</button>
            <button onclick="removeFav('${item.id}')">❌ Remove</button>
        </div>
    `;
});

function openRecipe(id) {
    localStorage.setItem("recipeId", id);
    window.location.href = "recipe.html";
}

function removeFav(id) {
    let updated = favourites.filter(f => f.id !== id);
    localStorage.setItem("favourites", JSON.stringify(updated));
    location.reload();
}
