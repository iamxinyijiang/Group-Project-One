
//task name >min. and < max length ; 
/*function checkName(){
  const taskName = document.getElementById("taskNameInput").value;
  if(taskName.trim()=== ""||taskName.length< 3||taskName == null){
    const taskNameError = document.getElementById("errorMsgTaskName")
    taskNameError.innerHTML="*Task Name must be more than 3 characters."
    taskNameError.style.color = 'red'
  }
}
//task description cannot be empty and less than max length;
function checkDescription(){
  const description = document.getElementById("taskDescriptionTextarea").value;
if(description.trim()===""||taskName.length> 300||description == null){
  const descriptionError = document.getElementById("errorMsgDescription")
  descriptionError.innerHTML="*Must not be blank; <br>*Maximum length: 300 characters."
  descriptionError.style.color = "red"
}
}


//assigned to must be one or more; 
function checkAssigned(){
  const assignedTo = document.getElementById('assignedToMultipleSelect')
if(assignedTo.selectedIndex == -1){
  const assignedToError =document.getElementById('errorMsgAssignedTo')
  assignedToError.innerHTML="*Must select at least one person."
  assignedToError.style.color="red"
} 
}*/

/*due-date must not be empty and must be in the future;
function checkDate(){ 
const dueDateError= document.getElementById('errorMsgDate')
/*function convertStringToDate(){}
const dd = Date.parse(dueDate)
const today = new Date();
const dueMonth = dd.getMonth(); //zero index
const month = today.getMonth();//zero index
const dueDay = dd.getDate();
const day =today.getDate();
const dueYear = dd.getFullYear();
const year =today.getFullYear()

let today = new Date().getTime();
let dd = document.getElementById("dateInput").value
console.log(dd)
let dueDay = new Date(dd).getTime();
console.log(today)
console.log(dueDay)
if(dueDay ===''||dueDay == null ||dueDay < today){
  dueDateError.innerHTML ="*Due date must not be empty.<br>* Due date must be set in the future."
}
}



//status must be selected
function checkStatus(){
  const taskStatus = document.getElementById("statusSelect")
if(taskStatus.selectedIndex == 0){
  const taskStatusError = document.getElementById("errorMsgStatus")
  taskStatusError.innerHTML="Status must be selected."
  taskStatusError.style.color="red"
}
}*/