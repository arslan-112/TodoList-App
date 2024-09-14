import { createTodoItems } from "./create-todo";
import { displayAllProjects } from "./makeProject";
import { mainContentsetter } from "./makeProject";

function allTasks(){
    
    const allTasksDiv = document.querySelector(".all-tasksdiv");
    allTasksDiv.addEventListener("click", () => {
        mainContentsetter();
        createTodoItems("all");
    });
    
}

export function dueToday(){
    mainContentsetter();
    const duetodayDiv = document.querySelector(".todaydiv");
    duetodayDiv.addEventListener("click", e => {
        mainContentsetter();
        createTodoItems("today")});
}

export function allProjects(){
    const allProjDiv = document.querySelector(".all-projectsdiv");
    const mainContent = document.querySelector(".main-content");
    
    const title = document.createElement("div");
    title.textContent = " All Projects";
    title.classList.add("title-main");
    
    allProjDiv.addEventListener("click", e =>{
        mainContent.innerHTML= " ";
        const projDiv = document.createElement("div");
        projDiv.classList.add("proj-items");
        mainContent.appendChild(title);
        mainContent.appendChild(projDiv);
    displayAllProjects()});
}

export default allTasks;