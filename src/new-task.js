import TodoItem from './todo-item.js';
import { formatISO } from "date-fns";
import createProjects from './makeProject.js';
import { createTodoItems } from './create-todo.js';
import { addNewProjectToStorage } from './makeProject.js';
import newTaskIcon from "./Images/new.svg";

// Create the task form dialog dynamically and append it to the body
function createTaskForm() {
    const dialog = document.createElement('dialog');
    dialog.id = 'dialog';
    
    const form = document.createElement('form');
    form.id = 'form';

    // Add form elements: Title
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.required = true;
    form.appendChild(titleInput);

    // Add form elements: Description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description';
    form.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    form.appendChild(descriptionInput);

    // Add form elements: Due Date
    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateLabel.textContent = 'Due Date';
    form.appendChild(dueDateLabel);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'datetime-local';
    dueDateInput.id = 'dueDate';
    dueDateInput.required = true;
    form.appendChild(dueDateInput);

    // Add form elements: Priority
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'Priority';
    form.appendChild(priorityLabel);

    const prioritySelect = document.createElement('select');
    prioritySelect.id = 'priority';
    prioritySelect.name = 'priority';

    const lowPriority = document.createElement('option');
    lowPriority.value = '1';
    lowPriority.textContent = 'Low';

    const mediumPriority = document.createElement('option');
    mediumPriority.value = '2';
    mediumPriority.textContent = 'Medium';

    const highPriority = document.createElement('option');
    highPriority.value = '3';
    highPriority.textContent = 'High';

    prioritySelect.appendChild(lowPriority);
    prioritySelect.appendChild(mediumPriority);
    prioritySelect.appendChild(highPriority);

    form.appendChild(prioritySelect);

    // Add form elements: Projects
    const projectLabel = document.createElement('label');
    projectLabel.setAttribute('for', 'projects');
    projectLabel.textContent = 'Projects';
    form.appendChild(projectLabel);

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('projects-list');

    const projectInput = document.createElement('input');
    projectInput.type = 'text';
    projectInput.setAttribute('list', 'projects');
    projectInput.id = 'dialog-project-input';
    projectInput.required = true;

    const projectDatalist = document.createElement('datalist');
    projectDatalist.id = 'projects';

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Default';
    projectDatalist.appendChild(defaultOption);

    projectDiv.appendChild(projectInput);
    projectDiv.appendChild(projectDatalist);
    form.appendChild(projectDiv);

    // Add form elements: Notes
    const notesLabel = document.createElement('label');
    notesLabel.setAttribute('for', 'notes');
    notesLabel.textContent = 'Notes';
    form.appendChild(notesLabel);

    const notesTextarea = document.createElement('textarea');
    notesTextarea.id = 'notes';
    form.appendChild(notesTextarea);

    // Add buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancel';
    cancelButton.textContent = 'Cancel';

    const submitButton = document.createElement('button');
    submitButton.id = 'submit';
    submitButton.textContent = 'Submit';

    buttonsDiv.appendChild(cancelButton);
    buttonsDiv.appendChild(submitButton);

    form.appendChild(buttonsDiv);
    dialog.appendChild(form);

    document.body.appendChild(dialog); // Append dialog to the body

    return dialog;
}

export default function initializeNewTaskButtons() {
    const dialog = createTaskForm(); 
    const newTaskSidebar = document.querySelector('.new-task');
    const inputTitle = dialog.querySelector('#title');
    const inputDescription = dialog.querySelector('#description');
    const inputDueDate = dialog.querySelector('#dueDate');
    const selectPriority = dialog.querySelector('#priority');
    const selectProject = dialog.querySelector('#dialog-project-input');
    const textNotes = dialog.querySelector('#notes');
    const submitButton = dialog.querySelector('#submit');
    const cancelButton = dialog.querySelector('#cancel');

    newTaskSidebar.addEventListener('click', () => {
        dialog.showModal();
        clearDialogFields();
    });

    // Clear form fields before showing the dialog
    function clearDialogFields() {
        inputTitle.value = '';
        inputDescription.value = '';
        let currentTime = formatISO(new Date());
        inputDueDate.value = currentTime.slice(0, currentTime.indexOf('+'));
        selectPriority.selectedIndex = 0;
        selectProject.value = 'Default'; // Default project
        textNotes.value = '';
    }

    // Handling form submission
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const newTodoItem = new TodoItem(
            inputTitle.value,
            inputDescription.value,
            inputDueDate.value,
            selectPriority.selectedIndex,
            selectProject.value,
            textNotes.value
        );
    // Fetch the project list from localStorage
    let projectList = JSON.parse(localStorage.getItem('projectList')) || [];

    // Check if the project exists in localStorage
    let projectIndex = projectList.findIndex(project => project.name === selectProject.value);

    if (projectIndex !== -1) {
        // If the project exists, add the new todo to the tasks array
        projectList[projectIndex].tasks.push(newTodoItem);
    } else {
        // Use the existing addNewProjectToStorage function to add a new project
        addNewProjectToStorage(selectProject.value);
        
        // Retrieve updated projectList after adding the new project
        projectList = JSON.parse(localStorage.getItem('projectList'));

        // Add the new todo to the tasks array in the new project
        let newProjectIndex = projectList.findIndex(project => project.name === selectProject.value);
        projectList[newProjectIndex].tasks.push(newTodoItem);
    }

    // Save updated project list back to localStorage
    localStorage.setItem('projectList', JSON.stringify(projectList));

    // Update the UI to show the new todo and project if necessary
    createTodoItems(projectList[projectIndex] ? projectList[projectIndex].tasks : projectList[projectList.length - 1].tasks);
    createProjects();  // Refresh the project list in the UI

    dialog.close();
    });
    // Cancel the dialog box
    cancelButton.addEventListener('click', () => {
        dialog.close();
    });
}

export function createMainContentTaskButton() {
    const dialog = document.querySelector('#dialog');  // Get the existing dialog form
    const mainContent = document.querySelector('.main-content');
    console.log("inside the createMainContentTaskButton");
    // Check if the button already exists to avoid duplicating it
    let existingButton = mainContent.querySelector('#main-new-task');
    if (existingButton) return;  // Exit if the button already exists

    const newTaskMainContent = document.createElement('div');
    newTaskMainContent.classList.add('new-task');
    newTaskMainContent.id = 'main-new-task';  
    console.log("Button created");
    console.log(newTaskMainContent);

    newTaskMainContent.textContent = 'New Task';

    const imgElement = document.createElement('img');
    imgElement.src = newTaskIcon; 
    imgElement.width = 15;

    // Add a non-breaking space between the text and image
    newTaskMainContent.appendChild(document.createTextNode('\u00A0'));  
    newTaskMainContent.appendChild(imgElement); 

    newTaskMainContent.addEventListener('click', () => {
        dialog.showModal();
        clearDialogFields();  // Clear fields before showing the dialog
    });

    // Append the button to the main content
    mainContent.appendChild(newTaskMainContent);
}
