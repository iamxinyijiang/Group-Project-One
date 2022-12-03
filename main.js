//import from module
import { TaskManager } from "./taskManager.js";
import { refreshTaskCard } from "./render.js";

let actionCode;
//define tasks object contain all tasks
const tasks = new TaskManager();

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
                valid = valid && input.value.trim() !== '' && input.value.length <= 8;
                break;
            case 'taskDescriptionTextarea':
                subValid = input.value.trim() !== '' && input.value.length <= 15;
                valid = valid && input.value.trim() !== '' && input.value.length <= 15;
                break;
            case 'assignedToMultipleSelect':
                subValid = input.selectedIndex !== -1;
                valid = valid && input.selectedIndex !== -1;
                break;
            case 'dateInput':
                subValid = input.value > formatDateStr(new Date());
                valid = valid && input.value > formatDateStr(new Date());
                break;
            case 'statusSelect':
                subValid = input.selectedIndex !== 0;
                valid = valid && input.selectedIndex !== 0;
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

//reset Task form clean input disable error message
function resetForm() {
    let errorMsg = document.getElementsByClassName('errorMsg');
    for (let i = 0, length = errorMsg.length; i < length; i++) {
        errorMsg[i].style.display = 'none';
    }
    document.getElementById("taskForm").reset();
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
            'default', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`;
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
        const tasksData = JSON.parse(window.localStorage.getItem('tasks'));
        tasks.id = tasksData._id;
        tasks.task = tasksData._task;
        refreshTaskCard(tasks);
    }
});

document.getElementById('addBtn').addEventListener("click", () => {
    actionCode = -1;
    document.getElementById('addTaskModalTitle').innerHTML = 'New Task';
    resetForm();
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
                    if (options[j].selected)
                        selectValueArr.push(options[j].value);
                    else
                        selectValueArr.push('');
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
        if (actionCode === -1)
            //create new task
            tasks.addTask(taskInfo);
        else
            //update exist task
            tasks.updateTask(taskInfo, actionCode);

        // hide modal after valid submission
        $('#addTaskModal').hide('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskCard(tasks);
    }
}, false);

//clear button to reset form
document.getElementById('clear').addEventListener('click', resetForm);

//set task status to Done update local storage data render task card
document.getElementById('taskCards').addEventListener("click", (event) => {
    const eventTarget = event.target.id.substring(0, event.target.id.indexOf('-'));
    const taskId = event.target.id.substring(event.target.id.indexOf('-') + 1);
    const taskIndex = tasks.task.findIndex((element) => element.id === parseInt(taskId));

    if (eventTarget === 'doneBtn') {
        swal({
            // title: "Alert!",
            text: "Are you sure want to mark this task as done?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willDone) => {
            if (willDone) {
                tasks.doneTask(taskIndex);
                window.localStorage.setItem('tasks', JSON.stringify(tasks));
                refreshTaskCard(tasks);
                swal({
                    icon: "success",
                    button: false,
                    timer: 2000,
                });
            }
        });
    } else if (eventTarget === 'deleteBtn') {
        swal({
            // title: "Alert!",
            text: "Are you sure you want to delete this task?",
            icon: "warning",
            closeOnClickOutside: false,
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                tasks.deleteTask(taskIndex);
                window.localStorage.setItem('tasks', JSON.stringify(tasks));
                refreshTaskCard(tasks);
                swal("Task deleted successfully!", {
                    icon: "success",
                    button: false,
                    timer: 2000,
                });
            } else {
                swal("Action cancelled. Task was not deleted.", {
                    icon: "info",
                    button: false,
                    timer: 2000,
                });
            }
        });
    } else if (eventTarget === 'editBtn') {
        actionCode = taskIndex;
        document.getElementById('addTaskModalTitle').innerHTML = 'Edit Task';
        document.getElementById('taskNameInput').value = tasks.task[taskIndex].name;
        document.getElementById('taskDescriptionTextarea').value = tasks.task[taskIndex].description;
        document.getElementById('dateInput').value = tasks.task[taskIndex].dueDate;
        document.getElementById('statusSelect').value = tasks.task[taskIndex].status;
        const options = document.getElementById('assignedToMultipleSelect').options;
        for (let i = 0; i < options.length; i++) {
            if (tasks.task[taskIndex].assignedTo[i] !== '')
                options[i].selected = true;
        }
    }
});

//--------------------------------------------------------------------------beta features-----------------------------------------------------------------------------------//
//allow local user to download a copy of their data from LS
function downloadTaskDate(file) {
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = URL.createObjectURL(file);
    link.download = file.name;

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
    }, 0);
}
//download as .txt
const myFileTxt = new File([localStorage.getItem('tasks', JSON.stringify(tasks))], `tasks-${formatDateStr(new Date())}.txt`)
document.getElementById("downloadTxt").addEventListener('click', () => {
    downloadTaskDate(myFileTxt)
});
//download as .JSON
const myFile = new File([localStorage.getItem('tasks', JSON.stringify(tasks))], `tasks-${formatDateStr(new Date())}.JSON`)
document.getElementById("downloadJSON").addEventListener('click', () => {
    downloadTaskDate(myFile)
})


//allow local user to rewrite the current task data with their own copy of task data downloaded previously from LS
//manually copy and paste from.txt
document.getElementById("overwrite").addEventListener('click', () => {
    swal({
        // title: "Alert!",
        text: "Do you want to manually import tasks (this will overwrite all your current tasks)?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willRestore) => {
        if (willRestore) {
            //localStorage.clear(); //clear to prevent mistake
            let pasteTaskData = document.getElementById("restoreTextarea").value
            window.localStorage.setItem('tasks', pasteTaskData);
            $('#restoreModal').hide('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            swal({
                icon: "success",
                button: false,
                timer: 2000,
            });
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    });
});

//upload JSON file to restore data 
document.getElementById('file-selector').addEventListener('change', (event) => {
    swal({
        // title: "Alert!",
        text: "Do you want to import tasks from JSON file(this will overwrite all your current tasks)?",
        icon: "warning",
        buttons: true,
        dangerMode: true,

    }).then((willUpload) => {
        if (willUpload) {
            const fileList = event.target.files;
            let getFileFromFileList = (fileList) => {
                for (const file of fileList) {
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.addEventListener('load', (event) => {
                        //localStorage.clear();//clear to prevent mistake
                        window.localStorage.setItem('tasks', event.target.result);
                    });
                }
            }
            getFileFromFileList(fileList)
            swal({
                icon: "success",
                button: false,
                timer: 2000,
            });
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    })
});

// Undo Upload
document.getElementById('undo').addEventListener("click", () => {
    fileSelector.value = "";
});

//clear local storage
document.getElementById('clearLS').addEventListener('click', () => {
    swal({
        // title: "Alert!",
        text: "Do you want to permanently delete all tasks ?  (We suggest downloading a copy before this.)",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDeleteAll) => {
        if (willDeleteAll) {
            localStorage.clear();
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            swal({
                icon: "success",
                button: false,
                timer: 2000,
            });
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    });

});


