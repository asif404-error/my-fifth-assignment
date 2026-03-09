// console.log("Login is loading!");
const credentials = { username: "admin", password: "admin123" };

document.getElementById("signInBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showError("Please fill in both fields.");
    return;
  }

  if (username !== credentials.username || password !== credentials.password) {
    showError("Invalid username or password.");
    return;
  }

  sessionStorage.setItem("isLoggedIn", "true");
  window.location.href = "./index2.html";
});

function showError(message) {
  let error = document.getElementById("errorMsg");
  if (!error) {
    error = document.createElement("p");
    error.id = "errorMsg";
    error.className = "text-xs text-red-500 text-center mt-3";
    document
      .getElementById("signInBtn")
      .insertAdjacentElement("afterend", error);
  }
  error.textContent = message;
}