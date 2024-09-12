import clearImage from './Images/delete.svg'; 
import { createTodoItems } from './create-todo.js';

export default function createProjects() {    
    const projectListDiv = document.querySelector('.list-projects');
    projectListDiv.textContent = "";

    let defaultProject = createIndividualProject('Default');    
    projectListDiv.appendChild(defaultProject);

    addOtherProjects(projectListDiv);
}

function addOtherProjects(projectListDiv) {
    const projects = getProjects();
    if (projects == null) {
        return;
    }

    for (let project of projects) {
        if (project == 'Default') {
            continue;
        }

        projectListDiv.appendChild(createIndividualProject(project));
    }
}

function createIndividualProject(text) {
    let projectItemDiv = document.createElement('div');
    projectItemDiv.classList.add('project-item'); 

    let clearIcon = new Image();
    clearIcon.src = clearImage;
    clearIcon.classList.add('delete-project-icon'); 
    clearIcon.addEventListener('click', (e) => clearProject(e));

    const projectP = document.createElement('p');
    projectP.textContent = text;
    projectP.addEventListener('click', e => renderTodoItems(e)); 

    projectItemDiv.append(clearIcon);
    projectItemDiv.append(projectP);

    return projectItemDiv;
}

function getProjects() {
    const todoList = localStorage.getItem('projectList');
    const todos = JSON.parse(todoList);
    if (todos === null) {
        return;
    }

    let projects = [];
    for (let item of todos) {
        if (!projects.includes(item.name)) {
            projects.push(item.project);
        }
    }

    return projects.sort();
}

function clearProject(event) {
    let projectName = event.target.nextSibling.textContent;
    let todoList = JSON.parse(localStorage.getItem('projectList')) || [];

    todoList = todoList.filter(proj => proj.name !== projectName);
    localStorage.setItem('projectList', JSON.stringify(todoList));

    createProjects();
    createTodoItems(todoList[0]?.name || 'Default');
}


function renderTodoItems(event) {
    let projectName = event.target.textContent;

    const todoList = JSON.parse(localStorage.getItem('projectList')) || [];
    let project = todoList.find(proj => proj.name === projectName);

    if (!project || !project.tasks.length) {
        displayNoTasksMessage();
        return;
    }

    createTodoItems(project.name);
}


// Function to display "No tasks to display" message in the main content area
function displayNoTasksMessage() {
    const mainContent = document.querySelector('#main-new-task'); // Assuming this is the main content area
    const noNewTaskDiv = document.createElement("div");
    noNewTaskDiv.classList.add("no-new-taskdiv")
    mainContent.after = noNewTaskDiv;

    // Create and append the "No tasks" message
    const message = document.createElement('p');
    message.textContent = "No tasks to display.";
    message.classList.add('no-tasks-message');
    
    noNewTaskDiv.appendChild(message);
}


const newProjicon = document.querySelector(".new-proj")
newProjicon.addEventListener("click",()=> openNewProjectDialog() );

function openNewProjectDialog() {
    const dialog = document.createElement('dialog');
    dialog.classList.add('new-project-dialog');

    dialog.innerHTML = `
        <form method="dialog" id="new-project-form">
            <label for="projectName">Project Name:</label>
            <input type="text" id="projectName" name="projectName" required>
            <div class="dialog-buttons">
                <button type="submit">Create</button>
                <button type="button" id="cancel">Cancel</button>
            </div>
        </form>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    // Handle form submission for creating a new project
    const form = document.querySelector('#new-project-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = document.querySelector('#projectName').value.trim();

        if (projectName) {
            addNewProjectToStorage(projectName);
            dialog.close();
            document.body.removeChild(dialog);
            createProjects();
        }
    });

    // Handle cancel button click
    const cancelButton = document.querySelector('#cancel');
    cancelButton.addEventListener('click', () => {
        dialog.close();
        document.body.removeChild(dialog);
    });
}

// Function to add the new project to localStorage
export function addNewProjectToStorage(projectName) {
    const todoList = JSON.parse(localStorage.getItem('projectList')) || [];
    if (!todoList.some(proj => proj.name === projectName)) {
        const newProject = { name: projectName, tasks: [] };
        todoList.push(newProject);
        updateProjectsInTaskForm(newProject);
        localStorage.setItem('projectList', JSON.stringify(todoList));
    }

    createProjects();
}


// Function to update the projects dropdown in the task form
function updateProjectsInTaskForm(newProject) {
    const projectDatalist = document.querySelector('#projects');
    
    if (!Array.from(projectDatalist.options).some(option => option.value === newProject)) {
        const option = document.createElement('option');
        option.value = newProject;
        projectDatalist.appendChild(option);
    }
}

