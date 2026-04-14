//Element Selection
const checkbox = document.getElementById("todo-complete");
const card = document.querySelector(".card");
const taskStatus = document.querySelector(".status");
const timeRemainingElement = document.querySelector(".time-remaining");
const dueDateElement = document.querySelector(".due-date");
const priorityElement = document.querySelector(".priority");
const editButton = document.querySelector(".edit-btn");
const deleteButton = document.querySelector(".delete-btn")

//CHECKBOX BEHAVIOUR
checkbox.addEventListener("change", () => {
  card.classList.toggle("completed", checkbox.checked);

  if (checkbox.checked) {
    taskStatus.textContent = "Done";
    taskStatus.dataset.status = "done";
  } else {
    taskStatus.textContent = "Pending";
    taskStatus.dataset.status = "pending";
  }
});

// TIME REMAINING LOGIC
function updateTimeRemaining() {
  const dueDate = new Date(dueDateElement.getAttribute("datetime"));
  const now = new Date();

  const diff = dueDate - now;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  let text = "";

  if (diff <= 0) {
    const overdueHours = Math.abs(hours);
    if (overdueHours < 1) {
      text = "Due now!";
    } else {
      text = `Overdue by ${overdueHours} hour${overdueHours > 1 ? "s" : ""}`;
    }
  } else if (days >= 1) {
    text = days === 1 ? "Due tomorrow" : `Due in ${days} days`;
  } else if (hours >= 1) {
    text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    text = `Due in ${minutes} min${minutes > 1 ? "s" : ""}`;
  }

  timeRemainingElement.textContent = text;
  timeRemainingElement.setAttribute("datetime", dueDateElement.getAttribute("datetime"));
}

// Run immediately
updateTimeRemaining();

// Update every 60 seconds
setInterval(updateTimeRemaining, 60000);



// PRIORITY STYLING

const priorityMap = {
  high: "High",
  medium: "Medium",
  low: "Low"
};

function applyPriorityStyles() {
  const priority = priorityElement.dataset.priority;

  priorityElement.textContent = priorityMap[priority] ?? priority;

  card.classList.remove("priority-high", "priority-medium", "priority-low");
  priorityElement.classList.remove("priority-high", "priority-medium", "priority-low");

  card.classList.add(`priority-${priority}`);
  priorityElement.classList.add(`priority-${priority}`);
}

applyPriorityStyles();


//EDIT AND DELETE BUTTONS ALERT

editButton.addEventListener ("click", () => {
    window.alert("This would pop up edit task modal");
})

deleteButton.addEventListener ("click", () => {
    window.alert("This would delete the task")
})

