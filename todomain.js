let taskInp = document.getElementById('taskInp')
let list = document.getElementById('taskList')
let add = document.getElementById('addTask')

function createOption (element, className, txt, func) {
  let btn = document.createElement(element)
  btn.setAttribute('class', className)
  btn.textContent = txt
  btn.addEventListener('click', func)
  return btn
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
    newTask.append(createOption('button', 'delete', '\u2718', (e) => e.target.parentNode.parentNode.removeChild(e.target.parentNode)))
    newTask.append(createOption('button', 'complete', '\u2714', completeTask))
    newTask.append(createOption('button', 'edit', '\u270D', editTask))
    newTask.append(createOption('button', 'addNote', '\u271A Note', editNote))
    newTask.setAttribute('class', 'active')
    if (list.children.length < 1) list.appendChild(newTask)
    else list.insertBefore(newTask, list.childNodes[0])
  }
  taskInp.value = ''
  taskInp.focus()
}

function completeTask (e) {
  let task = e.target.parentNode
  let edit = task.querySelector('.edit')
  let note = task.querySelector('.addNote')
  let isActive = task.getAttribute('class') === 'active'
  task.setAttribute('class', isActive ? 'inactive' : 'active')
  edit.disabled = isActive
  note.disabled = isActive
  e.target.textContent = isActive ? '\u27F3' : '\u2714'
  if (isActive) list.insertBefore(task, list.lastChild.nextSibling)
  else list.insertBefore(task, list.firstChild)
  taskInp.focus()
}

function editTask (e) {
  let editBox = e.target.parentNode.firstChild
  let isEdit = editBox.getAttribute('class') === 'editMode'
  editBox.setAttribute('class', isEdit ? 'noEdit' : 'editMode')
  editBox.parentNode.querySelector('.complete').disabled = !isEdit
  editBox.parentNode.querySelector('.delete').disabled = !isEdit
  editBox.parentNode.querySelector('.edit').textContent = isEdit ? '\u270D' : 'Ok'
  editBox.disabled = isEdit
  if (isEdit) taskInp.focus()
  else editBox.focus()
}

function editNote (e) {
  let noteBox
  let noNote = e.target.textContent === '\u271A Note'
  noteBox = noNote ? document.createElement('textarea') : e.target.parentNode.querySelector('textarea')
  if (noNote) noteBox.setAttribute('class', 'noteEdit')
  let isEditable = noteBox.getAttribute('class') === 'noteEdit'
  e.target.textContent = 'Done'
  e.target.parentNode.style.height = noNote ? '150px' : 'auto'
  if (noNote || !isEditable) e.target.parentNode.appendChild(noteBox)
  noteBox.parentNode.querySelector('.complete').disabled = isEditable
  noteBox.parentNode.querySelector('.delete').disabled = isEditable
  if (!noNote) {
    noteBox.parentNode.querySelector('.complete').disabled = !isEditable
    noteBox.parentNode.querySelector('.delete').disabled = !isEditable
    e.target.parentNode.style.height = isEditable ? 'auto' : '150px'
    noteBox.setAttribute('class', isEditable ? 'noteDone' : 'noteEdit')
    let noVal = noteBox.value.trim() === ''
    if (noVal) noteBox.parentNode.removeChild(noteBox)
    e.target.textContent = (isEditable ? (noVal ? '\u271A Note' : String.fromCodePoint(128065) + ' Note') : 'Done')
  }
  noteBox.focus()
}

function enter (e, f = null, para = e) {
  if (e.code === 'Enter') f(para)
}

taskInp.value = ''
add.addEventListener('click', (e) => addItem(taskInp.value.trim()))
taskInp.addEventListener('keydown', (e) => enter(e, addItem, taskInp.value.trim()))
taskInp.focus()
