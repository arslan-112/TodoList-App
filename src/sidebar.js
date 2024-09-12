import { createTodoItems } from "./create-todo";
import createProjects from "./makeProject";

function allTasks(){
    const allTasksDiv = document.querySelector(".all-tasksdiv");
    const todoList = localStorage.getItem('todoList');
    const todos = JSON.parse(todoList);
    console.log("Logging todos" + todos);
    if (!todos) return;
    console.log("After if statement");
    allTasksDiv.addEventListener("click", e => createTodoItems(todos));
    
}

export default allTasks;