// script.js
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('saveEditButton').addEventListener('click', saveTaskEdit);
document.getElementById('themeToggleButton').addEventListener('click', toggleTheme);
const modal = document.getElementById('editModal');
const closeModal = document.querySelector('.close');
let currentEditTask = null;

closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');

        const li = document.createElement('li');
        li.className = 'task-item';

        const header = document.createElement('div');
        header.className = 'task-header';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', toggleTaskCompletion);

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        const note = document.createElement('span');
        note.className = 'task-note';
        note.textContent = 'Sem observação';

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            openEditModal(li, span, note);
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', removeTask);

        header.appendChild(checkbox);
        header.appendChild(span);
        header.appendChild(editButton);
        header.appendChild(removeButton);

        li.appendChild(header);
        li.appendChild(note);

        taskList.appendChild(li);

        taskInput.value = '';
    }
}

function removeTask(e) {
    const taskItem = e.target.parentElement.parentElement;
    taskItem.remove();
}

function toggleTaskCompletion(e) {
    const taskText = e.target.nextElementSibling;
    if (e.target.checked) {
        taskText.classList.add('completed');
    } else {
        taskText.classList.remove('completed');
    }
}

function openEditModal(taskItem, taskTextElement, taskNoteElement) {
    currentEditTask = {
        taskItem: taskItem,
        taskTextElement: taskTextElement,
        taskNoteElement: taskNoteElement
    };

    document.getElementById('editTaskInput').value = taskTextElement.textContent;
    document.getElementById('editTaskNote').value = taskNoteElement.textContent === 'Sem observação' ? '' : taskNoteElement.textContent;
    
    modal.style.display = 'block';
}

function saveTaskEdit() {
    const editedText = document.getElementById('editTaskInput').value.trim();
    const editedNote = document.getElementById('editTaskNote').value.trim();

    if (editedText !== '') {
        currentEditTask.taskTextElement.textContent = editedText;
        currentEditTask.taskNoteElement.textContent = editedNote || 'Sem observação';
        modal.style.display = 'none';
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggleButton = document.getElementById('themeToggleButton');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeToggleButton.textContent = 'Modo Escuro';
    } else {
        body.classList.add('dark-mode');
        themeToggleButton.textContent = 'Modo Claro';
    }
}
