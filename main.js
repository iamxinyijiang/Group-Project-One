import {TaskManager} from "./taskManager.js";
import {render} from "./render.js";

//define tasks object contain all tasks
let tasks = new TaskManager();

//check exist tasks local storage
if (window.localStorage.getItem('tasks') !== null) {
    const tasks_back = JSON.parse(window.localStorage.getItem('tasks'));
    tasks.id = tasks_back._id;
    tasks.tasks = tasks_back._tasks;
}

//data validate function
function dataValidate(inputs) {
    let valid = true;
    for (let i = 0; i < inputs.length - 1; i++) {
        const input = document.getElementById(inputs[i].children[1].id);
        const errorMsg = document.getElementById(inputs[i].children[2].id);
        let subValid = true;
        switch (input.id) {
            case 'taskNameInput':
                subValid = input.value.trim() !== '' && input.value.length <= 8;
                valid = valid && subValid;
                break;
            case 'taskDescriptionTextarea':
                subValid = input.value.trim() !== '' && input.value.length <= 15;
                valid = valid && subValid;
                break;
            case 'assignedToMultipleSelect':
                subValid = input.selectedIndex !== -1;
                valid = valid && subValid;
                break;
            case 'dateInput':
                subValid = new Date(input.value).toLocaleDateString() > new Date().toLocaleDateString() && input.value !== '';
                valid = valid && subValid;
                break;
            case 'statusSelect':
                subValid = input.selectedIndex !== 0;
                valid = valid && subValid;
                break;
        }
        showErrorMsg(subValid, errorMsg);
    }
    return valid;
}

//error message function display/hide message depend on condition
function showErrorMsg(valid, msg) {
    if (valid) msg.style.display = 'none'; else msg.style.display = '';
}

window.addEventListener("load", () => {
    setInterval(() => {
        document.getElementById('dateContainer').innerHTML = `&#128198 Date: ${new Date().toLocaleDateString()}`;
        document.getElementById('clockContainer').innerHTML = `&#8986 Time: ${new Date().toLocaleTimeString()}`;
    }, 200);
    console.log(tasks);
    for (let i = 0; i <tasks.tasks.length; i++) {
        render(tasks.tasks[i]);
    }
});

//validate Form at submission
document.getElementById("submit").addEventListener('click', (event) => {
    event.preventDefault();
    const inputs = document.getElementsByClassName('form-group');

    if (dataValidate(inputs)) {
        const taskInfo = [];
        for (let i = 0; i < inputs.length - 1; i++) {
            //generate task info
            if (inputs[i].children[1].id === 'assignedToMultipleSelect') {
                const options = inputs[i].children[1].options;
                const selectValueArr = [];
                for (let j = 0; j < options.length; j++) {
                    if (options[j].selected) selectValueArr.push(options[j].value);
                }
                taskInfo.push(selectValueArr);
                inputs[i].children[1].selectedIndex = -1;
            } else if (inputs[i].children[1].id === 'statusSelect') {
                taskInfo.push(inputs[i].children[1].value);
                inputs[i].children[1].selectedIndex = 0;
            } else {
                taskInfo.push(inputs[i].children[1].value);
                inputs[i].children[1].value = '';
            }
        }
        //create new task
        tasks.addTask(taskInfo);
        // render(tasks.tasks[0]);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}, false);

//clear Local storage
document.getElementById('clear').addEventListener("click", () => window.localStorage.clear());