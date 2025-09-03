// Get elements from the page
const taskInput = document.getElementById('taskInput'); // input for task name
const addButton = document.getElementById('addBtn'); // button to add task
const taskList = document.getElementById('taskList'); // ul or ol where tasks will appear
const filterButtons = document.querySelectorAll('.filter-btn'); // buttons to filter tasks
const dueDateInput = document.getElementById('dueDate'); // input for due date
const prioritySelect = document.getElementById('priority'); // dropdown for priority
const themeToggle = document.getElementById('themeToggle'); // dark mode toggle

// Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to show tasks on the page
function showTasks() {
    taskList.innerHTML = ''; // clear the list first

    tasks.forEach(function(task, index) {
        // Create a list item
        const li = document.createElement('li');
        li.dataset.index = index; // save index
        li.dataset.priority = task.priority; // save priority
        if(task.completed) {
            li.className = 'completed'; // add completed class if task done
        }

        // Add task text, due date, and buttons
        li.innerHTML = `
            <span>${task.text} (Due: ${task.dueDate || 'N/A'})</span>
            <div>
                <button class="complete-btn">✓</button>
                <button class="delete-btn">✕</button>
            </div>
        `;

        taskList.appendChild(li); // add to the list
    });
}

// Show tasks on page load
showTasks();

// Function to save tasks in localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
addButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if(taskText === '') return; // do nothing if input is empty

    const newTask = {
        text: taskText,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };

    tasks.push(newTask); // add to array
    saveTasks(); // save in localStorage

    // Clear inputs
    taskInput.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'High';

    showTasks(); // update the list
});

// Handle complete and delete buttons
taskList.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if(!li) return;

    const index = li.dataset.index;

    if(e.target.classList.contains('delete-btn')) {
        tasks.splice(index, 1); // remove task
    }

    if(e.target.classList.contains('complete-btn')) {
        tasks[index].completed = !tasks[index].completed; // toggle completed
    }

    saveTasks(); // save changes
    showTasks(); // update list
});

// Filter tasks
filterButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        Array.from(taskList.children).forEach(function(li) {
            li.style.display = 'flex'; // show by default
            if(filter === 'completed' && !li.classList.contains('completed')) {
                li.style.display = 'none'; // hide pending
            }
            if(filter === 'pending' && li.classList.contains('completed')) {
                li.style.display = 'none'; // hide completed
            }
        });
    });
});

// Dark mode toggle
themeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark');
});

// Press Enter key to add task
taskInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        addButton.click();
    }
});
