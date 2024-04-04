document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            `;
            li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));
            li.querySelector('.editBtn').addEventListener('click', () => editTask(index));
            li.querySelector('input[type="checkbox"]').addEventListener('change', (event) => toggleTaskStatus(index, event.target.checked));
            taskList.appendChild(li);
        });
    }

    // Function to add new task
    function addTask() {
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false });
            renderTasks();
            saveTasks();
            taskInput.value = '';
        }
    }

    // Function to edit task
    function editTask(index) {
        const newName = prompt('Edit task:', tasks[index].name);
        if (newName !== null) {
            tasks[index].name = newName;
            renderTasks();
            saveTasks();
        }
    }

    // Function to delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
        saveTasks();
    }

    // Function to toggle task status
    function toggleTaskStatus(index, checked) {
        tasks[index].completed = checked;
        renderTasks();
        saveTasks();
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for adding a new task
    addTaskBtn.addEventListener('click', addTask);

    // Render tasks when the page loads
    renderTasks();
});
