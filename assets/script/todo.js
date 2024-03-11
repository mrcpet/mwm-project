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
let goToTodosButton = document.getElementById("goToTodosButton");

//Variabler todo details 
let todoDetailsContainer = document.getElementById("todoDetailsContainer");
let todoTitleDisplay = document.getElementById("todoTitleDisplay");
let todoDescriptionDisplay = document.getElementById("todoDescriptionDisplay");
let todoCategoryDisplay = document.getElementById("todoCategoryDisplay");
let todoDateDisplay = document.getElementById("todoDateDisplay");
let todoDurationDisplay = document.getElementById("todoDurationDisplay");
let todoDeadlineDisplay = document.getElementById("todoDeadlineDisplay");
let goBackButton = document.getElementById("goBackButton");
let editTodoBtn = document.getElementById("editTodoButton");

//Variabler för todo list 
let todoListContainer = document.getElementById("todoListContainer");
let todoList = document.getElementById("todoList");
let addIcon = document.getElementById("addIcon");

//Varibaler checkboxes categories

let categoryCheckboxes = document.querySelectorAll("input[type= 'checkbox'][name='category']");
let selectAllCheckbox = document.getElementById("selectAll");
let hideDoneTasksCheckbox = document.getElementById("hideDoneTasks");
selectedCategories = [];

// Funktion för att ställa in den aktuella användaren
const setCurrentUser = (username) => {
    localStorage.setItem("currentUser", username);
};

// Funktion för att hämta den aktuella användaren
const getCurrentUser = () => {
    return localStorage.getItem("currentUser");
};

// Anropa setCurrentUser för att ställa in den aktuella användaren
setCurrentUser("Madde");


function sortTodos(sortBy, sortOrder) {
    if (sortBy === 'deadline' && sortOrder !== '') {
        if (sortOrder === 'asc') {
            // Sortera todos efter deadline i stigande ordning
            arrayTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if (sortOrder === 'desc') {
            // Sortera todos efter deadline i fallande ordning
            arrayTodos.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        }
    } else if (sortBy === 'duration' && sortOrder !== '') {
        if (sortOrder === 'asc') {
            // Sortera todos efter tidsestimat i stigande ordning
            arrayTodos.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        } else if (sortOrder === 'desc') {
            // Sortera todos efter tidsestimat i fallande ordning
            arrayTodos.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        }
    }

    // Uppdatera listan med todos efter sortering
    filterAndRenderTodos();
}

// Lyssnare för ändringar i sorteringssättet (deadline eller duration)
document.querySelectorAll('input[name="sortBy"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        // Avmarkera andra checkboxen när ett alternativ väljs
        document.querySelectorAll('input[name="sortBy"]').forEach(otherCheckbox => {
            if (otherCheckbox !== this) {
                otherCheckbox.checked = false;
            }
        });
        // Om checkboxen är markerad
        if (this.checked) {
            // Hämta det valda sorteringssättet från checkboxen
            let sortBy = this.value;
            // Hämta det valda sorteringsordningen från dropdown-menyn
            let sortOrder = document.getElementById('sortOrderSelect').value;
            // Anropa sortTodos med det valda sorteringssättet och ordningen
            sortTodos(sortBy, sortOrder);
        }
    });
});

document.getElementById('sortOrderSelect').addEventListener('change', function (event) {
    // Hämta det valda sorteringssättet från dropdown-menyn
    let sortBy = document.querySelector('input[name="sortBy"]:checked').value;
    let sortOrder = this.value;

    // Anropa sortTodos med det valda sorteringssättet och ordningen
    sortTodos(sortBy, sortOrder);
});




// Lägg till en eventlyssnare för klickhändelser på "Select All" checkboxen
selectAllCheckbox.addEventListener('change', () => {
    toggleAllCategories(selectAllCheckbox.checked);
});

// Funktion för att markera "Select All" och alla kategorikryssrutor
function selectAllCategories() {
    selectAllCheckbox.checked = true; // Markera "Select All"
    categoryCheckboxes.forEach(checkbox => {
        checkbox.checked = true; // Markera alla kategorikryssrutor
    });
    selectedCategories = Array.from(categoryCheckboxes).map(checkbox => checkbox.value); // Uppdatera valda kategorier
}



