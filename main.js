//testing code to see if main.js is linked
console.log('main.js is running.')

window.addEventListener("load", () => {
    setInterval(() => {
        document.getElementById('dateContainer').innerHTML = `&#128198 Date: ${new Date().toLocaleDateString()}`;
        document.getElementById('clockContainer').innerHTML = `&#8986 Time: ${new Date().toLocaleTimeString()}`;
    }, 200);
});

function dataValidate(inputs) {
    for (let i = 0; i < inputs.length - 1; i++) {
        const input = document.getElementById(inputs[i].children[1].id);
        const errorMsg = document.getElementById(inputs[i].children[2].id);
        let status;
        switch (input.id) {
            case 'taskNameInput':
                status = input.value.trim() === "" || input.value.length > 8;
                break;
            case 'taskDescriptionTextarea':
                status = input.value.trim() === "" || input.value.length > 15;
                break;
            case 'assignedToMultipleSelect':
                status = input.selectedIndex === -1;
                break;
            case 'dateInput':
                status = input.value <= new Date().toLocaleDateString().replaceAll('/', '-');
                break;
            case 'statusSelect':
                status = input.selectedIndex === 0;
                break;
        }
        showErrorMsg(status, errorMsg);
    }
}

function showErrorMsg(status, msg) {
    console.log('errorMsg function is working');
    console.log(status);
    console.log(msg.innerHTML);
    console.log(msg.style.display);
    if (status)
        msg.style.display = '';
    else
        msg.style.display = 'none'

}
//validate Form at submission
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputs = document.getElementsByClassName('form-group');
    // resetErrors();
    dataValidate(inputs);
}, false);