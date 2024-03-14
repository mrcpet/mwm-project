// Globals & DOM-elements
const addHabitsBtn = document.querySelector("#add-button");
const inputField = document.querySelector("#input-field");
const prioDropDown = document.querySelector("#habit-prio");
const listEl = document.querySelector("#habit-list");
const sortPrioBtn = document.querySelector("#sort-prio-btn");
const sortStreakBtn = document.querySelector("#sort-streak-btn");
const checkboxes = document.querySelectorAll("[name = 'filter']");
const plusBtn = document.querySelector("#plus-sign");
const refreshBtn = document.querySelector("#refresh-sign");
const removeBtn = document.querySelector("#trash-can");
const closeBtn = document.querySelector("#close-sign");
const listFromLocalStorage = JSON.parse(localStorage.getItem("habits"));
const welcomeTitle = document.querySelector("#welcome-title");
// const setUser = setCurrentUser("wille"); // måste vara string, ska kommenteras ut senare.
const username = getCurrentUser(); // localStorage.getItem("currentUser");
let myList = [];
let myFilterList = [];
let booleanForSorting = false;
let booleanForCheckingFilters = false;
let selectedHabitId = null;
let listFilteredByUSer = [];
// Kod
//välkomst text
welcomeTitle.textContent = `Daily Habits of ${username}`;

// Kolla localStorage och kolla om det finns något och om så rendera ut info.
if (listFromLocalStorage) {
  myList = listFromLocalStorage;
  renderData(myList);
}

addHabitsBtn.addEventListener("click", () => {
  addAndStoreHabit();
  renderData(myList);
});

sortPrioBtn.addEventListener("click", () => {
  booleanForSorting = !booleanForSorting;
  const listToSort = booleanForCheckingFilters ? myFilterList : myList;
  sortByPrio(listToSort, booleanForSorting);
});
sortStreakBtn.addEventListener("click", () => {
  booleanForSorting = !booleanForSorting;
  const listToSort = booleanForCheckingFilters ? myFilterList : myList;
  sortByStreak(listToSort, booleanForSorting);
});

addCheckboxEventListeners(checkboxes);

addFunctionToActionBar(plusBtn, refreshBtn, removeBtn, closeBtn);

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
  renderData(newList);
}
function sortByStreak(array, boolean) {
  let newList = [];
  if (boolean) {
    newList = array.sort((a, b) => {
      return b.streak - a.streak;
    });
  } else {
    newList = array.sort((a, b) => {
      return a.streak - b.streak;
    });
  }
  renderData(newList);
}

function addAndStoreHabit() {
  let habit = {};
  habit.user = username;
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
  listFilteredByUSer = filterArrayByUser(array, username);
  listFilteredByUSer.forEach((habit) => {
    let prioMsg = setPrioWithNumber(habit.prio);
    let newLi = document.createElement("li");
    newLi.innerHTML = `${habit.title} Streak: ${habit.streak} Prio: ${prioMsg}`;
    newLi.dataset.prio = habit.prio;
    newLi.dataset.id = habit.id;
    newLi.dataset.user = habit.user;

    if (habit.id === selectedHabitId) {
      newLi.classList.add("selected");
    }

    newLi.addEventListener("click", (event) => {
      selectHabit(event);
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
function filterArrayByUser(array, username) {
  return array.filter((item) => {
    return item.user === username;
  });
}
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}
function setCurrentUser(name) {
  localStorage.setItem("currentUser", name);
}
function selectHabit(elem) {
  let selected = elem.target;
  selectedHabitId = selected.dataset.id;
  selected.classList.add("selected");
  let siblings = findSiblings(selected);
  siblings.forEach((sibling) => {
    sibling.classList.remove("selected");
  });
  OpenOrCloseActionBar(true);
}
function findSiblings(elem) {
  return Array.from(elem.parentNode.children).filter((sibling) => {
    return sibling !== elem;
  });
}
function OpenOrCloseActionBar(boolean) {
  let actionBar = document.querySelector(".action-container");
  boolean
    ? actionBar.classList.remove("hidden")
    : actionBar.classList.add("hidden");
}
function findSelected() {
  let selected = document.querySelector(".selected");
  return selected;
}
function refreshStreak(array, index) {
  array[index].streak = 0;
  updateLocalStorage(array);
  renderData(array);
}
function minusStreak(array, index) {
  array[index].streak--;
  updateLocalStorage(array);
  renderData(array);
}

function addFunctionToActionBar(plus, refresh, remove, close) {
  plus.addEventListener("click", handlePlus);
  refresh.addEventListener("click", handleRefresh);
  remove.addEventListener("click", handleRemove);
  close.addEventListener("click", handleClose);
}

function handlePlus() {
  const selectedHabit = findSelected();
  let index = findIndex(selectedHabit.dataset.id);
  updateStreak(myList, index);
}

function handleRefresh() {
  const selectedHabit = findSelected();
  let index = findIndex(selectedHabit.dataset.id);
  refreshStreak(myList, index);
}

function handleRemove() {
  const selectedHabit = findSelected();
  deleteHabit(selectedHabit.dataset.id);
  OpenOrCloseActionBar(!listFilteredByUSer.length === 0);
}

function handleClose() {
  OpenOrCloseActionBar(false);
}
function setPrioWithNumber(number) {
  let output;
  switch (number) {
    case "1":
      output = "Low";
      break;
    case "2":
      output = "Medium";
      break;
    case "3":
      output = "High";
      break;
    default:
      output = "unknown"; // kommer nog ej behövas
  }
  return output;
}
