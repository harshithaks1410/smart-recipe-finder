console.log("weekly.js loaded");

const data = JSON.parse(localStorage.getItem("calorieData")) || {};
const list = document.getElementById("weeklyList");

const dates = Object.keys(data).sort().slice(-7);

if (dates.length === 0) {
  list.innerHTML = "<li>No calorie data available</li>";
} else {
  dates.forEach(date => {
    const li = document.createElement("li");
    li.innerText = `📅 ${date} : 🔥 ${data[date]} kcal`;
    list.appendChild(li);
  });
}
