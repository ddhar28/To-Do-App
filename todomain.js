let taskInp = document.getElementById('taskInp')
let list = document.getElementById('taskList')
let add = document.getElementById('addTask')

function createOptions () {
  let complete = document.createElement('button')
  complete.setAttribute('class', 'complete')
  complete.textContent = '\u2714'
  complete.addEventListener('click', (e) => e.target.parentNode.setAttribute('class', 'inactive'))

  let del = document.createElement('button')
  del.setAttribute('class', 'delete')
  del.textContent = '\u2718'
  del.addEventListener('click', (e) => e.target.parentNode.parentNode.removeChild(e.target.parentNode))

  let edit = document.createElement('button')
  edit.setAttribute('class', 'edit')
  edit.textContent = '\u270D'

  return [del, complete, edit]
}

function addItem (task) {
  if (task !== '') {
    list.style.backgroundColor = 'rgba(255,127,80,0.5)'
    let newTask = document.createElement('li')
    let taskName = document.createElement('span')
    taskName.textContent = task
    newTask.appendChild(taskName)
    newTask.append(...createOptions())
    newTask.setAttribute('class', 'active')
    list.appendChild(newTask)
  }
  taskInp.value = ''
  taskInp.focus()
}

function enter (e) {
  if (e.code === 'Enter') addItem(taskInp.value.trim())
}

// function editTask () {
//   let editBox = document.createElement('input')

// }

taskInp.value = ''
add.addEventListener('click', () => addItem(taskInp.value.trim()))
taskInp.addEventListener('keypress', enter)
taskInp.focus()
