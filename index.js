/* Steps I need to take to build pomodoro clock
        (This step should be done after all below is accomplished in settings user should be able to set amount of pomodoros he wanna work
             set timer, short break, (long break, long break should only count down after last pomodoro), user should 
             be able to select one of the available ringtones for when timer is up)

            1. user should able to increment decrement timer min 1 max 90
                1.1  when user presses start btn timer must count down from 25 minutes

            2. when user pressed pauses btn time at that point should be paused. user can do alternating between
                start and pause without any failure.

             3. when user presses reset button current timer, short break,long break should be reverted back to default timer 
                which is timer is 25 min short break is 5 min and long break is 10 min
    
            4. user can set break time before setting timer that's automatically count down when timer is 0
                4.1 user can increment decremeent timer min 1 max 30 before everything starts    
        */
 
const menuBtn = document.querySelector('.pomodoro__settings');
const cancelChangesBtn = document.getElementById('cancel');
const settingsContainer = document.getElementById('settings-container');
const sessionTimerLength = document.querySelector('.pomodoro-length');
const shortBreakTimerLength = document.querySelector('.short-break-length');
const longBreakLengthTimer = document.querySelector('.long-break-length');
const pomodoroSessionsAmount = document.querySelector('.pomodoro-goal');
const pomdoroGoals = document.getElementById('pomodoro__goals');
const pomodoroWorkTypeTitle = document.getElementById('pomodoro__session-title');
// time that type timers hold
const sessionTime = document.getElementById('pomodoro-timer');
const shortBreakTime = document.getElementById('short-break');
const longBreakTime = document.getElementById('long-break');

let isMenuOpen = false;
let isGoalsSet= false;
let secondsLeft;
let lengthSessions;
let countdown;
const timerType = {
    sessionIsOn: true,
    shortBreakOn: false,
    longBreakOn: false,
}




function startTimer(){
    
    if(timerType.sessionIsOn){
        
        startPomodoro(sessionTime.dataset.session,sessionTime.id);
    }else if(timerType.shortBreakOn) {
         
        startPomodoro(shortBreakTime.dataset.short_break,shortBreakTime.id);
    } else if(timerType.longBreakOn) {
        
        
        startPomodoro(longBreakTime.dataset.long_break,longBreakTime.id)
    }
}
function startPomodoro(seconds,element){
  
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;

    displayTime(seconds);
    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now())/ 1000);
        if(secondsLeft < 1){
            

          checkTimerType(element);
          
        }
        displayTime(secondsLeft);  
    }, 1000);
}
function checkTimerType(element){
      
         console.log(lengthSessions)
    
        if(isGoalsSet){
            doGoalsCount(element);
        } else {
            callAlternatively(element);
        }
   
}
function callAlternatively(element){
    switch(element){
        case 'pomodoro-timer':

            timerType.sessionIsOn = false;
            timerType.longBreakOn = false;
            timerType.shortBreakOn = true;
            
            startPomodoro(shortBreakTime.dataset.default_short_break, shortBreakTime.id);
            
        break;
        case 'short-break':

            timerType.shortBreakOn = false;
            timerType.sessionIsOn = false;
            timerType.longBreakOn = true;
             
            startPomodoro(longBreakTime.dataset.default_long_break,longBreakTime.id);
        break;
        case 'long-break':
            timerType.shortBreakOn = false;
            timerType.sessionIsOn = true;
            timerType.longBreakOn = false;
            startPomodoro(sessionTime.dataset.default_session,sessionTime.id);
        break;
        
    }
     
}
function doGoalsCount(element) {
    switch(element){
        case 'pomodoro-timer':

            timerType.sessionIsOn = false;
            timerType.shortBreakOn = true;
            checkGoals();
            
            startPomodoro(shortBreakTime.dataset.default_short_break, shortBreakTime.id);
            
        break;
        case 'short-break':

            timerType.shortBreakOn = false;
            timerType.sessionIsOn = true;
             
            startPomodoro(sessionTime.dataset.default_session,sessionTime.id);
        break;
        
    }
    if(lengthSessions < 0){
         
           timerType.sessionIsOn = false;
           timerType.shortBreakOn = false;
           timerType.longBreakOn = true;
        
           startPomodoro(longBreakTime.dataset.default_long_break,longBreakTime.id);
    }
}
function checkGoals(){
    if(pomdoroGoals.children.length > 0){
        pomdoroGoals.children[lengthSessions].classList.add('finished');
        lengthSessions--;
    }
    return;
}
function pomodroSessionsLength(){
   return pomdoroGoals.children.length;
}
function displayTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const timer = document.getElementById('pomodoro__timer');
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timer.textContent = display; 
}
function pauseTimer(){
        clearInterval(countdown);
        if(timerType.sessionIsOn){
         
            sessionTime.dataset.session = secondsLeft;
            
        }else if(timerType.shortBreakOn) {
            shortBreakTime.dataset.short_break = secondsLeft;
            
        } else if(timerType.longBreakOn) {
            longBreakTime.dataset.long_break = secondsLeft;
             
        }
    
}
function resetTimer(){
    clearInterval(countdown);
    if(timerType.sessionIsOn){
         
        sessionTime.dataset.session = sessionTime.dataset.default_session;
        displayTime(sessionTime.dataset.session);
    }else if(timerType.shortBreakOn) {
        shortBreakTime.dataset.short_break = shortBreakTime.dataset.default_short_break;
        displayTime(shortBreakTime.dataset.short_break);
    } else if(timerType.longBreakOn) {
        longBreakTime.dataset.long_break = longBreakTime.dataset.default_long_break;
        displayTime(longBreakTime.dataset.long_break);
    }
}

