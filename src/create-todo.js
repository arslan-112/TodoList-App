import emptyCircle from "./Images/due-task.svg";
import checkedCircle from "./Images/task-done.svg";
import deleteIcon from "./Images/delete.svg";
import createProjects from "./makeProject";


function createTodoItems(projectName) {
    const todoList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = todoList.find(proj => proj.name === projectName);

    if (!project || !project.tasks || project.tasks.length === 0) {
        
        return;
    }

    let todoItemsDiv = document.querySelector('.todo-items');
    todoItemsDiv.textContent = "";
    for (let todo of project.tasks) {
        createItem(todo, todoItemsDiv);
        addNewTodoToProject(todo);
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


function addNewTodoToProject(todoItem) {
    const todoList = JSON.parse(localStorage.getItem('projectList')) || [];
    let project = todoList.find(proj => proj.name === todoItem.project);
    
    if (project) {
        project.tasks.push(todoItem);
    } else {
        const newProject = {
            name: todoItem.project,
            tasks: [todoItem]
        };
        todoList.push(newProject);
    }

    localStorage.setItem('projectList', JSON.stringify(todoList));
}

function updateLocalstorage(divItem) {
    let title = divItem.querySelector('.card-title').textContent; 
    let projectName = divItem.querySelector('.project-name').textContent; // Assuming there's a way to get the project name from the div

    const todoList = JSON.parse(localStorage.getItem('projectList')) || [];

    // Find the project by name
    let project = todoList.find(proj => proj.name === projectName);

    if (project) {
        // Find the task by title within the project's tasks
        let removeItemIndex = project.tasks.findIndex(task => task.title === title);
        
        if (removeItemIndex !== -1) {
            project.tasks.splice(removeItemIndex, 1); // Remove the task from the project's tasks
        }

        // Update the local storage with the modified project
        localStorage.setItem('projectList', JSON.stringify(todoList));
        createProjects();  // Optionally recreate the projects
    } else {
        console.error("Project not found");
    }
}

export {createTodoItems};
