import emptyCircle from "./Images/due-task.svg";
import checkedCircle from "./Images/task-done.svg";
import deleteIcon from "./Images/delete.svg";


function createTodoItems(todos) {
    if (!todos || !Array.isArray(todos)) {
        console.error("Invalid todos list: ", todos);
        return;
    }
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
    cardTitle.textContent = todo.title;

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-description");
    cardDescription.textContent = todo.description;

    let cardPriority = document.createElement("div");
    cardPriority.classList.add("card-priority");
    cardPriority.textContent = todo.priority;

    let cardDueDate = document.createElement("div");
    cardDueDate.classList.add('card-duedate');
    cardDueDate.textContent = new Date(todo.dueDate).toLocaleString();

    let cardProject = document.createElement("div");
    cardProject.classList.add("card-project");
    cardProject.textContent = todo.project;

    let emptycircleimg = new Image();
    emptycircleimg.src = emptyCircle;
    emptycircleimg.classList.add("card-circle-unchecked");
    emptycircleimg.addEventListener('click', e => toggleCircle(e, '.card-circle-checked'));

    let checkedCircleImage = new Image();
    checkedCircleImage.src = checkedCircle;
    checkedCircleImage.classList.add('card-circle-checked');
    checkedCircleImage.addEventListener('click', e => toggleCircle(e, '.card-circle-unchecked'));

    if (todo.checked) {
        emptycircleimg.style.display = 'none';
        checkedCircleImage.style.display = 'block';        
    } else {
        checkedCircleImage.style.display = 'none';
        emptycircleimg.style.display = 'block';
    }

    let deleteimg = new Image();
    deleteimg.src = deleteIcon;
    deleteimg.classList.add('delete-task');
    deleteimg.addEventListener('click', e=> deleteToDoitem(e));

    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardDescription);
    cardDiv.appendChild(cardPriority);
    cardDiv.appendChild(cardDueDate);
    cardDiv.appendChild(cardProject);
    cardDiv.appendChild(emptycircleimg);
    cardDiv.appendChild(checkedCircleImage);
    cardDiv.appendChild(deleteimg);

    itemDiv.appendChild(cardDiv);

    todoItemsDiv.appendChild(itemDiv);

}

function toggleCircle(event, className){
    let image = event.target;
    image.style.display = 'none';
    let divItem = image.parentNode;
    divItem.querySelector(className).style.display = 'block';
    divItem.classList.toggle('item-checked');
}

function deleteToDoitem(event){
    let divItem = event.target.parentNode.parentNode;
    updateLocalstorage(divItem);
    divItem.remove();
}

function updateLocalstorage(divItem){
    let title = divItem.querySelector('.card-title').textContent; 

    const todoList = localStorage.getItem('todoList');
    const todos = JSON.parse(todoList);

    let removeItemIndex = todos.findIndex(x => x.title === title);
    
    if (removeItemIndex != -1) {
        todos.splice(removeItemIndex, 1);
    }
    localStorage.setItem('todoList', JSON.stringify(todos));
    createProjects();
}

export {createTodoItems};
