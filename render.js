function createTaskHTML(task) {
    //use different background color for different task status
    // const toDoBg = 'images/Sticky-Note-01-Yellow.svg';
    // const inProgressBg = 'images/Sticky-Note-02-Pink.svg';
    // const reviewBg = 'images/Sticky-Note-04-Purple.svg';
    // const doneBg = 'images/Sticky-Note-02-Green.svg';
    // let stickyNote = "";
    // let flexOrder = "";
    let statusColor = "";

    switch (task.status) {
        case 'To Do':
            statusColor = "#FFFF90"
            break;
        case 'In Progress':
            statusColor = "#FCC3C9"
            break;
        case 'Review':
            statusColor = "#DC88DD"
            break;
        case 'Done':
            statusColor = "#CAED9D"
            break;
    }

    return `<div class="col-12 col-sm-6 col-lg-3 col-xl-2 mx-1" style="margin:2em !important;" id="cardWrapper-${task.id}">
                <div class="card mx-0" style="width: 15rem; background-color: lightsteelblue; border:none; max-width:250px;">
                    <div class="card-body mx-auto" style="background-color: ${statusColor};" id="card-body-${task.id}">
                        <div id="taskDetail-${task.id}">
                            <h5 class="card-title" id="cardTaskName">&#x1F4CC&emsp;${task.name}</h5>
                            <p class="card-text">。${task.description}</p>
                            <p class="card-text">。Due on:<br>&emsp;${task.dueDate}</p>
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="card-button btn btn-outline-success"
                                style="visibility: ${task.status === 'Done' ? "hidden" : "visible"}" id="doneBtn-${task.id}">Mark as done
                        </button>
                        <br>
                        <button type="button" class="card-button btn btn-info" data-toggle="modal" data-target="#task${task.id}">View</button>
                        <button type="button" class="card-button btn btn-primary" data-toggle="modal" data-target="#addTaskModal" id="editBtn-${task.id}">Edit</button>
                        <button type="button" class="card-button btn btn-danger" id="deleteBtn-${task.id}">Delete</button>
                    </div>
                    <div class="modal fade" id="task${task.id}" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content" style="font-size: 20px;">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="exampleModalLongTitle1">Task UID:&emsp;${task.id}</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <!--List group-->
                                    <div class="list-group">
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">Task Name</h5>
                                            </div>
                                            <p class="mb-1">&emsp;${task.name}</p>
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">Description</h5>
                                            </div>
                                            <p class="mb-1">&emsp;${task.description}</p>
            
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">Assigned to</h5>
                                            </div>
                                            <p class="mb-1">&emsp;${task.assignedTo.filter(name => name !== '').join(',<br>&emsp;')}
                                            </p>
            
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">Due Date</h5>
                                            </div>
                                            <p class="mb-1">&emsp;${task.dueDate}</p>
            
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">Status</h5>
                                            </div>
                                            <p class="mb-1" style="background-color: ${statusColor};">&emsp;${task.status}</p>
            
                                        </a>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function render(task) {
    document.getElementById(`${task.status.replaceAll(' ', '')}`).innerHTML = document.getElementById(`${task.status.replaceAll(' ', '')}`).innerHTML + createTaskHTML(task);
}

function refreshTaskCard(tasks) {
    const cardHolders = document.getElementsByClassName('cardHolder');
    for (const cardHolder of cardHolders) {
        cardHolder.innerHTML = ''
    }

    for (let i = 0; i < tasks.task.length; i++) {
        render(tasks.task[i]);
    }
}


export {render, refreshTaskCard};