// query selectors containers
const main = document.querySelector("main");
console.log(main);
// query selectors buttons
const calendarBtn = document.querySelector("#calendarBtn");
console.log(calendarBtn)


// event listener calendar button
calendarBtn.addEventListener("click", () => {
    main.innerHTML = "";
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    console.log(year, month, today)
})
