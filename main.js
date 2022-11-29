//testing code to see if main.js is linked
console.log('main.js is running.');

//import from module
import {TaskManager} from "./taskManager.js";
import {render,refreshTaskCard} from "./render.js";

//define tasks object contain all tasks
let tasks = new TaskManager();

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
                subValid = input.value > formatDateStr(new Date());
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

//transfer current date to YYYY-MM-DD string
function formatDateStr(currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
    const day = currentDate.getDate() < 9 ? `0${currentDate.getDate()}` : currentDate.getDate();
    return `${year}-${month}-${day}`;
}

//error message function display/hide message depend on condition
function showErrorMsg(valid, msg) {
    valid ? msg.style.display = 'none' : msg.style.display = 'block';
}

window.addEventListener("load", () => {
    //clock
    setInterval(() => {
        const d = new Date();
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let dateReading = `&#128198 ${d.toLocaleDateString(
            'default', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}`;
        let timeReading = `&#8986 ${d.toLocaleTimeString('default', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            dayPeriod: 'long'
        })}`
        let timeZoneReading = `&#128205 ${timezone}`
        document.getElementById("dateContainer").innerHTML = dateReading
        document.getElementById("clockContainer").innerHTML = timeReading
        document.getElementById("timezoneContainer").innerHTML = timeZoneReading
    }, 500);
    //render when window load
    if (window.localStorage.getItem('tasks') !== null) {
        const tasks_back = JSON.parse(window.localStorage.getItem('tasks'));
        tasks.id = tasks_back._id;
        tasks.task = tasks_back._task;
    }
    for (let i = 0; i < tasks.task.length; i++) {
        render(tasks.task[i]);
    }
});

//validate Form at submission
document.getElementById("submit").addEventListener('click', (event) => {
    event.preventDefault();
    const inputs = document.getElementsByClassName('form-group');

    //get task info from input form assign into array use as parameters of addTask function
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
        // hide modal after valid submission
        $('#addTaskModal').hide('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}, false);

//clear button to reset form
document.getElementById('clear').addEventListener('click', resetForm);
function resetForm() {
    let errorMsg = document.getElementsByClassName('errorMsg');
    for(let i = 0, length = errorMsg.length; i < length; i++) {
        errorMsg[i].style.display = 'none';
       }
       document.getElementById("taskForm").reset();
    };

//set task status to Done update local storage data render task card
document.getElementById('todo').addEventListener("click", (event)=>{
    const eventTarget=event.target.id.substring(0,7);
    const taskId=event.target.id.substring(8);
    if (eventTarget==='doneBtn'){
        const taskIndex=tasks.task.findIndex((element)=>element.id===parseInt(taskId));
        tasks.updateTask(taskIndex);
        document.getElementById(`card-body-${taskId}`).style.backgroundImage='url(images/Sticky-Note-02-Green.svg)';
        event.target.style.visibility='hidden';
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskCard();
    }
});

//delete task
document.getElementById('todo').addEventListener("click", (event) =>{
    const eventTarget=event.target.id.substring(0,9);
    const taskId=event.target.id.substring(10);
    if (eventTarget==='deleteBtn'){
        const taskIndex=tasks.task.findIndex((element)=>element.id===parseInt(taskId));
        console.log(taskIndex)
        let deleteConfirm = confirm('Are you sure you want to delete this task?');
        if (deleteConfirm) {
            alert('Task deleted successfully!');
            let taskObj = JSON.parse(localStorage.getItem("tasks"))
            let taskArr = taskObj._task
            taskArr.splice(taskIndex, 1)
            let taskArrNew = taskArr
            taskArrNew = taskObj._task
            localStorage.setItem('tasks', JSON.stringify(taskObj))
            refreshTaskCard();
        } else {
            alert('Action cancelled; task was not deleted.');
        }
    }
});