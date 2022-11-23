//testing code to see if main.js is linked
console.log('main.js is running.')

//display current date and time on page
// function myClock() {
//     setTimeout(function () {
//         const d = new Date();
//         document.getElementById("dateContainer").innerHTML = `&#128198 Date: ${d.toLocaleDateString(
//             'default', {weekday: 'short'})} ${d.toLocaleDateString()}`;
//         document.getElementById("clockContainer").innerHTML = `&#8986 Time: ${d.toLocaleTimeString()}`;
//         myClock();
//     }, 1000)
// }
//
// myClock();
window.addEventListener("load", () => {
    setInterval(() => {
        document.getElementById('dateContainer').innerHTML = `&#128198 Date: ${new Date().toLocaleDateString()}`;
        document.getElementById('clockContainer').innerHTML = `&#8986 Time: ${new Date().toLocaleTimeString()}`;
    }, 200);
});

function resetErrors() {
    //empty error messages before validation start.
    let errorElement = document.querySelectorAll('.errorMsg');
    for (let i = 0; i < errorElement.length; ++i) {
        errorElement[i].innerHTML = '';
    }
}


function dataValidate(inputs) {
    for (let i = 0; i < inputs.length - 1; i++) {
        const input = document.getElementById(inputs[i].children[1].id);
        const errorMsg = document.getElementById(inputs[i].children[2].id);

        console.log(input.id);
        console.log(inputs[i].children[2]);

        switch (input.id) {
            case 'taskNameInput':
                if (input.value.trim() === "" || input.value.length > 8) {
                    errorMsg.innerHTML = "*Task Name must not be empty or longer than 8 characters.";
                }
                break;
            case 'taskDescriptionTextarea':
                if (input.value.trim() === "" || input.value.length > 15) {
                    errorMsg.innerHTML = "*Must not be blank; <br>*Maximum length: 15 characters.";
                }
                break;
            case 'assignedToMultipleSelect':
                if (input.selectedIndex === -1) {
                    errorMsg.innerHTML = "*Must select at least one person.";
                }
                break;
            case 'dateInput':
                if (input.value <= new Date().toLocaleDateString().replaceAll('/', '-')) {
                    errorMsg.innerHTML = "*Due date must not be empty.<br>*Due date must be set in the future.";
                }
                break;
            case 'statusSelect':
                if (input.selectedIndex === 0) {
                    errorMsg.innerHTML = "Status must be selected.";
                }
                break;
        }

    }
}

// function dataValidate() {
//     const taskName = document.getElementById("taskNameInput");
//     const taskNameError = document.getElementById("errorMsgTaskName");
//
//     const description = document.getElementById("taskDescriptionTextarea");
//     const descriptionError = document.getElementById("errorMsgDescription");
//
//     const assignedTo = document.getElementById('assignedToMultipleSelect');
//     const assignedToError = document.getElementById('errorMsgAssignedTo');
//
//     const dueDate = document.getElementById('dateInput');
//     const dueDateError = document.getElementById('errorMsgDate');
//
//     const taskStatus = document.getElementById("statusSelect");
//     const taskStatusError = document.getElementById("errorMsgStatus");
//
//     //checkTaskName;
//     if (taskName.value.trim() === "" || taskName.value.length > 8) {
//         // taskNameError.innerHTML = "*Task Name must not be empty or longer than 8 characters.."
//         // taskNameError.hidden=false;
//         console.log(taskNameError.style.display);
//         console.log('Task name is not correct');
//         taskNameError.hidden=true;
//         console.log(taskNameError.style.display);
//     }
//     //checkDescription;
//     if (description.value.trim() === "" || taskName.value.length > 15) {
//         descriptionError.innerHTML = "*Must not be blank; <br>*Maximum length: 15 characters."
//     }
//     //checkAssigned to
//     if (assignedTo.selectedIndex === -1) {
//         assignedToError.innerHTML = "*Must select at least one person."
//     }
//     //check due date(invalid date and date in the past are not allowed)
//     if (dueDate.value <= new Date().toLocaleDateString().replaceAll('/', '-')) {
//         dueDateError.innerHTML = "*Due date must not be empty.<br>*Due date must be set in the future."
//     }
//     //checkStatus;
//     if (taskStatus.selectedIndex === 0) {
//         taskStatusError.innerHTML = "Status must be selected."
//         taskStatusError.style.color = "red"
//     }
// }

//validate Form at submission
const submitBtn = document.getElementById("submit")
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputs = document.getElementsByClassName('form-group');

    resetErrors();
    dataValidate(inputs);
}, false);
