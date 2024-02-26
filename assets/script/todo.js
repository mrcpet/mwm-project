let createTodo = () => {
    let createTodoBtn = document.getElementById("icon_addtodo");
    let todoListContainer = document.getElementById("container-todos");
    let todoInput = document.getElementById("todoInput");

    createTodoBtn.addEventListener('click', () => {
        // Visar diven där en ny todo skapas
        todoInput.style.display = 'block';
        console.log("Du klickade på att skapa en todo!")


        // Dölj todoListContainer när användaren väljer att skapa en ny todo
        todoListContainer.style.display = 'none';

        // Rensa inputfälten och select-fältet
        document.getElementById("todoName").value = "";
        document.getElementById("todoCategory").selectedIndex = 0;
        document.getElementById("todoDeadline").value = "";
        document.getElementById("todoDuration").value = "";
    });


};

// Anropa createTodo-funktionen när sidan laddas
createTodo();



let saveAndRenderTodo = () => {
    let addTodoBtn = document.getElementById("addTodoButton");

    addTodoBtn.addEventListener('click', () => {
        let todoNameValue = document.getElementById("todoName").value;
        let todoCategoryValue = document.getElementById("todoCategory").value;
        let todoDeadlineValue = document.getElementById("todoDeadline").value;
        let todoDurationValue = document.getElementById("todoDuration").value;

        let todo = {
            name: todoNameValue,
            category: todoCategoryValue,
            deadline: todoDeadlineValue,
            duration: todoDurationValue
        };

        renderTodo(todo); // Anropa renderTodo med den nya todo för att visa den i listan
    });
};

let renderTodo = (todo) => {
    let todoListContainer = document.getElementById("container-todos");

    todoListContainer.style.display = 'block';

    let todoInput = document.getElementById("todoInput");
    todoInput.style.display = 'none';

    let todoList = document.getElementById("todoList");

    let todoItem = document.createElement("li");

    todoItem.textContent = todo.name; // Använd textContent för att sätta innehållet till att endast visa namnet på todo

    todoList.appendChild(todoItem);
};





saveAndRenderTodo();









