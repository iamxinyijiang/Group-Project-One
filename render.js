function createTaskHTML(task) {
    const assigned = task.assignedTo.length > 1 ? task.assignedTo.join(', ') : task.assignedTo[0];

    const toDoBg = 'images/Sticky-Note-01-Yellow.svg'
    const inProgressBg = 'images/Sticky-Note-02-Pink.svg'
    const reviewBg = 'images/Sticky-Note-04-Purple.svg'
    const doneBg ='images/Sticky-Note-02-Green.svg'
    let stickyNote = ""
        if( `${task.status}` === "To Do"){
            stickyNote = toDoBg
        };
        if(`${task.status}` === "In Progress"){
            stickyNote = inProgressBg
        };
        if(`${task.status}` === "Review"){
            stickyNote = reviewBg
        };
        if(`${task.status}` === "Done"){
            stickyNote = doneBg
        };
    
    

    return `<div class="col-12 col-sm-4 col-lg-2 mx-3" style="margin:2em !important;">
                <div class="card mx-5" style="width: 15rem; background-color: lightsteelblue; border:none;" >
                    <div class="card-body mx-auto" style="background:url(${stickyNote}) no-repeat; background-size:cover; border: none;">
                        <div id="card-content-wrapper">
                        <h5 class="card-title">&#x1F4CC ${task.name}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text">Assigned to: ${assigned}</p>
                        <p class="card-text">Due on: ${task.dueDate}</p>
                        <p class="card-text">Status: ${task.status} </p>
                        <br>
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#task${task.id}">
                            View Task Details
                        </button>
                        <div class="modal fade" id="task${task.id}" tabindex="-1" role="dialog"
                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle1">Task ID: ${task.id}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <!--List group-->
                                        <div class="list-group">
                                            <a href="#" class="list-group-item list-group-item-action active">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Task Name</h5>
                                                </div>
                                                <p class="mb-1">${task.name}</p>
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Description</h5>
                                                </div>
                                                <p class="mb-1">${task.description}</p>
                                                
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Assigned to</h5>
                                                </div>
                                                <p class="mb-1">${assigned}</p>
                                                
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Due Date</h5>
                                                </div>
                                                <p class="mb-1">${task.dueDate}</p>
                                                
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Status</h5>
                                                </div>
                                                <p class="mb-1">${task.status}</p>
                                                
                                            </a>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function render(task) {
    document.getElementById('todo').innerHTML = document.getElementById('todo').innerHTML + createTaskHTML(task);
}

export {render};