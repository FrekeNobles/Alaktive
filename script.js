// Element Selection
const checkbox = document.getElementById("todo-complete");
const card = document.querySelector(".card");
const taskStatus = document.querySelector(".status");
const timeRemainingElement = document.querySelector(".time-remaining");
const dueDateEl = document.querySelector(".due-date");
const priorityEl = document.querySelector(".priority");
const editButton = document.querySelector(".edit-btn");
const deleteButton = document.querySelector(".delete-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".save-btn");

// Display elements
const titleEl = document.querySelector(".title");
const descriptionEl = document.querySelector(".description");

// Edit inputs
const titleInput = document.querySelector(".edit-title");
const descriptionInput = document.querySelector(".edit-description");
const prioritySelect = document.querySelector(".edit-priority");
const dateInput = document.querySelector(".edit-due-date");
const statusSelect = document.querySelector(".edit-status");

// View/edit pairs to toggle [ viewEl, editEl ]
const editPairs = [
  [titleEl, titleInput],
  [descriptionEl, descriptionInput],
  [priorityEl, prioritySelect],
  [dueDateEl, dateInput],
  [taskStatus, statusSelect],
  [editButton, saveBtn],
  [deleteButton, cancelBtn],
];

// CHECKBOX BEHAVIOUR
checkbox.addEventListener("change", () => {
  const isDone = checkbox.checked;
  card.classList.toggle("completed", isDone);
  taskStatus.textContent = isDone ? "Done" : "Pending";
  taskStatus.dataset.status = isDone ? "done" : "pending";
});

// TIME REMAINING LOGIC
function updateTimeRemaining() {
  const dueDate = new Date(dueDateEl.getAttribute("datetime"));
  const now = new Date();
  const diff = dueDate - now;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  let text = "";

  if (diff <= 0) {
    const overdueHours = Math.abs(hours);
    text = overdueHours < 1 ? "Due now!" : `Overdue by ${overdueHours} hour${overdueHours > 1 ? "s" : ""}`;
  } else if (days >= 1) {
    text = days === 1 ? "Due tomorrow" : `Due in ${days} days`;
  } else if (hours >= 1) {
    text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    text = `Due in ${minutes} min${minutes > 1 ? "s" : ""}`;
  }

  timeRemainingElement.textContent = text;
  timeRemainingElement.setAttribute("datetime", dueDateEl.getAttribute("datetime"));
}

updateTimeRemaining();
setInterval(updateTimeRemaining, 30000);

// PRIORITY STYLING
const priorityMap = {
  high: "High",
  medium: "Medium",
  low: "Low"
};

function applyPriorityStyles() {
  const priority = priorityEl.dataset.priority;

  priorityEl.textContent = priorityMap[priority] ?? priority;

  card.classList.remove("priority-high", "priority-medium", "priority-low");
  priorityEl.classList.remove("priority-high", "priority-medium", "priority-low");

  card.classList.add(`priority-${priority}`);
  priorityEl.classList.add(`priority-${priority}`);
}

applyPriorityStyles();

// ENTER / EXIT EDIT MODE
function enterEditMode() {
  // Populate inputs with current values
  titleInput.value = titleEl.textContent.trim();
  descriptionInput.value = descriptionEl.textContent.trim();
  prioritySelect.value = priorityEl.dataset.priority;
  statusSelect.value = taskStatus.dataset.status;

  const rawDate = dueDateEl.getAttribute("datetime");
  dateInput.value = rawDate.slice(0, 16);

  // Toggle all pairs
  editPairs.forEach(([view, edit]) => {
    view.hidden = true;
    edit.hidden = false;
  });

  card.classList.add("editing");
}

function exitEditMode() {
  // Toggle all pairs back
  editPairs.forEach(([view, edit]) => {
    view.hidden = false;
    edit.hidden = true;
  });

  card.classList.remove("editing");
}

// EDIT BUTTON
editButton.addEventListener("click", enterEditMode);

// CANCEL BUTTON
cancelBtn.addEventListener("click", exitEditMode);

// SAVE BUTTON
saveBtn.addEventListener("click", () => {
  // Update title
  titleEl.textContent = titleInput.value.trim();

  // Update description
  descriptionEl.textContent = descriptionInput.value.trim();

  // Update priority
  priorityEl.dataset.priority = prioritySelect.value;
  applyPriorityStyles();

  // Update status
  const newStatus = statusSelect.value;
  const statusMap = {
    pending: "Pending",
    "in-progress": "In Progress",
    done: "Done"
  };
  taskStatus.textContent = statusMap[newStatus] ?? newStatus;
  taskStatus.dataset.status = newStatus;

  // Update due date
  const newDate = dateInput.value;
  if (newDate) {
    const isoDate = new Date(newDate).toISOString();
    dueDateEl.setAttribute("datetime", isoDate);
    dueDateEl.textContent = `Due ${new Date(newDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })}`;
    updateTimeRemaining();
  }

  exitEditMode();
});

// DELETE BUTTON
deleteButton.addEventListener("click", () => {
  window.alert("This would delete the task");
});

// //Element Selection
// const checkbox = document.getElementById("todo-complete");
// const card = document.querySelector(".card");
// const taskStatus = document.querySelector(".status");
// const timeRemainingElement = document.querySelector(".time-remaining");
// const dueDateElement = document.querySelector(".due-date");
// const priorityElement = document.querySelector(".priority");
// const editButton = document.querySelector(".edit-btn");
// const deleteButton = document.querySelector(".delete-btn")
// const cancelBtn = document.querySelector(".cancel-btn");
// const saveBtn = document.querySelector(".save-btn");
// const statusSelect = document.querySelector(".status-select");
// // Display elements
// const titleEl = document.querySelector(".title");
// const descriptionEl = document.querySelector(".description");
// const priorityEl = document.querySelector(".priority");
// const dueDateEl = document.querySelector(".due-date");
// // Form elements
// const titleInput = document.querySelector("#edit-title");
// const descriptionInput = document.querySelector("#edit-description");
// const prioritySelect = document.querySelector("#edit-priority");
// const dateInput = document.querySelector("#edit-date");


// //CHECKBOX BEHAVIOUR
// checkbox.addEventListener("change", () => {
//   card.classList.toggle("completed", checkbox.checked);

//   if (checkbox.checked) {
//     taskStatus.textContent = "Done";
//     taskStatus.dataset.status = "done";
//   } else {
//     taskStatus.textContent = "Pending";
//     taskStatus.dataset.status = "pending";
//   }
// });

// // TIME REMAINING LOGIC
// function updateTimeRemaining() {
//   const dueDate = new Date(dueDateElement.getAttribute("datetime"));
//   const now = new Date();

//   const diff = dueDate - now;

//   const minutes = Math.floor(diff / (1000 * 60));
//   const hours = Math.floor(diff / (1000 * 60 * 60));
//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));

//   let text = "";

//   if (diff <= 0) {
//     const overdueHours = Math.abs(hours);
//     if (overdueHours < 1) {
//       text = "Due now!";
//     } else {
//       text = `Overdue by ${overdueHours} hour${overdueHours > 1 ? "s" : ""}`;
//     }
//   } else if (days >= 1) {
//     text = days === 1 ? "Due tomorrow" : `Due in ${days} days`;
//   } else if (hours >= 1) {
//     text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
//   } else {
//     text = `Due in ${minutes} min${minutes > 1 ? "s" : ""}`;
//   }

//   timeRemainingElement.textContent = text;
//   timeRemainingElement.setAttribute("datetime", dueDateElement.getAttribute("datetime"));
// }

// // Run immediately
// updateTimeRemaining();

// // Update every 60 seconds
// setInterval(updateTimeRemaining, 30000);



// // PRIORITY STYLING

// const priorityMap = {
//   high: "High",
//   medium: "Medium",
//   low: "Low"
// };

// function applyPriorityStyles() {
//   const priority = priorityElement.dataset.priority;

//   priorityElement.textContent = priorityMap[priority] ?? priority;

//   card.classList.remove("priority-high", "priority-medium", "priority-low");
//   priorityElement.classList.remove("priority-high", "priority-medium", "priority-low");

//   card.classList.add(`priority-${priority}`);
//   priorityElement.classList.add(`priority-${priority}`);
// }

// applyPriorityStyles();


// //EDIT AND DELETE BUTTONS ALERT


// editButton.addEventListener("click", () => {
//     // Fill inputs with current values
//   titleInput.value = titleEl.textContent;
//   descriptionInput.value = descriptionEl.textContent;

//   prioritySelect.value = priorityEl.dataset.priority;

//   // Convert datetime to input format
//   const rawDate = dueDateEl.getAttribute("datetime");
//   const formatted = rawDate.slice(0, 16); // "YYYY-MM-DDTHH:MM"
//   dateInput.value = formatted;
//     // Enter edit mode
//   card.classList.add("editing");
// });

// // Exit edit mode
// cancelBtn.addEventListener("click", () => {
//   card.classList.remove("editing");
// });

// //Save edited file to DOM
// saveBtn.addEventListener("click", () => {
//   // Update title
//   titleEl.textContent = titleInput.value;

//   // Update description
//   descriptionEl.textContent = descriptionInput.value;

//   // Update priority
//   const newPriority = prioritySelect.value;
//   priorityEl.dataset.priority = newPriority;
//   priorityEl.textContent = newPriority.charAt(0).toUpperCase() + newPriority.slice(1);

//   applyPriorityStyles(); // reuse your existing function

//   // Update due date
//   const newDate = dateInput.value;

//   if (newDate) {
//     const isoDate = new Date(newDate).toISOString();
//     dueDateEl.setAttribute("datetime", isoDate);

//     // Update visible text (simple format)
//     dueDateEl.textContent = `Due ${new Date(newDate).toDateString()}`;
//   }

//   // Exit edit mode
//   card.classList.remove("editing");
// });

// deleteButton.addEventListener ("click", () => {
//     window.alert("This would delete the task")
// })

