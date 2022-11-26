import {render} from "./render.js";

class TaskManager {
    constructor() {
        this._tasks = [];
        this._id = 1;
    }

    get tasks() {
        return this._tasks;
    }

    get id() {
        return this._id;
    }

    set tasks(tasks){
        this._tasks=tasks;
    }

    set id(id){
        this._id=id;
    }

    addTask(taskInfo) {
        const task = {
            id: this._id++,
            name: taskInfo[0],
            description: taskInfo[1],
            assignedTo: taskInfo[2],
            dueDate: taskInfo[3],
            status: taskInfo[4],
        }
        this._tasks.push(task);
        render(task);
    }

    selectTask(key, value) {
    }
}

export {TaskManager};