function pomodoroSetting(){
    settingsContainer.style.display = 'block';
}
function closeMenu(){
    settingsContainer.style.display = 'none';
}
function addCustomTimes(e){
   switch(e.target.id){
       case 'session-length':
            
            sessionTimerLength.textContent = `${e.target.value} minutes`;
       break;
       case 'short-break-length':
             
            shortBreakTimerLength.textContent =  `${e.target.value} minutes`;
       break;
       case 'long-break-length':
             
            longBreakLengthTimer.textContent =  `${e.target.value} minutes`;
       break;
       case 'pomodoro-goal':
           
           pomodoroSessionsAmount.textContent = `${e.target.value} sessions`;
       break;
   }
} 
function saveChanges(){
    document.getElementById('pomodoro-timer').dataset.updated_session = parseInt(sessionTimerLength.textContent.trim().slice(0,2) * 60);
    document.getElementById('short-break').dataset.updated_short = parseInt(shortBreakTimerLength.textContent.trim().slice(0,2) * 60);
    document.getElementById('long-break').dataset.updated_long = parseInt(longBreakLengthTimer.textContent.trim().slice(0,2) * 60);
    updatePomodoroSessions()
    settingsContainer.style.display = 'none';
}
function updatePomodoroSessions(){
   
    removePreviousSessions(pomdoroGoals)
    const sessionsLength = pomodoroSessionsAmount.textContent.trim().slice(0,1) 
     
    for(let i = 0; i < sessionsLength; i++){
        const span = document.createElement('span');
        span.classList.add('pomodoro__pic');
        pomdoroGoals.appendChild(span);  
    }
    isGoalsSet = true;
    lengthSessions = pomodroSessionsLength() - 1;
}
     
function removePreviousSessions(pomdoroGoals){
    if(pomdoroGoals.children.length > 0) {
        pomdoroGoals.innerHTML = '';
    } 

}
function initiateTimerType(e){
    switch(e.target.id){
        case 'pomodoro-timer':
            
             startPomodoro(sessionTime.dataset.default_session,e.target.id)
             timerType.longBreakOn = false;
             timerType.sessionIsOn = true;
             timerType.shortBreakOn = false;
        break;
        case 'short-break':
            
             startPomodoro(shortBreakTime.dataset.default_short_break,e.target.id)
             timerType.longBreakOn = false;
             timerType.sessionIsOn = false;
             timerType.shortBreakOn = true;
        break;
        case 'long-break':
            
            startPomodoro(longBreakTime.dataset.default_long_break,e.target.id);
            timerType.longBreakOn = true;
             timerType.sessionIsOn = false;
             timerType.shortBreakOn = false;
        break;
}
 
}

document.getElementById('start').addEventListener('click',startTimer);
document.getElementById('pause').addEventListener('click',pauseTimer);
document.getElementById('reset').addEventListener('click',resetTimer);
menuBtn.addEventListener('click',pomodoroSetting);

document.querySelectorAll('.buttons').forEach(button => button.addEventListener('click', initiateTimerType));

cancelChangesBtn.addEventListener('click',closeMenu);
document.querySelectorAll('input').forEach(input => input.addEventListener('change',addCustomTimes));
document.querySelectorAll('input').forEach(input => input.addEventListener('mousemove',addCustomTimes));
document.getElementById('save').addEventListener('click',saveChanges);
