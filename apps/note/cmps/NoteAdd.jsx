import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { NoteAddClosed } from "./NoteAddClosed.jsx"
import { NoteAddOpen } from "./NoteAddOpen.jsx"
const { useState } = React

export function NoteAdd({ onAddNote }) {
    const NOTE_TYPES = [
        { type: "NoteTxt", icon: "font", placeholder: "Take a note...", title: "Text note" },
        { type: "NoteTodos", icon: "list", placeholder: "Enter comma-separated todos...", title: "List note" },
        { type: "NoteImg", icon: "image", placeholder: "Enter Image URL...", title: "Image note" },
        { type: "NoteVideo", icon: "video", placeholder: "Enter Video URL...", title: "Video note" },
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote("NoteTxt"))

    function handleTypeChange(ev) {
        const type = ev.currentTarget.dataset.type
        ev.stopPropagation()
        setNoteToAdd(noteService.getEmptyNote(type))
        setIsOpen(true)
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setNoteToAdd(prev => {
            const newInfo = { ...prev.info }
            if (name === "todos") {
                newInfo.todos = value.split(",").map(txt => ({ txt: txt.trim(), doneAt: null }))
            } else {
                newInfo[name] = value
            }
            return { ...prev, info: newInfo }
        })
    }

    function handleSave() {
        const { type, info } = noteToAdd
        const { title, txt, todos, url } = info
        let isEmpty = false

        if (type === "NoteTxt") {
            isEmpty = !title.trim() && !txt.trim()
        } else if (type === "NoteTodos") {
            isEmpty = !title.trim() && (!todos || todos.length === 0 || todos.every(({ txt }) => !txt.trim()))
        } else if (type === "NoteImg" || type === "NoteVideo") {
            isEmpty = !title.trim() && !url.trim()
        }

        if (isEmpty) {
            showErrorMsg("Please enter a title or content")
            return
        }

        noteService.save(noteToAdd).then(savedNote => {
            if (onAddNote) onAddNote(savedNote)
            showSuccessMsg("Note added successfully!")
            setNoteToAdd(noteService.getEmptyNote("NoteTxt"))
            setIsOpen(false)
        })
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        handleSave()
    }

    return (
        <section className="note-add flex">
            {!isOpen ? (
                <NoteAddClosed 
                    noteTypes={NOTE_TYPES} 
                    onOpen={() => setIsOpen(true)} 
                    onTypeClick={handleTypeChange} 
                />
            ) : (
                <NoteAddOpen
                    note={noteToAdd}
                    noteTypes={NOTE_TYPES}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={() => setIsOpen(false)}
                    onTypeClick={handleTypeChange}
                />
            )}
        </section>
    )
}
