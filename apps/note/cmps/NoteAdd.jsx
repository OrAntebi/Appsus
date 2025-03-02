import { noteService } from "../services/note.service.js"
import { NoteAddContent } from "./NoteAddContent.jsx"
const { useState } = React

export function NoteAdd({ onAddNote }) {
    var NOTE_TYPES = [
        { type: 'NoteTxt', icon: 'font', placeholder: 'Take a note...', title: 'Text note' },
        { type: 'NoteTodos', icon: 'list', placeholder: 'Enter comma-separated todos...', title: 'List note' },
        { type: 'NoteImg', icon: 'image', placeholder: 'Enter Image URL...', title: 'Image note' },
        { type: 'NoteVideo', icon: 'video', placeholder: 'Enter Video URL...', title: 'Video note' },
    ]

    var [isOpen, setIsOpen] = useState(false)
    var [note, setNote] = useState(noteService.getEmptyNote('NoteTxt'))

    function handleTypeChange(ev, type) {
        ev.stopPropagation()
        setNote(noteService.getEmptyNote(type))
        setIsOpen(true)
    }

    function handleChange(ev) {
        var name = ev.target.name
        var value = ev.target.value
        setNote(function (prev) {
            var newInfo = Object.assign({}, prev.info)
            if (name === 'todos') {
                newInfo[name] = value.split(',').map(function (todo) {
                    return { txt: todo.trim(), doneAt: null }
                })
            } else {
                newInfo[name] = value
            }
            return Object.assign({}, prev, { info: newInfo })
        })
    }

    function handleSave() {
        noteService.save(note).then(function (savedNote) {
            if (onAddNote) {
                onAddNote(savedNote)
            }
            setNote(noteService.getEmptyNote('NoteTxt'))
            setIsOpen(false)
        })
    }

    return (
        <div className="note-add flex align-center justify-center">
            {!isOpen ? (
                <div
                    className="note-closed flex align-center justify-center"
                    onClick={function () { setIsOpen(true) }}
                >
                    <span className="placeholder">Take a note...</span>
                    <div className="icons flex align-center space-between">
                        {NOTE_TYPES.map(function (item) {
                            return (
                                <span
                                    key={item.type}
                                    className={'fa ' + item.icon}
                                    title={item.title}
                                    onClick={function (ev) { handleTypeChange(ev, item.type) }}
                                ></span>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className="note-open">
                    <div className="top-row">
                        <input
                            className="title-input"
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={note.info.title || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <NoteAddContent note={note} handleChange={handleChange} />
                    <div className="bottom-row">
                        <div className="icons">
                            {NOTE_TYPES.map(function (item) {
                                return (
                                    <i
                                        key={item.type}
                                        className={'fas fa-' + item.icon + (note.type === item.type ? ' active' : '')}
                                        title={item.title}
                                        onClick={function (ev) { handleTypeChange(ev, item.type) }}
                                    ></i>
                                )
                            })}
                        </div>
                        <div className="actions">
                            <button className="close-btn" onClick={function () { setIsOpen(false) }}>
                                Close
                            </button>
                            <button className="save-btn" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
