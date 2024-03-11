// log out button and event listener 
const logOutBtn = document.querySelector("#logOutBtn");
logOutBtn.addEventListener("click", () => {
  window.location.href = "../../index.html";
  loggedIn = false;
  localStorage.setItem("isLoggedIn", "false");
});


// check if user is logged in
let loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
// console.log(loggedIn);
if (loggedIn === false) { 
  window.location.href = "../../index.html";
} 
