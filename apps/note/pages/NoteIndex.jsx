import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { Navigation } from '../cmps/Navigation.jsx'
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { UserMsg } from '../../../cmps/UserMsg.jsx'

const { useEffect, useState, Fragment } = React
const { Routes, Route } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filter, setFilter] = useState()
    const [menuLock, setMenuLocked] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [filter])

    function loadNotes() {
        noteService.query(filter)
            .then(notes => {
                setNotes([...notes])
            })
    }

    function onSetFilter(filter) {
        setFilter(filter)
    }

    function onSetBgColor(noteId, color) {
        noteService.getById(noteId)
            .then(note => {
                console.log('color1:', color)
                const updatedNote = { ...note, style: { ...note.style, backgroundColor: color } }
                return noteService.save(updatedNote)
            })
            .then(updatedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === noteId ? updatedNote : note
                    )
                )
            })
            .catch(err => {
                showErrorMsg(`Failed to update color: ${err.message}`)
            })
    }


    function onTrash(noteId) {
        noteService.remove(noteId)
            .then(() => setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId)))
            .then(() => showSuccessMsg('Note successfully moved to trash!'))
            .catch(() => showErrorMsg(`Couldn't moved note to trash`))
    }

    function onArchive(noteId) {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, isArchived: true } : note
        )
        setNotes(updatedNotes)
        noteService.save(updatedNotes.find(note => note.id === noteId))
    }

    function onPin(noteId) {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
        )
        setNotes(updatedNotes)
        noteService.save(updatedNotes.find(note => note.id === noteId))
    }

    return (
        <Fragment>
            <NoteHeader menuLock={menuLock} onMenuLock={() => setMenuLocked(!menuLock)} />

            <main className="note-index main-layout">
                <Navigation menuLock={menuLock} />

                <Routes>
                    <Route path="/" onClick={() => onSetFilter()} element={<NoteList notes={notes} onSetBgColor={onSetBgColor} onTrash={onTrash} onArchive={onArchive} onPin={onPin} />} />
                    <Route path="/archived" onClick={() => onSetFilter('archived')} element={<NoteList notes={notes} onSetBgColor={onSetBgColor} onTrash={onTrash} onArchive={onArchive} onPin={onPin} />} />
                    <Route path="/deleted" onClick={() => onSetFilter('deleted')} element={<NoteList notes={notes} onSetBgColor={onSetBgColor} onTrash={onTrash} onArchive={onArchive} onPin={onPin} />} />
                </Routes>
            </main>
            <UserMsg />
        </Fragment>
    )
}

