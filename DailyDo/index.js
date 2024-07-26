
function createTaskElement(taskDescription) {

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  containerDiv.style.marginBottom = '10px';
  containerDiv.style.alignItems = 'center';

  // Create the first inner div with the tick button
  const tickDiv = document.createElement('div');
  tickDiv.style.display = 'flex';
  const tickButton = document.createElement('button');
  tickButton.classList.add('tick');
  tickDiv.appendChild(tickButton);

  // Create the second inner div with the tag-like text
  const tagDiv = document.createElement('div');
  tagDiv.style.display = 'flex';
  tagDiv.style.justifyContent = 'center';
  tagDiv.style.alignItems = 'center';
  tagDiv.style.flexGrow = '1';
  const tagSpan = document.createElement('span');
  tagSpan.classList.add('tag');
  tagSpan.textContent = taskDescription;
  tagDiv.appendChild(tagSpan);

  // Create the horizontal line (hr element)
  const hrElement = document.createElement('hr');

  // Append the inner divs and the hr to the container div
  containerDiv.appendChild(tickDiv);
  containerDiv.appendChild(tagDiv);
  containerDiv.appendChild(hrElement);


  document.body.appendChild(containerDiv);

  // Add the task to an array in Local Storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskDescription);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Add a click event listener to toggle task completion and remove it after 1 second
  containerDiv.addEventListener('click', () => {
    containerDiv.classList.toggle('completed');

    // Remove the task from the array in Local Storage
    const updatedTasks = tasks.filter(task => task !== taskDescription);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTimeout(() => {
      containerDiv.remove();
    }, 1000);
  });

  return containerDiv;
}

// Function to handle populating the task list on page load
function populateTaskList() {
  const taskList = document.getElementById('taskList');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    // Check if the task already exists in the task list
    const existingTasks = taskList.querySelectorAll('.tag');
    const isTaskExist = Array.from(existingTasks).some(existingTask => existingTask.textContent === task);

    if (!isTaskExist) {
      const newTaskElement = createTaskElement(task);
      taskList.appendChild(newTaskElement);
    }
  });
}

// Function to handle adding a new task
function addTask() {
  const newTaskInput = document.getElementById('newTaskInput');
  const taskDescription = newTaskInput.value.trim();

  if (taskDescription !== '') {
    const taskList = document.getElementById('taskList');
    const newTaskElement = createTaskElement(taskDescription);
    taskList.appendChild(newTaskElement);
    newTaskInput.value = ''; // Clear the input field after adding the task
  }
}

// Add event listeners for the "add" button and input field
document.getElementById('add').addEventListener('click', addTask);
document.getElementById('newTaskInput').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Populate the task list on page load
window.addEventListener('load', populateTaskList);