//Element Selection
const checkbox = document.getElementById("todo-complete");
const card = document.querySelector(".card");
const status = document.querySelector(".status");
const timeRemainingEl = document.querySelector(".time-remaining");
const dueDateEl = document.querySelector(".due-date");
const priorityEl = document.querySelector(".priority");


//CHECKBOX BEHAVIOUR
checkbox.addEventListener("change", () => {
  card.classList.toggle("completed", checkbox.checked);

  if (checkbox.checked) {
    status.textContent = "Done";
    status.dataset.status = "done";
  } else {
    status.textContent = "Pending";
    status.dataset.status = "pending";
  }
});





// PRIORITY STYLING
function applyPriorityStyles() {
  const priority = priorityEl.dataset.priority;

  card.classList.remove("priority-high", "priority-medium", "priority-low");

  if (priority === "high") {
    card.classList.add("priority-high");
  } else if (priority === "medium") {
    card.classList.add("priority-medium");
  } else if (priority === "low") {
    card.classList.add("priority-low");
  }
}

applyPriorityStyles();