console.log("calories.js loaded");

const data = JSON.parse(localStorage.getItem("calorieData")) || {};
const today = new Date().toISOString().split("T")[0];

const todayCaloriesEl = document.getElementById("todayCalories");

todayCaloriesEl.innerText =
  data[today] ? data[today] + " kcal" : "0 kcal";

function resetToday() {
  if (data[today]) {
    delete data[today];
    localStorage.setItem("calorieData", JSON.stringify(data));
    todayCaloriesEl.innerText = "0 kcal";
    alert("Today's calories reset 🔄");
  }
}
