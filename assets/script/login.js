const registerBtn = document.querySelector("#registerBtn");
console.log(registerBtn);
const registerModal = document.querySelector("#registerModal");
console.log(registerModal);
const overlayContainer = document.querySelector(".overlayContainer");
const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", () => {
  window.location.href = "assets/html/startpage.html";
});
registerBtn.addEventListener("click", () => {
  registerModal.classList.toggle("hidden");
  overlayContainer.classList.toggle("overlay");
});
