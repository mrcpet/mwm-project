const addHabitsBtn = document.querySelector("#add-button");
const inputField = document.querySelector("#input-field");
const prioDropDown = document.querySelector("#habit-prio");
const listEl = document.querySelector("#habit-list");
let myList = [];

const listFromLocalStorage = JSON.parse(localStorage.getItem("habits"));
let user = "kevin";

if (listFromLocalStorage) {
  myList = listFromLocalStorage;
  renderData(myList);
}

addHabitsBtn.addEventListener("click", () => {
  addAndStoreHabit();
  renderData(myList);
});

function addAndStoreHabit() {
  habit = {};
  habit.title = inputField.value;
  habit.prio = prioDropDown.value;
  myList.push(habit);
  localStorage.setItem("habits", JSON.stringify(myList));
  clearInput(inputField, prioDropDown);
}

function renderData(array) {
  listEl.innerHTML = "";
  array.forEach((habit) => {
    let newLi = document.createElement("li");
    newLi.textContent = habit.title;
    newLi.dataset.title = habit.title;
    newLi.addEventListener("click", () => {
      const foundItem = myList.find((item) => {
        return item.title === habit.title;
      });

      let index = myList.indexOf(foundItem);

      console.log(index);
      //   newLi.remove();
    });
    listEl.append(newLi);
  });
}

function clearInput(input, dropdown) {
  input.value = "";
  dropdown.selectedIndex = 0;
}
