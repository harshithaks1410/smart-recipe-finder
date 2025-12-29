function register() {
  const user = document.getElementById("regUsername").value.trim();
  const pass = document.getElementById("regPassword").value.trim();

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ user, pass }));
  alert("Registration successful ✅");
}

function login() {
  const userInput = document.getElementById("loginUsername").value;
  const passInput = document.getElementById("loginPassword").value;

  const saved = JSON.parse(localStorage.getItem("user"));

  if (!saved) {
    alert("No account found. Please register.");
    return;
  }

  if (userInput === saved.user && passInput === saved.pass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials ❌");
  }
}

function showRegister() {
  document.getElementById("registerBox").style.display = "block";
}
