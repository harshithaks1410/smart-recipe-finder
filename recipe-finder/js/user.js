// ================= USER PERSONALIZATION =================
window.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("username");

    if (!name) {
        document.getElementById("userModal").style.display = "flex";
    } else {
        showWelcome(name);
    }

    // Load dark mode
    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark");
    }
});

// Save user
function saveUser() {
    const input = document.getElementById("usernameInput");
    const name = input.value.trim();

    if (!name) {
        alert("Please enter your name");
        return;
    }

    localStorage.setItem("username", name);
    document.getElementById("userModal").style.display = "none";
    showWelcome(name);
}

// Show welcome text
document.getElementById("welcomeText").innerText =
  "Welcome 👋 to our kitchen | Recommended for you";


// ================= DARK MODE =================
const darkBtn = document.getElementById("darkToggle");

if (darkBtn) {
    darkBtn.onclick = () => {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark") ? "on" : "off"
        );
    };
}
