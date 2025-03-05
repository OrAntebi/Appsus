import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { Navigation } from '../cmps/Navigation.jsx'
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { Loader } from '../cmps/Loader.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'

const { useEffect, useState, Fragment } = React
const { Routes, Route } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [editNoteId, setEditNoteId] = useState(null)
    const [loader, setLoader] = useState(false)
    const [filter, setFilter] = useState('active')
    const [menuLock, setMenuLocked] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [filter])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function loadNotes() {
        setLoader(true)
        noteService.query(filter)
            .then(fetchedNotes => setNotes(fetchedNotes))
            .catch(err => showErrorMsg(`Failed to load notes: ${err.message}`))
            .finally(() => setLoader(false))
    }

    function onSetFilter(newFilter) {
        setFilter(newFilter)
    }

    function onMenuLocked() {
        setMenuLocked(prevState => !prevState)
    }

    function handleResize() {
        if (window.innerWidth < 950) setMenuLocked(true)
        else setMenuLocked(false)
    }

    function onAddNote(newNote) {
        noteService.save(newNote)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
                showSuccessMsg('Note added successfully!')
            })
            .catch(err => showErrorMsg(`Failed to add note: ${err.message}`))
    }


    /*------- Note control actions -------*/

    function toggleEditMode(noteId) {
        if (editNoteId === noteId) setEditNoteId(null)
        else setEditNoteId(noteId)
    }


    function onSaveNote(noteId, updatedFields) {
        noteService.getById(noteId)
            .then(note => {
                const updateNote = { ...note, info: { ...updatedFields } }
                return noteService.save(updateNote)
            })
            .then(savedNote => {
                setNotes(notes.map(note => note.id === noteId ? savedNote : note))
                showSuccessMsg('Note updated successfully!')
                setEditNoteId(null)
            })
            .catch(err => {
                showErrorMsg(`Failed to update note: ${err.message}`)
                setEditNoteId(null)
            })
    }




    function onSetBgColor(noteId, color) {
        noteService.getById(noteId)
            .then(note => {
                const updatedNote = { ...note, style: { ...note.style, backgroundColor: color } }
                return noteService.save(updatedNote)
            })
            .then(updatedNote => {
                setNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note))
            })
            .catch(err => showErrorMsg(`Failed to update color: ${err.message}`))
    }

    function onArchive(noteId) {
        noteService.getById(noteId)
            .then(note => {
                const updatedNote = { ...note, state: 'archived', isPinned: false }
                return noteService.save(updatedNote)
            })
            .then(updatedNote => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== updatedNote.id))
                showSuccessMsg('Note successfully moved to archive!')
            })
            .catch(err => showErrorMsg(`Failed to move note to archive: ${err.message}`))
    }

    function onTrash(noteId) {
        noteService.getById(noteId)
            .then(note => {
                const updatedNote = { ...note, state: 'deleted', isPinned: false }
                return noteService.save(updatedNote)
            })
            .then(updatedNote => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== updatedNote.id))
                showSuccessMsg('Note successfully moved to trash!')
            })
            .catch(err => showErrorMsg(`Failed to move note to trash: ${err.message}`))
    }

    function onPin(noteId) {
        noteService.getById(noteId)
            .then(note => {
                const updatedNote = { ...note, isPinned: !note.isPinned }
                return noteService.save(updatedNote)
            })
            .then(updatedNote => {
                setNotes(prevNotes => prevNotes.map(note => (note.id === updatedNote.id ? updatedNote : note)))
                showSuccessMsg(`Note successfully ${updatedNote.isPinned ? 'pinned' : 'unpinned'}!`)
            })
            .catch(err => showErrorMsg(`Failed to toggle pin: ${err.message}`))
    }

    function onDeleteForever(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note permanently deleted!')
            })
            .catch(err => showErrorMsg(`Failed to delete note: ${err.message}`))
    }

    function onRestore(noteId) {
        noteService.getById(noteId)
            .then(note => {
                const updatedNote = { ...note, state: 'active' }
                return noteService.save(updatedNote)
            })
            .then(updatedNote => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== updatedNote.id))
                showSuccessMsg('Note successfully restored!')
            })
            .catch(err => showErrorMsg(`Failed to restore note: ${err.message}`))
    }


    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)


    return (
        <Fragment>
            <NoteHeader filter={filter} menuLock={menuLock} onMenuLock={onMenuLocked} />

            <main className="note-index main-layout">
                <Navigation onSetFilter={onSetFilter} menuLock={menuLock} handleResize={handleResize} />

                <section className="notes-main-content">
                    {loader && <Loader />}
                    {!loader && <Routes>
                        <Route
                            path="/"
                            element={
                                <Fragment>
                                    <NoteAdd onAddNote={onAddNote} />
                                    {pinnedNotes.length > 0 && <NoteList
                                        notes={pinnedNotes}
                                        title="Pinned"
                                        toggleEditMode={toggleEditMode}
                                        editNoteId={editNoteId}
                                        onSaveNote={onSaveNote}
                                        onSetBgColor={onSetBgColor}
                                        onTrash={onTrash}
                                        onArchive={onArchive}
                                        onPin={onPin}
                                    />}
                                    <NoteList
                                        notes={unpinnedNotes}
                                        title={pinnedNotes.length > 0 ? 'Others' : ''}
                                        toggleEditMode={toggleEditMode}
                                        editNoteId={editNoteId}
                                        onSaveNote={onSaveNote}
                                        onSetBgColor={onSetBgColor}
                                        onTrash={onTrash}
                                        onArchive={onArchive}
                                        onPin={onPin}
                                    />
                                </Fragment>
                            }
                        />
                        <Route
                            path="/archive"
                            element={
                                <NoteList
                                    notes={notes}
                                    title="Archive"
                                    toggleEditMode={toggleEditMode}
                                    editNoteId={editNoteId}
                                    onSaveNote={onSaveNote}
                                    onSetBgColor={onSetBgColor}
                                    onTrash={onTrash}
                                    onRestore={onRestore}
                                />}
                        />
                        <Route
                            path="/trash"
                            element={
                                <NoteList
                                    notes={notes}
                                    title="Trash"
                                    onDeleteForever={onDeleteForever}
                                    onRestore={onRestore}
                                />
                            }
                        />
                    </Routes>}
                </section>

            </main>

            <UserMsg />
        </Fragment>
    )
}
