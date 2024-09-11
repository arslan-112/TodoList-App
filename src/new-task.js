// import TodoItem from './todo-item.js';
// import { formatISO } from "date-fns";
// import createProjects from './makeProject.js';
// import { createTodoItems } from './create-todo.js';


// export default function initializeNewTaskButtons() {
//     const newTaskSidebar = document.querySelector('.new-task');
    
//     const dialog = document.querySelector('dialog');
//     const inputTitle = document.querySelector('#title');
//     const inputDescription = document.querySelector('#description');
//     const inputDueDate = document.querySelector('#dueDate');
//     const selectPriority = document.querySelector('#priority');
//     const selectProject = document.querySelector('#dialog-project-input');
//     const textNotes = document.querySelector('#notes');
//     const submitButton = document.querySelector('#submit');
//     const cancelButton = document.querySelector('#cancel');

//     newTaskSidebar.addEventListener('click', () => {
//         dialog.showModal();
//         clearDialogFields();
//     });

//     // Add new task button in main content
//     const newTaskMainContent = document.querySelector('new-task');

//     newTaskMainContent.addEventListener('click', () => {
//         dialog.showModal();
//         clearDialogFields();
//     });

//     // Clear form fields before showing the dialog
//     function clearDialogFields() {
//         inputTitle.value = '';
//         inputDescription.value = '';
//         let currentTime = formatISO(new Date());
//         inputDueDate.value = currentTime.slice(0, currentTime.indexOf('+'));
//         selectPriority.selectedIndex = 0;
//         selectProject.value = 'Default'; // Default project
//         textNotes.value = '';
//     }

//     // Handling form submission
//     submitButton.addEventListener('click', (e) => {
//         e.preventDefault();

//         const newTodoItem = new TodoItem(
//             inputTitle.value,
//             inputDescription.value,
//             inputDueDate.value,
//             selectPriority.selectedIndex,
//             selectProject.value,
//             textNotes.value
//         );

//         let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

//         // Add the new todo to the list
//         todoList.push(newTodoItem);

//         // Save updated list to local storage
//         localStorage.setItem('todoList', JSON.stringify(todoList));

//         // If a new project was entered, ensure it's reflected in the UI
//         if (!document.querySelector(`.list-projects div:contains(${selectProject.value})`)) {
//             createProjects();
//         }

//         // Update the UI to show the new todo
//         createTodoItems(todoList);

//         dialog.close();
//     });

//     // Cancel the dialog box
//     cancelButton.addEventListener('click', () => {
//         dialog.close();
//     });
// }
