console.log("✅ theme.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("darkToggle");
  if (!btn) return;

  const saved = localStorage.getItem("theme") || "dark";
  document.body.classList.add(saved);
  btn.textContent = saved === "dark" ? "🌙" : "☀️";

  btn.onclick = () => {
    const isDark = document.body.classList.contains("dark");
    document.body.classList.toggle("dark", !isDark);
    document.body.classList.toggle("light", isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
    btn.textContent = isDark ? "☀️" : "🌙";
  };
});