// Funktion för att välja eller avmarkera alla kategorier
function toggleAllCategories(selectAll) {
    // Markera eller avmarkera "Select All" kryssrutan beroende på värdet av selectAll
    selectAllCheckbox.checked = selectAll;

    // Markera eller avmarkera alla kategorikryssrutor beroende på värdet av selectAll
    categoryCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAll;
    });

    // Uppdatera listan med valda kategorier baserat på selectAll
    if (selectAll) {
        selectedCategories = Array.from(categoryCheckboxes).map(checkbox => checkbox.value);
    } else {
        selectedCategories = [];
    }

    // Anropa filterAndRenderTodos för att filtrera och rendera todos baserat på de valda kategorierna
    filterAndRenderTodos();
    saveTodosToLocalStorage();
}

// Funktion för att filtrera och rendera todos baserat på deras completed-status
function filterAndRenderTodos() {
    // Rensa todoList innan du renderar igen
    todoList.innerHTML = '';

    // Återställ listan med valda kategorier
    selectedCategories = [];

    // Loopa genom checkboxarna för kategorier och lägg till de valda kategorierna i listan
    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });

    // Om alla kategorier är markerade, markera "Select All"
    if (selectedCategories.length === categoryCheckboxes.length) {
        selectAllCheckbox.checked = true;
    } else {
        selectAllCheckbox.checked = false;
    }

    // Filtrera todos baserat på de valda kategorierna
    const filteredTodos = arrayTodos.filter(todo => {
        if (hideDoneTasksCheckbox.checked && todo.completed) {
            return false;
        }
        if (selectedCategories.length === 0) {
            return true;
        }
        return selectedCategories.includes(todo.category);
    });

    // Rendera de filtrerade todos
    filteredTodos.forEach((todo, index) => {
        let todoElement = renderTodo(todo, index);
        todoList.appendChild(todoElement);
    });

    saveTodosToLocalStorage();
}

// Eventlyssnare för klickhändelser på checkboxar för kategorier
categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        filterAndRenderTodos();
    });
});




// Uppdatera eventlyssnaren för hideDoneTasksCheckbox för att anropa filterAndRenderTodos()
hideDoneTasksCheckbox.addEventListener('change', () => {
    filterAndRenderTodos();
});



// Lägg till en eventlyssnare för klickhändelser på knappen
goToTodosButton.addEventListener('click', () => {
    // Dölj todoForm och visa todoListContainer
    todoForm.style.display = "none";
    todoListContainer.style.display = "block";

    // Markera "Select All" och alla kategorikryssrutor
    selectAllCategories();

    // Anropa filterAndRenderTodos för att filtrera och rendera todos baserat på de valda kategorierna
    filterAndRenderTodos();

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
    selectAllCategories(); // Markera "Select All" och alla kategorikryssrutor vid sidans laddning


});

let addAndStoreTodo = () => {
    // Spara värdena från formuläret i variabler
    let title = todoTitle.value;
    let description = todoDescription.value;
    let category = todoCategory.value;
    let date = todoDate.value;
    let duration = `${todoDuration.value} hours`;
    let deadline = todoDeadline.value;

    // Skapa ett nytt todo-objekt med användarens namn
    let newTodo = {
        user: getCurrentUser(), // Användarnamnet för den inloggade användaren
        title: title,
        description: description,
        category: category,
        date: date,
        duration: duration,
        deadline: deadline,
        completed: false
    };

    // Lägg till det nya todo-objektet i arrayTodos
    arrayTodos.push(newTodo);
    saveTodosToLocalStorage(); // Spara todos i localStorage

    // Rendera den nya todo och lägg till den i todoList
    let todoElement = renderTodo(newTodo);
    todoList.appendChild(todoElement);
}

addTodoBtn.addEventListener('click', (event) => {
    event.preventDefault();
    todoForm.style.display = "none";
    todoListContainer.style.display = "block";
    addAndStoreTodo();
    renderAllTodos();
});


let renderTodo = (todo, index) => {
    let todoElement = document.createElement('div');
    todoElement.classList.add('todo');
    todoElement.dataset.index = index;

    // Skapa en checkbox
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    // Om todo.completed är true, markera checkboxen som checked
    checkbox.checked = todo.completed;

    // Kontrollera om todo är färdig, om så är fallet, inaktivera checkboxen
    if (todo.completed) {
        checkbox.disabled = true;
    }

    // Skapa ett element för att visa todo-titeln
    let titleElement = document.createElement('span');
    titleElement.classList.add('todoTitle');
    titleElement.textContent = todo.title;


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

        // Inaktivera checkboxen om den är markerad
        if (event.target.checked) {
            event.target.disabled = true;
        }

    });

    return todoElement;
};

