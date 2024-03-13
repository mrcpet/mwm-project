// check if user is logged in
let loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
// console.log(loggedIn);
if (loggedIn === true) {
  // query selectors containers
  const quoteContainer = document.querySelector(".quoteContainer  ");
  const welcomeMessage = document.querySelector("#welcomeMessage");

  // query selectors buttons
  const logOutBtn = document.querySelector("#logOutBtn");

  // render quote function
  const renderQuote = (quote) => {
    quoteContainer.innerHTML = `<blockquote>&ldquo;${quote.quote}&rdquo; &mdash; <footer>${quote.author}</footer></blockquote>`;
  };
  // function to greet user
  const greetUser = (user) => {
    welcomeMessage.textContent = `Welcome ${user}!`;
  };
  // get current user from localstorage and greet tehem
  let currentUser = localStorage.getItem("currentUser");
  greetUser(currentUser);

  // get quote function
  const getQuote = async () => {
    const response = await axios.get("https://api.quotable.io/random");
    const results = await response.data;
    //save quote in an object
    let quote = {
      quote: results.content,
      author: results.author,
    };
    renderQuote(quote);
  };
  // render a quote when page loads
  getQuote();

  logOutBtn.addEventListener("click", () => {
    window.location.href = "../../index.html";
    loggedIn = false;
    localStorage.setItem("isLoggedIn", "false");
  });
} else {
  window.location.href = "../../index.html";
}
