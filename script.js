// =========================
// ELEMENT SELECTION
// =========================
const card = document.querySelector(".card");

const checkbox = document.querySelector(".complete-toggle");
const statusEl = document.querySelector(".status");
const statusControl = document.querySelector(".status-control");

const titleEl = document.querySelector(".title");
const descriptionEl = document.querySelector(".description");
const dueDateEl = document.querySelector(".due-date");
const timeRemainingEl = document.querySelector(".time-remaining");
const overdueEl = document.querySelector(".overdue-indicator");

const priorityEl = document.querySelector(".priority");

const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".delete-btn");
const saveBtn = document.querySelector(".save-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const description = document.querySelector(".description");
const collapsibleSection = document.querySelector(".collapsible-section");
const expandToggle = document.querySelector(".expand-toggle");

// Edit inputs
const titleInput = document.querySelector(".edit-title");
const descriptionInput = document.querySelector(".edit-description");
const prioritySelect = document.querySelector(".edit-priority");
const dateInput = document.querySelector(".edit-due-date");

// =========================
// PRIORITY SYSTEM
// =========================
const priorityMap = {
  high: "High",
  medium: "Medium",
  low: "Low"
};

function applyPriorityStyles() {
  const priority = priorityEl.dataset.priority;

  priorityEl.textContent = priorityMap[priority];

  card.classList.remove("priority-high", "priority-medium", "priority-low");
  priorityEl.classList.remove("priority-high", "priority-medium", "priority-low");

  card.classList.add(`priority-${priority}`);
  priorityEl.classList.add(`priority-${priority}`);
}

applyPriorityStyles();

// =========================
// STATUS SYSTEM
// =========================
function updateStatus(newStatus) {
  const statusMap = {
    pending: "Pending",
    "in-progress": "In Progress",
    done: "Done"
  };

  statusEl.textContent = statusMap[newStatus];
  statusEl.dataset.status = newStatus;
  card.dataset.status = newStatus;

  // Sync checkbox
  checkbox.checked = newStatus === "done";

  // Completed styles
  card.classList.toggle("completed", newStatus === "done");
}

// Dropdown change
statusControl.addEventListener("change", () => {
  updateStatus(statusControl.value);
});

// Checkbox change
checkbox.addEventListener("change", () => {
  updateStatus(checkbox.checked ? "done" : "pending");
});

// =========================
// TIME SYSTEM (UPGRADED)
// =========================
let timer;

function updateTime() {
  const status = statusEl.dataset.status;

  if (status === "done") {
    timeRemainingEl.textContent = "Completed";
    overdueEl.hidden = true;
    clearInterval(timer);
    return;
  }

  const due = new Date(dueDateEl.getAttribute("datetime"));
  const now = new Date();
  const diff = due - now;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  let text = "";

  if (diff <= 0) {
  card.classList.add("overdue");
} else {
  card.classList.remove("overdue");
}

  if (diff <= 0) {
    overdueEl.hidden = false;

    const overdueHours = Math.abs(hours);

    text = overdueHours < 1
      ? "Due now!"
      : `Overdue by ${overdueHours} hour${overdueHours > 1 ? "s" : ""}`;

  } else {
    overdueEl.hidden = true;

    if (days >= 1) {
      text = days === 1 ? "Due tomorrow" : `Due in ${days} days`;
    } else if (hours >= 1) {
      text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      text = `Due in ${minutes} min${minutes > 1 ? "s" : ""}`;
    }
  }

  timeRemainingEl.textContent = text;
}

function startTimer() {
  updateTime();
  timer = setInterval(updateTime, 30000);
}

startTimer();

// =========================
// EDIT MODE SYSTEM
// =========================
function enterEditMode() {
  // Populate inputs
  titleInput.value = titleEl.textContent.trim();
  descriptionInput.value = descriptionEl.textContent.trim();
  prioritySelect.value = priorityEl.dataset.priority;
  statusControl.value = statusEl.dataset.status;

  const rawDate = dueDateEl.getAttribute("datetime");
  dateInput.value = rawDate.slice(0, 16);

  card.classList.add("editing");
}

function exitEditMode() {
  card.classList.remove("editing");
}

// =========================
// SAVE SYSTEM
// =========================
function saveChanges() {
  // Title
  titleEl.textContent = titleInput.value.trim();

  // Description
  descriptionEl.textContent = descriptionInput.value.trim();
  

  // Priority
  priorityEl.dataset.priority = prioritySelect.value;
  applyPriorityStyles();

  // Status
  updateStatus(statusControl.value);

  // Date
  const newDate = dateInput.value;
  if (newDate) {
    const iso = new Date(newDate).toISOString();
    dueDateEl.setAttribute("datetime", iso);

    dueDateEl.textContent = `Due ${new Date(newDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })}`;
  }

  updateTime();
  startTimer();
  initCollapse();

  exitEditMode();
}

// =========================
// EVENTS
// =========================
editBtn.addEventListener("click", enterEditMode);
cancelBtn.addEventListener("click", exitEditMode);
saveBtn.addEventListener("click", saveChanges);
expandToggle.addEventListener("click", toggleCollapse);

deleteBtn.addEventListener("click", () => {
  alert("This would delete the task");
});

// COLLAPSIBLE DESCRIPTION DISPLAY

function initCollapse() {
  const textLength = description.textContent.trim().length;

  if (textLength > 120) {
    collapsibleSection.classList.add("collapsed");

    expandToggle.hidden = false;
    expandToggle.setAttribute("aria-expanded", "false");
    expandToggle.textContent = "Show more ↓";
  } else {
    expandToggle.hidden = true;
    collapsibleSection.classList.remove("collapsed");
  }
}

function toggleCollapse() {
  const isCollapsed = collapsibleSection.classList.contains("collapsed");

  if (isCollapsed) {
    collapsibleSection.classList.remove("collapsed");
    expandToggle.setAttribute("aria-expanded", "true");
    expandToggle.textContent = "Show less ↑";
  } else {
    collapsibleSection.classList.add("collapsed");
    expandToggle.setAttribute("aria-expanded", "false");
    expandToggle.textContent = "Show more ↓";
  }
}