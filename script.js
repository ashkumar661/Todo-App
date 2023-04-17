const form = document.querySelector('form');
const body = document.querySelector('body');
const theme = document.querySelector('.theme');

theme.addEventListener('click',()=>{
    body.classList.toggle('light');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

// add todo function

function addTodo() {
    let todoTitle = document.querySelector('.input-text').value;
    let arr = JSON.parse(localStorage.getItem('Todos'));
    if (arr) {
        arr.push({
            title: todoTitle,
            completed: false
        })
    } else {
        arr = [];
        arr.push({
            title: todoTitle,
            completed: false
        })
    }
    localStorage.setItem('Todos', JSON.stringify(arr));
    document.querySelector('.input-text').value="";
    deleteTodo();
    completeTodo();
    renderTodos(arr, 'all');
}

// update todo function

function updateTodoList() {
    const todoListItems = document.querySelectorAll('.todo-title');
    localStorage.removeItem('Todos');
    const arr = [];
    todoListItems.forEach(element => {
        arr.push({
            title: element.textContent,
            completed: element.classList.contains('completed')
        })
    })
    localStorage.setItem("Todos", JSON.stringify(arr));
}

// delete todo function

function deleteTodo() {
    let removeTodo = document.querySelectorAll('.cross-img');
    removeTodo.forEach(element => {
        element.addEventListener('click', () => {
            element.parentNode.nextElementSibling.remove();
            element.parentNode.remove();
            updateTodoList();
        })
    })
}
deleteTodo();

// toggle complete status

function completeTodo() {
    let listItemComplete = document.querySelectorAll('.list-item-name');
    listItemComplete.forEach(element => {
        element.addEventListener('click', () => {
            element.lastElementChild.classList.toggle('completed');
            element.firstElementChild.firstElementChild.classList.toggle('check-img');
            element.firstElementChild.firstElementChild.classList.toggle('background-bg');
            element.firstElementChild.classList.toggle('gradient-bg');
            updateTodoList();
        })
    })
}

function clearCompleted(){
    document.querySelector('.clear-list').addEventListener('click',()=>{
        const arr = JSON.parse(localStorage.getItem('Todos')).filter(item=>item.completed==false);
        localStorage.removeItem('Todos');
        localStorage.setItem('Todos', JSON.stringify(arr));
    })
}


function showAll() {
    document.querySelector('.list-all').addEventListener('click', () => {
        if (!document.querySelector('.list-all').classList.contains('selected')) {
            const showAllTodos = JSON.parse(localStorage.getItem('Todos'));
            document.querySelector('.list-all').classList.add('selected');
            document.querySelector('.list-completed').classList.remove('selected');
            document.querySelector('.list-active').classList.remove('selected');
            let todos = document.querySelector('.todo-list').children;
            document.querySelector('.todo-list').innerHTML = "";
            renderTodos(showAllTodos, "all");
        }
    })
}

function showCompleted() {
    document.querySelector('.list-completed').addEventListener('click', () => {
        if (!document.querySelector('.list-completed').classList.contains('selected')) {
            const showCompletedTodos = JSON.parse(localStorage.getItem('Todos')).filter(item => item.completed == true);
            document.querySelector('.list-all').classList.remove('selected');
            document.querySelector('.list-completed').classList.add('selected');
            document.querySelector('.list-active').classList.remove('selected');
            let todos = document.querySelector('.todo-list').children;
            document.querySelector('.todo-list').innerHTML = "";
            renderTodos(showCompletedTodos, "completed");
        }
    })
}

function showActive() {
    document.querySelector('.list-active').addEventListener('click', () => {
        if (!document.querySelector('.list-active').classList.contains('selected')) {
            const showActiveTodos = JSON.parse(localStorage.getItem('Todos')).filter(item => item.completed == false);
            document.querySelector('.list-all').classList.remove('selected');
            document.querySelector('.list-completed').classList.remove('selected');
            document.querySelector('.list-active').classList.add('selected');
            let todos = document.querySelector('.todo-list').children;
            document.querySelector('.todo-list').innerHTML = "";
            renderTodos(showActiveTodos, "active");
        }
    })
}

function renderTodos(arr, status) {
    document.querySelector('.todo-list').innerHTML = "";
    if (status === "completed") {
        arr.forEach(todo => {
            let todoItem = document.createElement('div');
            const todoListParent = document.querySelector('.todo-list');
            todoItem.classList.add('list-item');
            todoItem.innerHTML =
                `
                <div class="list-item-name">
                    <div class="list-item-img gradient-bg">
                        <div class="check-img"></div>
                    </div>
                    <p class="todo-title completed">${todo.title}</p>
                </div>
                <img class="cross-img" src="./images/icon-cross.svg" alt="cross svg icon">
                `;
            todoListParent.appendChild(todoItem);
            todoListParent.appendChild(document.createElement('hr'));
        })
    } else if (status === "active") {
        arr.forEach(todo => {
            let todoItem = document.createElement('div');
            const todoListParent = document.querySelector('.todo-list');
            todoItem.classList.add('list-item');
            todoItem.innerHTML =
                `
                <div class="list-item-name">
                    <div class="list-item-img">
                        <div class="background-bg"></div>
                    </div>
                    <p class="todo-title">${todo.title}</p>
                </div>
                <img class="cross-img" src="./images/icon-cross.svg" alt="cross svg icon">
                `;
            todoListParent.appendChild(todoItem);
            todoListParent.appendChild(document.createElement('hr'));
        })
    } else {
        let totalActiveTodos = 0;
        arr.forEach(todo => {
            let todoItem = document.createElement('div');
            const todoListParent = document.querySelector('.todo-list');
            todoItem.classList.add('list-item');
            todoItem.innerHTML =
                `
                <div class="list-item-name">
                    <div class="list-item-img ${todo.completed ? 'gradient-bg' : ''}">
                        <div class="${todo.completed ? 'check-img' : 'background-bg'}"></div>
                    </div>
                    <p class="todo-title ${todo.completed ? 'completed' : ''}">${todo.title}</p>
                </div>
                <img class="cross-img" src="./images/icon-cross.svg" alt="cross svg icon">
                `;
            todoListParent.appendChild(todoItem);
            todoListParent.appendChild(document.createElement('hr'));
            if (!todo.completed) {
                totalActiveTodos += 1;
            }
        })
        if (arr.length < 0) {
            document.querySelector('.list-item-value').textContent = "0";
        } else {
            document.querySelector('.list-item-value').textContent = totalActiveTodos;
        }
        completeTodo();
        deleteTodo();
    }

}

function loadFunctions() {
    const showAllTodos = JSON.parse(localStorage.getItem('Todos'));
    document.querySelector('.list-all').classList.add('selected');
    document.querySelector('.list-completed').classList.remove('selected');
    document.querySelector('.list-active').classList.remove('selected');
    renderTodos(showAllTodos, "all");
    showAll();
    showCompleted();
    showActive();
    completeTodo();
    deleteTodo();
    clearCompleted();
}

document.onload = loadFunctions();