// Globals
const addHabitsBtn = document.querySelector("#add-button");
const inputField = document.querySelector("#input-field");
const prioDropDown = document.querySelector("#habit-prio");
const listEl = document.querySelector("#habit-list");
const sortBtn = document.querySelector("#sort-btn");
const checkboxes = document.querySelectorAll("[name = 'filter']");
let myList = [];
let trueOrFalse = false;

// Kod-block 1
const listFromLocalStorage = JSON.parse(localStorage.getItem("habits"));

if (listFromLocalStorage) {
  myList = listFromLocalStorage;
  renderData(myList);
}

addHabitsBtn.addEventListener("click", () => {
  addAndStoreHabit();
  renderData(myList);
});

sortBtn.addEventListener("click", () => {
  trueOrFalse = !trueOrFalse;
  sortByPrio(myList, trueOrFalse);
});
addCheckboxEventListeners(checkboxes);

// Funktioner
function sortByPrio(array, boolean) {
  let newList;
  if (boolean) {
    newList = array.sort((a, b) => {
      return b.prio - a.prio;
    });
  } else {
    newList = array.sort((a, b) => {
      return a.prio - b.prio;
    });
  }
  renderData(newList);
}

function addAndStoreHabit() {
  let habit = {};
  habit.title = inputField.value;
  habit.prio = prioDropDown.value;
  myList.push(habit);
  updateLocalStorage(myList);
  clearInput(inputField, prioDropDown);
}

function renderData(array) {
  listEl.innerHTML = "";
  array.forEach((habit) => {
    let newLi = document.createElement("li");
    newLi.textContent = habit.title;
    newLi.dataset.title = habit.title;
    newLi.dataset.prio = habit.prio;
    newLi.addEventListener("click", (event) => {
      deleteHabit(event.target.textContent);
      cl(event.target);
    });
    listEl.append(newLi);
  });
}

function cl(a) {
  console.log(a);
}

function deleteHabit(habit) {
  const foundItem = myList.find((item) => item.title === habit);
  let index = myList.indexOf(foundItem);
  myList.splice(index, 1);
  updateLocalStorage(myList);
  renderData(myList);
}

function clearInput(input, dropdown) {
  input.value = "";
  dropdown.selectedIndex = 0;
}
function updateLocalStorage(array) {
  localStorage.setItem("habits", JSON.stringify(array));
}
function addCheckboxEventListeners(checkBoxes) {
  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("change", () => {
      const selectedFilters = document.querySelectorAll(
        "[name='filter']:checked"
      );
      let activeFilters = [];

      selectedFilters.forEach((filter) => {
        activeFilters.push(filter.value);
      });

      // let filteredPokemons = PokedexData.filter((pokemon) => {
      //   return pickedTypes.includes(pokemon.type);
      // });

      // let filteredHabits = myList.filter((habit)=>{
      //   return activeFilters.includes()
      // })

      cl(activeFilters);
    });
  });
}
