
// Definiera todos globalt
let arrayTodos = [];

// Funktion för att rendera en todo
let renderTodo = (todo) => {

    // Skapa ett nytt <li> element för den nya todo
    let todoItem = document.createElement("li");
    todoItem.textContent = todo.name;
    todoItem.classList.add("todo-item");

    // Lägg till <li> i listan av todos
    let todoList = document.getElementById("todoList");
    todoList.appendChild(todoItem);

    // Skapa checkbox-spannet
    let spanStatus = document.createElement("span");
    spanStatus.classList.add("span-status");

    // Skapa ett <i>-element för ikonen
    let checkedIcon = document.createElement("i");
    checkedIcon.classList.add("fas", "fa-check-square"); // För markerad (checked) ruta
    let uncheckedIcon = document.createElement("i");
    uncheckedIcon.classList.add("far", "fa-square"); // För omarkerad (unchecked) ruta

    // Visa antingen checkedIcon eller uncheckedIcon baserat på todo.completed
    if (todo.completed) {
        checkedIcon.style.display = "inline-block";
        uncheckedIcon.style.display = "none";
    } else {
        checkedIcon.style.display = "none";
        uncheckedIcon.style.display = "inline-block";
    }

    // Lägg till ikonerna i spanStatus
    spanStatus.appendChild(checkedIcon);
    spanStatus.appendChild(uncheckedIcon);

    // Lägg till klickhändelsen för att växla mellan checked och unchecked
    spanStatus.addEventListener('click', () => {
        // Ändra completed-egenskapen för todo
        todo.completed = !todo.completed;

        // Uppdatera ikonerna baserat på todo.completed
        if (todo.completed) {
            checkedIcon.style.display = "inline-block";
            uncheckedIcon.style.display = "none";
        } else {
            checkedIcon.style.display = "none";
            uncheckedIcon.style.display = "inline-block";
        }

        // Spara listan med todos i localStorage
        saveTodosToLocalStorage();

    });

    // Lägg till spanStatus i todoItem
    todoItem.appendChild(spanStatus);
};

// Funktion för att spara todos i localStorage
let saveTodosToLocalStorage = (todo) => {
    localStorage.setItem('todos', JSON.stringify(arrayTodos));
};

// Funktion för att hämta sparade todos från localStorage
let getSavedTodos = () => {
    const savedTodosJSON = localStorage.getItem('todos');
    return savedTodosJSON ? JSON.parse(savedTodosJSON) : [];
};

// Funktion för att ladda todos när sidan laddas
let loadTodos = () => {
    arrayTodos = getSavedTodos();// Uppdatera arrayTodos med de sparade todos
    console.log(arrayTodos);
    arrayTodos.forEach(todo => {
        renderTodo(todo);
    });
};

// Funktion för att skapa en ny todo
let createTodo = () => {
    let createTodoBtn = document.getElementById("icon_addtodo");
    let containerCategory = document.getElementById("container-category");
    createTodoBtn.addEventListener('click', () => {
        // Göm kategoriväljaren

        containerCategory.style.display = 'none';

        // Visa inputfälten för att skapa en ny todo
        showElement("todoInput");

        // Rensa inputfälten och select-fältet
        document.getElementById("todoName").value = "";
        document.getElementById("todoCategory").selectedIndex = 0;
        document.getElementById("todoDeadline").value = "";
        document.getElementById("todoDuration").value = "";
    });
};

createTodo();



// Funktion för att spara en ny todo
let saveTodo = () => {
    let addTodoBtn = document.getElementById("addTodoButton");
    addTodoBtn.addEventListener('click', () => {
        // Hämta värdena från inputfälten för den nya todo
        let todo = {
            name: document.getElementById("todoName").value,
            category: document.getElementById("todoCategory").value,
            deadline: document.getElementById("todoDeadline").value,
            duration: document.getElementById("todoDuration").value,
            completed: false
        };



        // Rendera den nya todo
        renderTodo(todo);

        arrayTodos.push(todo);
        console.log(arrayTodos);

        // Spara alla todos i localStorage
        saveTodosToLocalStorage();

        // Visa listan med todos och dölj input-fältet 
        showElement("container-todos");
    });
};

saveTodo();

// Funktion som körs för att städa upp tidigare visade element och ersättas av det nya 
// elementet
let lastVisibleElement = null;

function showElement(elementId) {
    // Dölj det senast visade elementet, om det finns ett
    if (lastVisibleElement !== null) {
        lastVisibleElement.style.display = 'none';
    }

    // Visa det nya elementet
    let elementToShow = document.getElementById(elementId);
    if (elementToShow) {
        elementToShow.style.display = 'block';
        // Uppdatera referensen till det senast visade elementet
        lastVisibleElement = elementToShow;
    } else {
        console.error(`Element with ID '${elementId}' not found.`);
    }
}


let handleTodoFooter = () => {
    let todoFooterBtn = document.getElementById("icon_todolist");
    todoFooterBtn.addEventListener("click", () => {
        showElement("container-category");
    });
};

// Ladda todos när sidan laddas
window.addEventListener('load', () => {
    loadTodos();
});















































































