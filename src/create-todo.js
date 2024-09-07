

function createTodoItems(todos) {
    let todoItemsDiv = document.querySelector('.todo-items');
    todoItemsDiv.textContent = "";

    for (let todo of todos) {
        createItem(todo, todoItemsDiv);
    }
}

function createItem(todo, todoItemsDiv){
    let itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    let cardTitle = document.createElement("h2");
    cardTitle.classList.add("card-title");

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-description");

    let cardPriority = document.createElement("div");
    cardPriority.classList.add("card-priority");

    let cardDueDate = document.createElement("div");
    cardDueDate.classList.add('card-duedate');
    cardDueDate.textContent = new Date(todo.dueDate).toLocaleString();

    let cardProject = document.createElement("div");
    cardProject.classList.add("card-project");

    let cardCheckbox = document.createElement("input");
    cardCheckbox.type = 'checkbox';
    cardCheckbox.classList.add("checkbox");

    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardDescription);
    cardDiv.appendChild(cardPriority);
    cardDiv.appendChild(cardDueDate);
    cardDiv.appendChild(cardProject);
    cardDiv.appendChild(cardCheckbox);

}