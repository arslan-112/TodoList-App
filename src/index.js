import "./styles/index.css";
import "./styles/dialogstyle.css";
import "./styles/dialogform.css";
import createProjects from './makeProject.js';
import { createTodoItems } from './create-todo.js';
import newTaskButton from './new-task.js';
import allTasks, { allProjects }  from "./sidebar.js";
import { dueToday } from "./sidebar.js";

const todoList = localStorage.getItem('projectList');
const todos = JSON.parse(todoList);




createProjects();
allTasks();
newTaskButton();
dueToday();
allProjects();
createTodoItems(todos);

document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const sidebar = document.querySelector('.leftpanel');
    sidebar.classList.toggle('show-sidebar');
});
console.log(document.querySelector('.hamburger-menu'));
console.log(document.querySelector('.leftpanel'));