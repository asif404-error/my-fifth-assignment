// console.log("Login is loading!");
const CREDENTIALS = { username: "admin", password: "admin123" };

document.getElementById("signInBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showError("Please fill in both fields.");
    return;
  }

  if (username !== CREDENTIALS.username || password !== CREDENTIALS.password) {
    showError("Invalid username or password.");
    return;
  }

  sessionStorage.setItem("isLoggedIn", "true");
  window.location.href = "./index2.html";
});
