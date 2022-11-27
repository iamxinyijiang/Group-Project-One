import {render} from "./render.js";

class TaskManager {
    constructor() {
        this._task = [];
        this._id = 1;
    }

    get task() {
        return this._task;
    }

    get id() {
        return this._id;
    }

    set task(taskArray){
        this._task=taskArray;
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
        this._task.push(task);
        render(task);
    }

    selectTask(key, value) {
    }
}

export {TaskManager};