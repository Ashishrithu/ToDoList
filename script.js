// Querying the elements
const textInput = document.getElementById("textInput");
const addTask = document.getElementById("addTaskbtn");
const taskList = document.getElementById("taskList");

let list = [];

// To store the list in local storage so the data persists on refresh
window.onload = () => {
  const savedTask = localStorage.getItem('todoTasks');  // consistent key name
  if (savedTask) {
    list = JSON.parse(savedTask);
    list.forEach(taskText => createTaskElement(taskText));
  }
};

// On click on add Task button, the input text should be added
addTask.addEventListener("click", addingTask);

function addingTask() {
  if (textInput.value === "") {
    alert("Please enter the task");
  } else {
    const taskText = textInput.value.trim();
    if (!taskText) return; // avoid empty strings or spaces
    
    list.push(taskText);
    saveTasks();

    createTaskElement(taskText);

    // Clear the input text after pushing it to array
    textInput.value = "";
    console.log(list);
  }
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  // Adding edit button to the list
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("ebtn");
  editBtn.addEventListener('click', () => editLi(li, taskText));

  // Adding delete button to the list
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("dbtn");
  delBtn.addEventListener('click', () => delLi(li, taskText));

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function editLi(li, taskText) {
  const index = list.indexOf(taskText);
  if (index === -1) return;

  const oldText = list[index];
  const editText = prompt("Edit your task", oldText);
  if (editText === null) return; // User cancelled prompt

  const newText = editText.trim();
  if (!newText) {
    alert("Task cannot be empty");
    return;
  }

  // Update the array
  list[index] = newText;
  saveTasks();

  // Update UI - replace text and re-add buttons
  li.textContent = newText;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("ebtn");
  editBtn.addEventListener("click", () => editLi(li, newText));

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("dbtn");
  delBtn.addEventListener("click", () => delLi(li, newText));

  li.appendChild(editBtn);
  li.appendChild(delBtn);
}

function delLi(li, taskText) {
  const index = list.indexOf(taskText);
  if (index === -1) return;

  // Remove from array
  list.splice(index, 1);
  saveTasks();

  // Remove from UI
  li.remove();
}

function saveTasks() {
  localStorage.setItem('todoTasks', JSON.stringify(list));
}
