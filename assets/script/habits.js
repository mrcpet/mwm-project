// Globals
const addHabitsBtn = document.querySelector("#add-button");
const inputField = document.querySelector("#input-field");
const prioDropDown = document.querySelector("#habit-prio");
const listEl = document.querySelector("#habit-list");
const sortBtn = document.querySelector("#sort-btn");
const checkboxes = document.querySelectorAll("[name = 'filter']");
const listFromLocalStorage = JSON.parse(localStorage.getItem("habits"));
let myList = [];
let myFilterList = [];
let booleanForSorting = false;
let booleanForCheckingFilters = false;

// Kod

if (listFromLocalStorage) {
  myList = listFromLocalStorage;
  renderData(myList);
}

addHabitsBtn.addEventListener("click", () => {
  addAndStoreHabit();
  renderData(myList);
});

sortBtn.addEventListener("click", () => {
  booleanForSorting = !booleanForSorting;
  const listToSort = booleanForCheckingFilters ? myFilterList : myList;
  sortByPrio(listToSort, booleanForSorting);
});

addCheckboxEventListeners(checkboxes);

// ---------------------------------------Funktioner ----------------------------------------

function sortByPrio(array, boolean) {
  let newList = [];
  if (boolean) {
    newList = array.sort((a, b) => {
      return b.prio - a.prio;
    });
  } else {
    newList = array.sort((a, b) => {
      return a.prio - b.prio;
    });
  }
  cl(newList);
  renderData(newList);
}

function addAndStoreHabit() {
  let habit = {};
  habit.title = inputField.value;
  habit.prio = prioDropDown.value;
  habit.streak = 0;
  habit.id = crypto.randomUUID();
  myList.push(habit);
  updateLocalStorage(myList);
  clearInput(inputField, prioDropDown);
  uncheckerOfBoxes(true);
}

function renderData(array) {
  listEl.innerHTML = "";
  array.forEach((habit) => {
    let newLi = document.createElement("li");
    newLi.innerHTML = `${habit.title} ${habit.streak}`;
    newLi.dataset.prio = habit.prio;
    newLi.dataset.id = habit.id;
    newLi.addEventListener("click", (event) => {
      let index = findIndex(event.target.dataset.id);
      updateStreak(myList, index);
    });
    newLi.addEventListener("dblclick", (event) => {
      deleteHabit(event.target.dataset.id);
      // cl(event.target.dataset.id);
    });
    listEl.append(newLi);
  });
}

function cl(a) {
  console.log(a);
}

function deleteHabit(idFromElement) {
  let index = findIndex(idFromElement);
  myList.splice(index, 1);
  updateLocalStorage(myList);
  renderData(myList);
  uncheckerOfBoxes(myList.length === 0);
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
      // Om inga checkBoxes är valda visa samtliga Habits.
      if (selectedFilters.length === 0) {
        booleanForCheckingFilters = false;
        renderData(myList);
      } else {
        booleanForCheckingFilters = true;
        let activeFilters = [];
        selectedFilters.forEach((filter) => {
          activeFilters.push(filter.value);
        });

        myFilterList = myList.filter((habit) => {
          return activeFilters.includes(habit.prio);
        });
        renderData(myFilterList);
      }
      cl(booleanForCheckingFilters);
    });
  });
}
function uncheckerOfBoxes(boolean) {
  if (boolean) {
    document.querySelectorAll("[name = 'filter']").forEach((box) => {
      box.checked = false;
    });
  }
}
function findIndex(id) {
  const foundItem = myList.find((item) => item.id === id);
  let index = myList.indexOf(foundItem);
  return index;
}
function updateStreak(array, index) {
  array[index].streak++;
  updateLocalStorage(array);
  renderData(array);
}
