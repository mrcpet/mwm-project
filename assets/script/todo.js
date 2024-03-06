let arrayTodos = [];

// Variabler todoForm
let todoForm = document.getElementById("todoForm");
let todoTitle = document.getElementById("todoTitle");
let todoDescription = document.getElementById("todoDescription");
let todoCategory = document.getElementById("todoCategory");
let todoDate = document.getElementById("todoDate");
let todoDuration = document.getElementById("todoDuration");
let todoDeadline = document.getElementById("todoDeadline");
let addTodoBtn = document.getElementById("addTodo");

//Variabler todo details 
let todoDetailsContainer = document.getElementById("todoDetailsContainer");
let todoTitleDisplay = document.getElementById("todoTitleDisplay");
let todoDescriptionDisplay = document.getElementById("todoDescriptionDisplay");
let todoCategoryDisplay = document.getElementById("todoCategoryDisplay");
let todoDateDisplay = document.getElementById("todoDateDisplay");
let todoDurationDisplay = document.getElementById("todoDurationDisplay");
let todoDeadlineDisplay = document.getElementById("todoDeadlineDisplay");
let goBackButton = document.getElementById("goBackButton");

//Variabler för todo list 
let todoListContainer = document.getElementById("todoListContainer");
let todoList = document.getElementById("todoList");
let addIcon = document.getElementById("addIcon");

//Varibaler checkboxes categories

let categoryCheckboxes = document.querySelectorAll("input[type= 'checkbox'][name='category']");
let selectAllCheckbox = document.getElementById("selectAll");




selectAllCheckbox.addEventListener("change", function () {
    toggleSelectAll();
    saveTodosToLocalStorage();
});

//Kollar om select all är iklickad, om den är det så blir alla checkboxar iklickade
//Om den inte är iklickad så blir alla checkboxar avmarkerade. 
function toggleSelectAll() {
    if (selectAllCheckbox.checked) {
        categoryCheckboxes.forEach(function (checkbox) {
            checkbox.checked = true;
        });
    } else {
        categoryCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    }
}


addTodoBtn.addEventListener('click', (event) => {
    event.preventDefault();
    todoForm.style.display = "none";
    todoListContainer.style.display = "block";
    createTodo();
    renderAllTodos();

});



//Funktion för att spara todos i localstorage 
let saveTodosToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(arrayTodos));
};


// Funktion för att hämta sparade todos från localStorage
let getSavedTodos = () => {
    const savedTodosJSON = localStorage.getItem('todos');
    return savedTodosJSON ? JSON.parse(savedTodosJSON) : [];
};

let loadTodos = () => {
    arrayTodos = getSavedTodos();// Uppdatera arrayTodos med de sparade todos
    console.log(arrayTodos);
};

// Ladda todos när sidan laddas
window.addEventListener('load', () => {
    loadTodos(); // Ladda sparade todos från localStorage
    renderAllTodos();


});






let createTodo = () => {
    //spara värdena i formuläret 


    let todo = {
        titel: todoTitle.value,
        description: todoDescription.value,
        category: todoCategory.value,
        date: todoDate.value,
        duration: `${todoDuration.value} hours`,
        deadline: todoDeadline.value,
        completed: false
    };

    arrayTodos.push(todo);
    console.log(arrayTodos);
    saveTodosToLocalStorage(); // Spara todos i localStorage

    // Rendera den nya todo och appenda till todoList
    let todoElement = renderTodo(todo);
    todoList.appendChild(todoElement);


}



let renderTodo = (todo, index) => {
    let todoElement = document.createElement('div');
    todoElement.classList.add('todo');
    todoElement.dataset.index = index;

    // Skapa en checkbox
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    // Om todo.completed är true, markera checkboxen som checked
    checkbox.checked = todo.completed;



    // Skapa ett element för att visa todo-titeln
    let titleElement = document.createElement('span');
    titleElement.classList.add('todoTitle');
    titleElement.textContent = todo.titel;


    // Skapa ikon för delete
    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteIcon.dataset.index = index;

    // Lägg till statusikon, titel och delete-ikon till todoElement
    todoElement.appendChild(checkbox);
    todoElement.appendChild(titleElement);
    todoElement.appendChild(deleteIcon);

    // Lägg till en eventlistener för att hantera klickhändelsen på delete-ikonen för varje deleteIcon
    deleteIcon.addEventListener('click', (event) => {
        // Förhindra händelsen från att bubbla upp till förälderelementen
        event.stopPropagation();
        // Hämta index från dataset-attributet på deleteIcon
        let todoIndex = deleteIcon.dataset.index;
        // Anropa deleteTodo med det hämtade indexet
        deleteTodo(todoIndex);
    });

    // Lägg till en eventlistener för att hantera klickhändelsen på todoElement
    titleElement.addEventListener('click', (event) => {
        // Förhindra standardbeteendet för händelsen, om det behövs
        event.preventDefault();

        // Hämta index från dataset-attributet på todoElement
        let todoIndex = todoElement.dataset.index;

        // Hämta den aktuella todo från arrayTodos med hjälp av indexet
        let todo = arrayTodos[todoIndex];

        // Uppdatera detaljerna i todoDetailsContainer med informationen från den klickade todo
        todoTitleDisplay.textContent = todo.titel;
        todoDescriptionDisplay.textContent = todo.description;
        todoCategoryDisplay.textContent = todo.category;
        todoDateDisplay.textContent = todo.date;
        todoDurationDisplay.textContent = todo.duration;
        todoDeadlineDisplay.textContent = todo.deadline;

        // Visa todoDetailsContainer
        todoDetailsContainer.style.display = "block";
        todoListContainer.style.display = "none";
    });

    // Lägg till en eventlyssnare för klickhändelser
    goBackButton.addEventListener('click', () => {
        // Dölj todoDetailsContainer och visa todoListContainer
        todoDetailsContainer.style.display = "none";
        todoListContainer.style.display = "block";
    });
    // Lägg till en eventlistener för att hantera ändringar i checkboxen för varje todo
    checkbox.addEventListener('change', (event) => {
        // Hämta förälderelementet som innehåller checkboxen
        let todoElement = event.target.parentNode;
        // Hämta index från dataset-attributet på todoElement
        let todoIndex = todoElement.dataset.index;

        // Uppdatera todo.completed baserat på checkboxens status
        arrayTodos[todoIndex].completed = event.target.checked;
        // Spara ändringar i localStorage
        saveTodosToLocalStorage();
    });

    return todoElement;
};

// Rendera alla todos
let renderAllTodos = () => {
    todoList.innerHTML = ''; // Rensa todoList innan du renderar igen
    arrayTodos.forEach((todo, index) => {
        let todoElement = renderTodo(todo, index);
        todoList.appendChild(todoElement);
    });
}








// Uppdatera deleteTodo för att ta bort den aktuella todo med angivet index
let deleteTodo = (index) => {
    arrayTodos.splice(index, 1); // Ta bort todo med angivet index

    if (arrayTodos.length === 0) {
        // Om arrayen är tom, rensa localStorage
        localStorage.removeItem('todos');
    } else {
        saveTodosToLocalStorage(); // Spara ändringar i localStorage
    }

    renderAllTodos(); // Uppdatera vyn
}












// Event listener för att visa todoForm och dölja todoListContainer när användaren klickar på addIcon
addIcon.addEventListener('click', () => {
    todoForm.style.display = "block";
    todoListContainer.style.display = "none";

    // Återställ innehållet i todoForm
    [...document.querySelectorAll('#todoForm input, #todoForm textarea')].forEach(field => field.value = "");
});




















































































