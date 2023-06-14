const addBox = document.querySelector('.add-box')
const popupBox = document.querySelector('.popup-box')
const popupTitle = document.querySelector('header p')
const closeIcon = document.querySelector('header i')
const addBtn = document.querySelector('button')
const titleTag = document.querySelector('input')
const descTag = document.querySelector('textarea')
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem('notes') || '[]')
let isUpdate = false, updateId
addBox.addEventListener('click', () => {
    titleTag.focus()
    popupBox.classList.add('show')
})
closeIcon.addEventListener('click', () => {
    isUpdate = false
    titleTag.value = ''
    descTag.value = ''
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add new a Note'
    popupBox.classList.remove('show')
})

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove())
    notes.forEach((note, index) => {
        let listTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index},'${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`
        addBox.insertAdjacentHTML('afterend', listTag)
    })
}
showNotes()

function showMenu(el) {
    el.parentElement.classList.add('show')
    document.addEventListener('click', e => {
        if (e.target.tagName !== 'I' || e.target !== el) {
            el.parentElement.classList.remove('show')
        }
    })
}

function deleteNote(index) {
    notes.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes()
}
function updateNote(index, title, dese) {
    isUpdate = true
    updateId = index
    addBox.click()
    titleTag.value = title
    descTag.value = dese
    addBtn.innerText = 'Update Note';
    popupTitle.innerText = 'Update a Note'
}
addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let noteTitle = titleTag.value
    let noteDes = descTag.value
    if (noteTitle || noteDes) {
        let dateObj = new Date()
        let month = months[dateObj.getMonth()]
        let day = dateObj.getDate()
        let year = dateObj.getFullYear()
        let noteInfo = {
            title: noteTitle,
            description: noteDes,
            date: `${month} ${day}, ${year}`
        }

        if (!isUpdate) {
            notes.push(noteInfo)
        } else {
            isUpdate = false
            notes[updateId] = noteInfo
        }


        localStorage.setItem('notes', JSON.stringify(notes))
        closeIcon.click()
        showNotes()
    }


})



