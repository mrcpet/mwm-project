// query selectors buttons
const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");
const registerUserBtn = document.querySelector("#registerUserBtn");

// query selectors user input
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const registerUser = document.querySelector("#registerUser");
const registerPassword = document.querySelector("#registerPassword");

// query selectors containers
const registerModal = document.querySelector("#registerModal");
const overlayContainer = document.querySelector(".overlayContainer");
const errorMessage = document.querySelector(".error-message");

// array to store users and parse users stored in localstorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// create new user object function
const newUser = (username, password) => {
  return {
    username,
    password,
  };
};

// function to validate user
const validateUser = (array, username, password) => {
  array.forEach((user) => {
    if (user.username === username && user.password === password) {
      //redirect to startpage on success
      window.location.href = "assets/html/startpage.html";
      console.log(username);
      localStorage.setItem("currentUser", username);
    } else {
      //placeholder message if user does not exist
      failedLogin();
    }
  });
};

// function to register user, store user object in array and add to local storage
const storeUser = () => {
  if (registerUser.value != "" && registerPassword.value != "") {
    let user = newUser(registerUser.value, registerPassword.value);
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    registerModal.classList.toggle("hidden");
    overlayContainer.classList.toggle("overlay");
    registerUser.value = "";
    registerPassword.value = "";
  }
};

// function to render failed login attempt message
const failedLogin = () => {
  errorMessage.innerHTML = "";
  let p = document.createElement("p");
  p.innerText = `Login attempt failed!`;
  errorMessage.append(p);
};

// login button event listener
loginBtn.addEventListener("click", () => {
  // check if there are registered users
  if (users.length >= 1) {
    validateUser(users, usernameInput.value, passwordInput.value);
  } else {
    failedLogin();
  }
});

// event listener to login using enter key
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && registerModal.classList.contains("hidden")) {
    if (users.length >= 1) {
      validateUser(users, usernameInput.value, passwordInput.value);
    } else {
      failedLogin();
    }
  } else if (
    event.key === "Enter" &&
    !registerModal.classList.contains("hidden")
  ) {
    storeUser();
  }
});

//register button event listener
registerBtn.addEventListener("click", () => {
  registerModal.classList.toggle("hidden");
  overlayContainer.classList.toggle("overlay");
});

// close modal button event listener
closeModalBtn.addEventListener("click", () => {
  registerModal.classList.toggle("hidden");
  overlayContainer.classList.toggle("overlay");
});

// register new user event listener
registerUserBtn.addEventListener("click", () => {
  storeUser();
});
