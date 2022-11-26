function createTaskHTML(task) {
    const assigned = task.assignedTo.length > 1 ? task.assignedTo.join(', ') : task.assignedTo[0];

    return `<div class="col-12 col-sm-6 col-lg-3 mx-5">
                <div class="card border-light mx-5" style="width: 15rem;">
                    <img src="images/task.jpg" class="card-img-top" alt="Task icon">
                    <div class="card-body mx-auto">
                        <h5 class="card-title">${task.name}</h5>
                        <p class="card-text">Assigned to: ${assigned}<br>Due on: ${task.dueDate}</p>
    
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#task${task.id}">
                            View Task Details
                        </button>
                        <div class="modal fade" id="task${task.id}" tabindex="-1" role="dialog"
                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle1">${task.name}</h5>
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
                                                    <small>3 days ago</small>
                                                </div>
                                                <p class="mb-1">${task.name}</p>
                                                <small>Donec id elit non mi porta.</small>
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Description</h5>
                                                    <small class="text-muted">3 days ago</small>
                                                </div>
                                                <p class="mb-1">${task.description}</p>
                                                <small class="text-muted">Donec id elit non mi porta.</small>
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Assigned to</h5>
                                                    <small class="text-muted">3 days ago</small>
                                                </div>
                                                <p class="mb-1">${assigned}</p>
                                                <small class="text-muted">Donec id elit non mi porta.</small>
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Due Date</h5>
                                                    <small class="text-muted">3 days ago</small>
                                                </div>
                                                <p class="mb-1">${task.dueDate}</p>
                                                <small>Donec id elit non mi porta.</small>
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action">
                                                <div class="d-flex w-100 justify-content-between">
                                                    <h5 class="mb-1">Status</h5>
                                                    <small class="text-muted">3 days ago</small>
                                                </div>
                                                <p class="mb-1">${task.status}</p>
                                                <small>Donec id elit non mi porta.</small>
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