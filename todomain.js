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

  let addNote = document.createElement('button')
  addNote.setAttribute('class', 'addNote')
  addNote.textContent = '\u271A' + ' Note'
  addNote.addEventListener('click', (e) => editNote(e))

  return [del, complete, edit, addNote]
}

function addItem (task) {
  if (task !== '') {
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
  let note = e.target.parentNode.querySelector('.addNote')

  if (task.getAttribute('class') === 'active') {
    task.setAttribute('class', 'inactive')
    edit.disabled = true
    note.disabled = true
    e.target.textContent = '\u27F3'
  } else if (task.getAttribute('class') === 'inactive') {
    task.setAttribute('class', 'active')
    edit.disabled = false
    note.disabled = false
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

function editNote (e) {
  let noteBox
  if (e.target.textContent === ('\u271A Note')) {
    noteBox = document.createElement('textarea')
    noteBox.setAttribute('class', 'noteEdit')
  } else noteBox = e.target.parentNode.querySelector('textarea')
  if (noteBox.getAttribute('class') === 'noteEdit' && e.target.textContent !== 'Done') {
    e.target.parentNode.style.height = '150px'
    e.target.parentNode.appendChild(noteBox)
    noteBox.parentNode.querySelector('.complete').disabled = true
    noteBox.parentNode.querySelector('.delete').disabled = true
    e.target.textContent = 'Done'
    noteBox.focus()
  } else if (e.target.textContent === 'Done') {
    noteBox.parentNode.querySelector('.complete').disabled = false
    noteBox.parentNode.querySelector('.delete').disabled = false
    if (noteBox.value.trim() !== '') {
      e.target.textContent = String.fromCodePoint(128065) + ' Note'
      noteBox.setAttribute('class', 'noteDone')
    } else {
      e.target.textContent = '\u271A Note'
      noteBox.parentNode.removeChild(noteBox)
    }
    e.target.parentNode.style.height = 'auto'
  } else {
    noteBox.setAttribute('class', 'noteEdit')
    editNote(e)
  }
}

function enter (e, f = null, para = e) {
  if (e.code === 'Enter') f(para)
}

taskInp.value = ''
add.addEventListener('click', () => addItem(taskInp.value.trim()))
taskInp.addEventListener('keydown', (e) => enter(e, addItem, taskInp.value.trim()))
taskInp.focus()
