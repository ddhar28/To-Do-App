let taskInp = document.getElementById('taskInp')
let list = document.getElementById('taskList')
let add = document.getElementById('addTask')

function createOptions () {
  let complete = document.createElement('button')
  complete.setAttribute('class', 'complete')
  complete.textContent = '\u2714'
  complete.addEventListener('click', (e) => completeTask(e))

  let del = document.createElement('button')
  del.setAttribute('class', 'delete')
  del.textContent = '\u2718'
  del.addEventListener('click', (e) => e.target.parentNode.parentNode.removeChild(e.target.parentNode))

  let edit = document.createElement('button')
  edit.setAttribute('class', 'edit')
  edit.textContent = '\u270D'
  edit.addEventListener('click', (e) => editTask(e))

  return [del, complete, edit]
}

function addItem (task) {
  if (task !== '') {
    // list.style.backgroundColor = 'rgba(255,127,80,0)'
    let newTask = document.createElement('li')
    let taskName = document.createElement('input')
    taskName.value = task
    taskName.setAttribute('class', 'noEdit')
    taskName.addEventListener('keydown', (e) => {
      taskName.setAttribute('class', 'editMode')
      enter(e, editTask)
    })
    taskName.disabled = true
    newTask.appendChild(taskName)
    newTask.append(...createOptions())
    newTask.setAttribute('class', 'active')
    list.appendChild(newTask)
  }
  taskInp.value = ''
  taskInp.focus()
}

function completeTask (e) {
  let task = e.target.parentNode
  let edit = e.target.parentNode.querySelector('.edit')

  if (task.getAttribute('class') === 'active') {
    task.setAttribute('class', 'inactive')
    edit.disabled = true
    e.target.textContent = '\u27F3'
  } else if (task.getAttribute('class') === 'inactive') {
    task.setAttribute('class', 'active')
    edit.disabled = false
    e.target.textContent = '\u2714'
  }
  taskInp.focus()
}

function editTask (e) {
  let editBox = e.target.parentNode.firstChild
  if (editBox.getAttribute('class') === 'noEdit') {
    editBox.setAttribute('class', 'editMode')
    editBox.parentNode.querySelector('.complete').disabled = true
    editBox.parentNode.querySelector('.delete').disabled = true
    e.target.textContent = 'Ok'
    editBox.disabled = false
    editBox.focus()
  } else if (editBox.getAttribute('class') === 'editMode') {
    editBox.setAttribute('class', 'noEdit')
    editBox.parentNode.querySelector('.edit').textContent = '\u270D'
    editBox.parentNode.querySelector('.complete').disabled = false
    editBox.parentNode.querySelector('.delete').disabled = false
    editBox.disabled = true
    taskInp.focus()
  }
}

function enter (e, f = null, para = e) {
  if (e.code === 'Enter') f(para)
}

taskInp.value = ''
add.addEventListener('click', () => addItem(taskInp.value.trim()))
taskInp.addEventListener('keydown', (e) => enter(e, addItem, taskInp.value.trim()))
taskInp.focus()
