

let createTodo = () => {
    let createTodoBtn = document.getElementById("icon_addtodo");


    createTodoBtn.addEventListener('click', () => {
        // Göm kategoriväljaren när användaren klickar på att skapa en ny todo
        let containerCategory = document.getElementById("container-category");
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
// Anropa createTodo-funktionen när sidan laddas
createTodo();

let saveTodo = () => {
    let addTodoBtn = document.getElementById("addTodoButton");

    addTodoBtn.addEventListener('click', () => {
        // Hämta värdena från inputfälten för den nya todo
        let todo = {
            name: document.getElementById("todoName").value,
            category: document.getElementById("todoCategory").value,
            deadline: document.getElementById("todoDeadline").value,
            duration: document.getElementById("todoDuration").value
        };

        // Lägg till den nya todo i localStorage
        saveTodoToLocalStorage(todo);

        // Rendera den nya todo
        renderTodo(todo);

        // Visa listan med todos och dölj input-fältet för att skapa ny todo
        showElement("container-todos");
    });
};

// Anropa saveTodo-funktionen när sidan laddas
saveTodo();


// Logik för spara todos i localstorage
const saveTodoToLocalStorage = (todo) => {
    // Hämta befintliga todos från localStorage
    let todos = getSavedTodos();

    // Lägg till den nya todo i listan
    todos.push(todo);

    // Konvertera todos till JSON-format och spara i localStorage
    localStorage.setItem('todos', JSON.stringify(todos));

};

// Funktion för att hämta sparade todos från localStorage
const getSavedTodos = () => {
    // Hämta sparade todos från localStorage
    const savedTodosJSON = localStorage.getItem('todos');

    // Om det inte finns några sparade todos, returnera en tom array
    // Annars, konvertera JSON-strängen till en array och returnera den
    return savedTodosJSON ? JSON.parse(savedTodosJSON) : [];
};
// Funktion för att rendera en todo
let renderTodo = (todo) => {

    // Skapa ett nytt <li> element för den nya todo
    let todoItem = document.createElement("li");
    todoItem.textContent = todo.name;

    // Lägg till <li> i listan av todos
    let todoList = document.getElementById("todoList");
    todoList.appendChild(todoItem);
};

// Hämta todos från localStorage och rendera dem när sidan laddas
window.addEventListener('load', () => {
    const savedTodos = getSavedTodos();
    savedTodos.forEach(todo => {
        renderTodo(todo);
    });
});






let todoFooterBtn = document.getElementById("icon_todolist");
let containerCategory = document.getElementById("container-category");

todoFooterBtn.addEventListener('click', () => {

    showElement("container-category");

    // När man trycker på iconen så ska användern navigeras till container-category

});






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










