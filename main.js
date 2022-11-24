import {TaskManager} from "./taskManager.js";

const tasks = new TaskManager();

//testing code to see if main.js is linked
console.log('main.js is running.')

window.addEventListener("load", () => {
    setInterval(() => {
        document.getElementById('dateContainer').innerHTML = `&#128198 Date: ${new Date().toLocaleDateString()}`;
        document.getElementById('clockContainer').innerHTML = `&#8986 Time: ${new Date().toLocaleTimeString()}`;
    }, 200);
});

function dataValidate(inputs) {
    let valid = true;
    for (let i = 0; i < inputs.length - 1; i++) {
        const input = document.getElementById(inputs[i].children[1].id);
        const errorMsg = document.getElementById(inputs[i].children[2].id);
        let subValid = true;
        switch (input.id) {
            case 'taskNameInput':
                subValid = !(input.value.trim() === "" || input.value.length > 8);
                valid = valid && subValid;
                break;
            case 'taskDescriptionTextarea':
                subValid = !(input.value.trim() === "" || input.value.length > 15);
                valid = valid && subValid;
                break;
            case 'assignedToMultipleSelect':
                subValid = !(input.selectedIndex === -1);
                valid = valid && subValid;
                break;
            case 'dateInput':
                subValid = !(input.value <= new Date().toLocaleDateString().replaceAll('/', '-'));
                valid = valid && subValid;
                break;
            case 'statusSelect':
                subValid = !(input.selectedIndex === 0);
                valid = valid && subValid;
                break;
        }
        showErrorMsg(subValid, errorMsg);
    }
    console.log(valid);
    return valid;
}

function showErrorMsg(valid, msg) {
    if (valid)
        msg.style.display = 'none';
    else
        msg.style.display = '';
}

//validate Form at submission
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputs = document.getElementsByClassName('form-group');
    // if (dataValidate(inputs))
    if (dataValidate(inputs)) {
        const taskInfo = [];
        for (let i = 0; i < inputs.length - 1; i++) {
            taskInfo.push(inputs[i].children[1].value);
            // inputs[i].children[1].value=''
        }
        tasks.addTask(taskInfo);
    }
    console.log(tasks);
}, false);