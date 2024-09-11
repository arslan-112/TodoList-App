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
    const todoList = localStorage.getItem('todoList');
    const todos = JSON.parse(todoList);
    if (todos === null) {
        return;
    }

    let projects = [];
    for (let item of todos) {
        if (!projects.includes(item.project)) {
            projects.push(item.project);
        }
    }

    return projects.sort();
}

function clearProject(event) {
    let projectName = event.target.nextSibling.textContent;

    let todoItems = JSON.parse(localStorage.getItem('todoList'));
    if (todoItems == null || todoItems.length === 0) {
        return;
    }

    let remainItems = todoItems.filter(x => x.project != projectName);
    localStorage.setItem('todoList', JSON.stringify(remainItems));

    createProjects();
    createTodoItems(remainItems);
}

function renderTodoItems(event) {
    let projectName = event.target.textContent;
    let todoItems = JSON.parse(localStorage.getItem('todoList'));
    if (todoItems == null || todoItems.length == 0) {
        return;
    }
    let projects = todoItems.filter(x => x.project === projectName);
    if (projects === null) {
        return;
    }

    createTodoItems(projects);
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
function addNewProjectToStorage(projectName) {
    const todoList = localStorage.getItem('todoList');
    let todos = JSON.parse(todoList) || [];

    if (!todos.some(todo => todo.project === projectName)) {
        const newProject = { project: projectName, todos: [] };
        todos.push(newProject);
        localStorage.setItem('todoList', JSON.stringify(todos));
    }

    // Update the projects dropdown in the task form
    updateProjectsInTaskForm(projectName);
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