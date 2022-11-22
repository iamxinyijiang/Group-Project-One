//testing code to see if main.js is linked
console.log('main.js is running.')
//display current date and time on page
function myClock() {         
    setTimeout(function() {   
      const d = new Date();
      document.getElementById("dateContainer").innerHTML = `&#128198 Date: ${d.toLocaleDateString(
        'default', {weekday: 'short'})} ${d.toLocaleDateString()}`; 
      document.getElementById("clockContainer").innerHTML = `&#8986 Time: ${d.toLocaleTimeString()}`; 
      myClock();             
    }, 1000)
  }
  myClock();    
