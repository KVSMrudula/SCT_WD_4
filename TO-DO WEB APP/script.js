document.addEventListener('DOMContentLoaded', () => {
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDateInput = document.getElementById('taskDate');
    const taskTimeInput = document.getElementById('taskTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskListsContainer = document.getElementById('taskLists');

    let tasks = [];

    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    }

    function renderTasks() {
        taskListsContainer.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item' + (task.completed ? ' completed' : '');

            const taskContent = document.createElement('div');
            taskContent.innerHTML = `<strong>${task.title}</strong> <br> <small>${task.date} ${task.time}</small>`;
            
            const buttons = document.createElement('div');
            
            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
            completeBtn.addEventListener('click', () => toggleCompleteTask(index));
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editTask(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            buttons.appendChild(completeBtn);
            buttons.appendChild(editBtn);
            buttons.appendChild(deleteBtn);

            taskItem.appendChild(taskContent);
            taskItem.appendChild(buttons);
            taskListsContainer.appendChild(taskItem);
        });
    }

    function addTask() {
        const taskTitle = taskTitleInput.value.trim();
        const taskDate = taskDateInput.value;
        const taskTime = taskTimeInput.value;

        if (taskTitle === '' || taskDate === '' || taskTime === '') {
            alert('Please enter task title, date, and time');
            return;
        }

        const newTask = {
            title: taskTitle,
            date: formatDate(taskDate),
            time: taskTime,
            completed: false
        };

        tasks.push(newTask);
        renderTasks();

        taskTitleInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
    }

    function toggleCompleteTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function editTask(index) {
        const newTitle = prompt('Edit Task Title:', tasks[index].title);
        const newDate = prompt('Edit Date (dd-mm-yy):', tasks[index].date);
        const newTime = prompt('Edit Time (HH:MM):', tasks[index].time);

        if (newTitle !== null && newDate !== null && newTime !== null) {
            tasks[index].title = newTitle;
            tasks[index].date = newDate;
            tasks[index].time = newTime;
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
});
