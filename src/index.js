import "./styles/index.css";
import "./styles/dialogstyle.css";
import "./styles/dialogform.css";

import makeProjects from './makeProject.js';
import { createTodoItems } from './create-todo.js';
// import newTaskButton from './new-task.js';

const todoList = localStorage.getItem('todoList');
const todos = JSON.parse(todoList);
console.log(todos);

makeProjects();
createTodoItems(todos);
// newTaskButton();
