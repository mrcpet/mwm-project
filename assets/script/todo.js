let createTodo = () => {
    let createTodoBtn = document.getElementById("icon_addtodo");
    let todoInput = document.getElementById("todoInput");

    createTodoBtn.addEventListener('click', () => {
        // Visar diven där en ny todo skapas
        todoInput.style.display = 'block';
    });

    let addTodo = () => {
        let addTodoButton = document.getElementById("addTodoButton"); 

        addTodoButton.addEventListener('click', () => {
            //logik för att skicka Todon till sidan där alla todos hamnar
        })

    }
};

// Anropa createTodo-funktionen när sidan laddas
createTodo();




