// Funktion för att visa detaljerna för den valda todo
function showTodoDetails(todoIndex) {
    // Filtrera todos baserat på de valda kategorierna
    const filteredTodos = arrayTodos.filter(todo => selectedCategories.includes(todo.category));
    // Hitta den matchande todo baserat på index och användarnamn
    let todo = arrayTodos.find(todo => todo.user === getCurrentUser() && filteredTodos.indexOf(todo) == todoIndex);

    // Uppdatera detaljerna i todoDetailsContainer med informationen från den valda todo
    todoTitleDisplay.textContent = todo.title;
    todoDescriptionDisplay.textContent = todo.description;
    todoCategoryDisplay.textContent = todo.category;
    todoDateDisplay.textContent = todo.date;
    todoDurationDisplay.textContent = todo.duration;
    todoDeadlineDisplay.textContent = todo.deadline;

    // Visa todoDetailsContainer
    todoDetailsContainer.style.display = "block";
    todoListContainer.style.display = "none";


}

// Eventlyssnare för klickhändelser på todo-titlar
todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('todoTitle')) {
        // Hämta index från dataset-attributet på förälderelementet av todo-titeln
        let todoIndex = event.target.parentNode.dataset.index;

        // Om redigeringsläget är aktiverat, visa formuläret för redigering av den valda todo
        if (editTodoBtn.style.display === "inline") {
            editTodo(todoIndex);
        } else {
            // Annars visa detaljer för den valda todo
            showTodoDetails(todoIndex);
        }
    }
});


// Rendera alla todos
let renderAllTodos = () => {
    todoList.innerHTML = ''; // Rensa todoList innan du renderar igen
    // Filtrera todos för den inloggade användaren

    let userTodos = arrayTodos.filter(todo => todo.user === getCurrentUser());
    userTodos.forEach((todo, index) => {
        let todoElement = renderTodo(todo, index);
        todoList.appendChild(todoElement);
    });
}


// Variabler för att spåra den redigerade todo och dess index
let editedTodoIndex = null;
let editedTodo = null;

// Lägg till en eventlyssnare för klickhändelser på editTodoBtn
editTodoBtn.addEventListener('click', () => {
    console.log("Edit Todo button clicked");
    // Kontrollera om en todo är vald för redigering
    if (editedTodoIndex !== null) {
        // Hämta värdena från formuläret
        let title = todoTitle.value;
        let description = todoDescription.value;
        let category = todoCategory.value;
        let date = todoDate.value;
        let duration = `${todoDuration.value} hours`;
        let deadline = todoDeadline.value;

        // Uppdatera de aktuella todo-objektets egenskaper med de nya värdena
        editedTodo.title = title;
        editedTodo.description = description;
        editedTodo.category = category;
        editedTodo.date = date;
        editedTodo.duration = duration;
        editedTodo.deadline = deadline;

        // Spara ändringarna i localStorage
        saveTodosToLocalStorage();

        // Uppdatera vyn för att visa de uppdaterade todos
        renderAllTodos();

        // Återställ editTodoBtn och todoForm
        editTodoBtn.style.display = "none";
        addTodoBtn.style.display = "inline";
        todoForm.style.display = "none";
        todoListContainer.style.display = "block";

        // Återställ innehållet i todoForm
        [...document.querySelectorAll('#todoForm input, #todoForm textarea')].forEach(field => field.value = "");

        // Återställ redigeringsvariablerna
        editedTodoIndex = null;
        editedTodo = null;
    }
});

// Funktion för att redigera en vald todo
function editTodo(index) {
    console.log("Editing todo with index:", index);
    console.log("Edited todo:", editedTodo);
    // Sätt index och todo som ska redigeras
    editedTodoIndex = index;
    editedTodo = arrayTodos[index];

    // Fyll formuläret med den valda todos värden
    todoTitle.value = editedTodo.title;
    todoDescription.value = editedTodo.description;
    todoCategory.value = editedTodo.category;
    todoDate.value = editedTodo.date;
    // Använd split för att separera tiden från duration (timmar)
    todoDuration.value = editedTodo.duration.split(' ')[0];
    todoDeadline.value = editedTodo.deadline;

    // Dölj addTodoBtn och visa editTodoBtn
    addTodoBtn.style.display = "none";
    editTodoBtn.style.display = "inline";

    // Visa todoForm och dölj todoListContainer
    todoForm.style.display = "block";
    todoDetailsContainer.style.display = "none";
}

// Ladda sparade todos när sidan laddas
window.addEventListener('load', () => {
    loadTodos(); // Ladda sparade todos från localStorage
    renderAllTodos(); // Rendera alla todos för den inloggade användaren
});


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


































































