import emptyCircle from "./Images/due-task.svg";
import checkedCircle from "./Images/task-done.svg";
import deleteIcon from "./Images/delete.svg";
import createProjects from "./makeProject";
import {createMainContentTaskButton} from "./new-task.js";


function createTodoItems(projectName) {
    const todoList = JSON.parse(localStorage.getItem('projectList')) || [];

    if (projectName === "all") {
        const title = document.querySelector(".title-main");
        title.textContent = " All Tasks";
        const todoItemsDiv = document.querySelector(".todo-items");
        todoList.forEach(project => {
            if (project.tasks && project.tasks.length > 0) {
                // Loop through each task of the project and create items
                project.tasks.forEach(todo => createItem(todo, todoItemsDiv));
            }
        });
    }else if(projectName === "today"){
        const title = document.querySelector(".title-main");
        title.textContent = " Due Today";
        const todoItemsDiv = document.querySelector(".todo-items");
        const today = new Date().toISOString().split('T')[0];  

        todoList.forEach(project => {
            project.tasks.forEach(todo => {
                const todoDueDate = todo.dueDate.split('T')[0];  
                if (todoDueDate === today) {
                    createItem(todo, todoItemsDiv);  
                }
            });
        });
    }else {
        
        const titleDiv = document.querySelector(".title-main");
        const todoItemsDiv = document.querySelector(".todo-items");
        
        const project = todoList.find(proj => proj.name === projectName);
        
        
        if (!project || !project.tasks || project.tasks.length === 0) {
            return;  // No tasks or project found
        }
        titleDiv.textContent = projectName;
        // Loop through each task of the found project
        for (let todo of project.tasks) {
            createItem(todo, todoItemsDiv);
        }
    }
}



function createItem(todo, todoItemsDiv){
    
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("id",todo.title);

    let cardTitle = document.createElement("h2");
    cardTitle.classList.add("card-title");
    cardTitle.textContent =todo.title;

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-description", "todo-text");
    cardDescription.textContent = "Description: "+ todo.description;

    let cardPriority = document.createElement("div");
    cardPriority.classList.add("card-priority","todo-text");
    cardPriority.textContent = "Priority:" + todo.priority;

    let cardDueDate = document.createElement("div");
    cardDueDate.classList.add('card-duedate',"todo-text");
    cardDueDate.textContent = "Due Date: "+ new Date(todo.dueDate).toLocaleString();

    let projTitlediv = document.createElement("div");
    projTitlediv.classList.add("card-project-title-container");

    let projTitletext = document.createElement("div");
    projTitletext.classList.add("title-text-proj", "todo-text");
    projTitletext.textContent = "Project:  ";
    let cardProject = document.createElement("div");
    cardProject.classList.add("card-project","todo-text");
    cardProject.textContent =todo.project;

    projTitlediv.appendChild(projTitletext);
    projTitlediv.appendChild(cardProject);

    let cardimgsDiv = document.createElement("div");
    cardimgsDiv.classList.add("card-images");

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

    cardimgsDiv.appendChild(emptycircleimg);
    cardimgsDiv.appendChild(checkedCircleImage);
    cardimgsDiv.appendChild(deleteimg);

    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardDescription);
    cardDiv.appendChild(cardPriority);
    cardDiv.appendChild(cardDueDate);
    cardDiv.appendChild(projTitlediv);
    cardDiv.appendChild(cardimgsDiv);

    todoItemsDiv.appendChild(cardDiv);

    // todoItemsDiv.appendChild(itemDiv);
    console.log(todoItemsDiv);
    console.log("At end of createItem");

}

function toggleCircle(event, className){
    let image = event.target;
    image.style.display = 'none';
    let divItem = image.parentNode;
    let parent = divItem.parentNode;
    let parentid = parent.id;
   
    divItem.querySelector(className).style.display = 'block';
    divItem.classList.toggle('item-checked');
    let todoTextElements = document.querySelectorAll(`#${parentid} .todo-text`);
    
    todoTextElements.forEach(element => {
        element.classList.toggle('strikethrough');
    });
}

function deleteToDoitem(event){
    let divItem = event.target.parentNode.parentNode;
    console.log(divItem);
    updateLocalstorage(divItem);
    divItem.remove();
}


function updateLocalstorage(divItem) {
    console.log("Inside updatelocalstorage");
    let title = divItem.querySelector('.card-title').textContent; 
    console.log(title);
    let projectName = document.querySelector('.card-project').textContent; // Assuming there's a way to get the project name from the div
    console.log(projectName);
    const todoList = JSON.parse(localStorage.getItem('projectList')) || [];
    console.log("TODOLIST: ");
    console.log(todoList);


    // Find the project by name
    let project = todoList.find(proj => proj.name === projectName);
    console.log("Project: "+ project);

    if (project) {
        // Find the task by title within the project's tasks
        let removeItemIndex = project.tasks.findIndex(task => task.title === title);
        console.log("In if condition");
        console.log("Item index: " + removeItemIndex);
        
        if (removeItemIndex !== -1) {
            console.log("Not found?");
            project.tasks.splice(removeItemIndex, 1); // Remove the task from the project's tasks
        }
        console.log(project);

        // Update the local storage with the modified project
        console.log(todoList);
        localStorage.setItem('projectList', JSON.stringify(todoList));
        createProjects();  // Optionally recreate the projects
    } else {
        console.error("Project not found");
    }
}

export {createTodoItems};
