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

//Variabler för todo list 
let todoListContainer = document.getElementById("todoListContainer");
let todoList = document.getElementById("todoList");

//Varibaler checkboxes 

let categoryCheckboxes = document.querySelectorAll("input[type= 'checkbox']");
let selectAllCheckbox = document.getElementById("selectAll");


//Event  listeners 


selectAllCheckbox.addEventListener("change", function () {
    toggleSelectAll();
});


addTodoBtn.addEventListener('click', (event) => {
    event.preventDefault();
    todoForm.style.display = "none";
    todoListContainer.style.display = "block";
    checkboxDiv.style.display = "block";
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
    todoListContainer.appendChild(todoElement);
}

let renderTodo = (todo, index) => {
    let todoElement = document.createElement('div');
    todoElement.classList.add('todo');

    // Skapa ett element för att visa todo-titeln
    let titleElement = document.createElement('span');
    titleElement.textContent = todo.titel;

    // Skapa ikon för delete
    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-icon');

    // Sätt indexattributet för papperskorgsikonen
    deleteIcon.dataset.index = index;

    let statusIcon = document.createElement('i');
    if (todo.completed) {
        statusIcon.classList.add('todo-completed', 'far', 'fa-check-circle');
    } else {
        statusIcon.classList.add('todo-incomplete', 'far', 'fa-circle');
    }

    // Lägg till statusIcon till todoElement
    todoElement.appendChild(statusIcon);

    //Lägg till title till todoElement
    todoElement.appendChild(titleElement);

    // Lägg till delete-ikonen i todo-elementet
    todoElement.appendChild(deleteIcon);

    // Lägg till eventlyssnare för delete-ikonen
    deleteIcon.addEventListener('click', (event) => {

        // Förhindra att händelsen sprids till förälderelementet
        event.stopPropagation();
        // Hämta index från dataset-attributet på papperskorgsikonen
        let todoIndex = event.target.dataset.index;
        deleteTodo(todoIndex); // Anropa deleteTodo med det hämtade indexet
    });



    //Gör detta till en funktion istället. 
    todoElement.addEventListener('click', () => {
        // Din kod för vad som ska hända när ett todoElement klickas på
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

        console.log('Todo clicked:', todo);
    });

    return todoElement;


}

// Uppdatera deleteTodo för att ta bort den aktuella todo med angivet index
let deleteTodo = (index) => {
    arrayTodos.splice(index, 1); // Ta bort todo med angivet index
    saveTodosToLocalStorage(); // Spara ändringar i localStorage
    renderAllTodos(); // Uppdatera vyn
}

// Rendera alla todos
let renderAllTodos = () => {
    todoListContainer.innerHTML = ''; // Rensa todoList innan du renderar igen
    arrayTodos.forEach((todo, index) => {
        let todoElement = renderTodo(todo, index);
        todoListContainer.appendChild(todoElement);
    });
}






//Funktioner för att hantera checkboxar 


//Event listener



















































































