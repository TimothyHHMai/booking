// Initialization
let currChoices = {};
let currStep = null;
let numStep = 0;
let calendarStep = null;
console.log("initialization");

// Steps

function highlightStep(event) {
    let steps = document.querySelectorAll('.step');
        
    steps.forEach(step => step.classList.remove('highlighted'));

    event.target.classList.add('highlighted');

    
    currStep = event.target.id;
    console.log('currStep: ' + currStep);
    
    updateChoicesDisplay();
}
function addStep() {
    let contentDiv = document.querySelector('.content');
    
    if (numStep > 0) {
        let arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.innerHTML = '&#10132;';
        contentDiv.appendChild(arrow);
        contentDiv.appendChild(arrow);
    }
    
    let newStep = document.createElement('div');
    newStep.id = numStep;
    newStep.className = 'step';
    newStep.contentEditable = false;
    newStep.innerText = 'New Step';
    
    newStep.addEventListener('click', highlightStep);

    newStep.addEventListener('dblclick', () => {
        newStep.contentEditable = true;
        newStep.focus();
    });

    contentDiv.appendChild(newStep);
    highlightStep({target: newStep});

    currStep = numStep;
    
    // delete_this
    console.log("added numStep:" + numStep);
    numStep++;
}

function removeStep() {
    console.log("removeStep");

    if (numStep < 0) {
        window.alert("Atleast one step is required")
        return;
    }
    numStep--;

    // delete from collection
    let keys = Object.keys(currChoices);
    let lastKey = keys[keys.length - 1];
    delete currChoices[lastKey];

    // delete from screen + calendar
    popStep();
    if (calendarStep == numStep) {
        const calendar = document.querySelector('.calendar');
        calendar.style.display = 'none';
        calendarStep = -1;
    }

}
function popStep() {
    let contentDiv = document.querySelector('.content');
    
    let lastStep = document.getElementById(numStep);
    if (lastStep) {
        contentDiv.removeChild(lastStep);
    }

    let arrows = contentDiv.querySelectorAll('.arrow');
        contentDiv.removeChild(arrows[arrows.length - 1]);
    if (numStep > 0) {
        
    }

    console.log("popped step, now numStep:" + numStep);
}
window.onload = function() {
    addStep(); 
    addStep();
    addStep(); 
}

// Choices
function highlightChoice(event) {
    let choices = document.querySelectorAll('.choice');
        
    let wrappers = document.querySelectorAll('.choice-wrapper');
    wrappers.forEach(wrapper => wrapper.classList.remove('highlighted'));

    let targetWrapper = event.target.closest('.choice-wrapper');
    if (targetWrapper) {
        targetWrapper.classList.add('highlighted');
    }
}
function addChoice() {
    if (calendarStep == currStep) {
        openModal("alertChoice");

    } else { 

        let serviceDiv = document.querySelector('.choices-container');

        if (!currChoices[currStep]) {
            currChoices[currStep] = [];
        }

        // Wrapper
        let choiceWrapper = document.createElement('div');
        choiceWrapper.className = 'choice-wrapper';

        // Choice element
        let newOption = document.createElement('div');
        newOption.className = 'choice';
        newOption.contentEditable = false;
        newOption.innerText = 'New option';

        newOption.addEventListener('click', highlightChoice);
        newOption.addEventListener("input", () => saveChoices());
        newOption.addEventListener('dblclick', () => {
            newOption.contentEditable = true;
            newOption.focus();
        });

        // Delete button
        let deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', () => {
            const index = currChoices[currStep].indexOf(newOption.innerText);
            if (index > -1) {
                currChoices[currStep].splice(index, 1);
            }
            updateChoicesDisplay(); 
        });

        // Append everything
        choiceWrapper.appendChild(newOption);
        choiceWrapper.appendChild(deleteBtn);
        serviceDiv.appendChild(choiceWrapper);

        currChoices[currStep].push(newOption.innerText);
        highlightChoice({target: newOption});
    }
}
function saveChoices() {
    let serviceDiv = document.querySelector('.choices-container');
    let allChoices = Array.from(serviceDiv.children).map(child => child.innerText.trim());
    currChoices[currStep] = allChoices;
}
function updateChoicesDisplay() {
    console.log("updateChoicesDisplay");
    console.log("calendarStep:" + calendarStep);

    let serviceDiv = document.querySelector('.choices-container');
    serviceDiv.innerHTML = '';

    if (currChoices[currStep]) {
        currChoices[currStep].forEach((choiceText, index) => {
            let choiceWrapper = document.createElement('div');
            choiceWrapper.className = 'choice-wrapper';

            let choice = document.createElement('div');
            choice.className = 'choice';
            choice.contentEditable = false;
            choice.innerText = choiceText;

            choice.addEventListener("input", () => {
                currChoices[currStep][index] = choice.innerText;
            });
            choice.addEventListener('click', highlightChoice);
            choice.addEventListener('dblclick', () => {
                choice.contentEditable = true;
                choice.focus();
            });

            // Delete button
            let deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.addEventListener('click', () => {
                currChoices[currStep].splice(index, 1);
                updateChoicesDisplay();
            });

            choiceWrapper.appendChild(choice);
            choiceWrapper.appendChild(deleteBtn);
            serviceDiv.appendChild(choiceWrapper);
        });
    }

    if (calendarStep !== null) {
        const calendar = document.querySelector('.calendar');
        calendar.style.display = (calendarStep == currStep) ? 'flex' : 'none';
    }
}

function addCalendar() {
    const calendar = document.querySelector('.calendar');
    calendar.style.display = (calendar.style.display === 'none' || calendar.style.display === '') ? 'flex' : 'none';
    calendarStep = (calendarStep === currStep) ? -1 : currStep;
    console.log("calendarStep:" + calendarStep);
}

function addInfo() {
    console.log("addInfo");
    openModal("modalInfo");
}


// testing
/*
function selection () {
    document.getElementById('confirmButton').style.display = 'block';
}


function highlightStep(event) {
    let steps = document.querySelectorAll('.step');
    
    steps.forEach(step => step.classList.remove('highlighted'));

    event.target.classList.add('highlighted');
}


function highlightNextStep() {
    let steps = document.querySelectorAll('.step');
    let choicesStep = steps[0];
    choicesStep.classList.remove('highlighted');
    for (let i = 1; i < steps.length; i++) {
        if (!steps[i].classList.contains('highlighted')) {
            steps[i].classList.add('highlighted');
            break;
        }
    }

}

function confirmSelection() {
    highlightNextStep();
    document.querySelector('.choices-container').style.display = 'none';
    document.getElementById('confirmButton').style.display = 'none';
}
    */

// calendar
const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString
    ('default', {month: 'long', year: 'numeric'});
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    for(let i = firstDayIndex; i > 0; i--){
        const prevDate = new Date(currentYear,currentMonth, 0 - i + 1);
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    for(let i = 1; i <= totalDays; i++){
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().
        toDateString() ? 'active' : '';
        datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

    for(let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHTML;
}
updateCalendar();


prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
})

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
})

function openModal(name) {
  document.getElementById(name).style.display = "block";
}

function closeModal(name) {
  document.getElementById(name).style.display = "none";
}

function submitInput() {
  const input = document.getElementById("userInput").value;
  alert("You typed: " + input);
  closeModal();
}

window.onclick = function(event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
    closeModal();
  }
}

