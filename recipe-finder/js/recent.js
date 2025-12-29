document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("recentContainer");
  let recent = JSON.parse(localStorage.getItem("recentRecipes")) || [];

  if (recent.length === 0) {
    container.innerHTML = "<p style='text-align:center'>No recent recipes</p>";
    return;
  }

  recent.forEach(r => {

    const card = document.createElement("div");
    card.className = "recent-card";

    card.innerHTML = `
      <img src="${r.image}" class="recent-img">
      <div class="recent-content">
        <h3>${r.title}</h3>
        <button onclick="openRecipe('${r.id}')">View Recipe</button>
      </div>
    `;

    container.appendChild(card);
  });
});

function openRecipe(id) {
  localStorage.setItem("recipeId", id);
  window.location.href = "recipe.html";
}
