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
    const [loader, setLoader] = useState(false)
    const [filter, setFilter] = useState('active')
    const [menuLock, setMenuLocked] = useState(false)

    useEffect(() => {
        setLoader(true)
        loadNotes()
    }, [filter])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function loadNotes() {
        noteService.query(filter)
            .then(fetchedNotes => setNotes(fetchedNotes))
            .catch(err => showErrorMsg(`Failed to load notes: ${err.message}`))
            .finally(() => setLoader(false))
    }

    function onSetFilter(newFilter) {
        setFilter(newFilter)
    }

    function onMenuLocked() {
        setMenuLocked(!menuLock)
    }

    function handleResize() {
        if (window.innerWidth < 800) setMenuLocked(true)
        else setMenuLocked(false)
    }

    /*------- Note control actions -------*/

    function onSetBgColor(noteId, color) {
        noteService.getById(noteId)
            .then(note => {
                const updatedNote = {
                    ...note,
                    style: { ...note.style, backgroundColor: color }
                }
                return noteService.save(updatedNote)
            })
            .then(updatedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === noteId ? updatedNote : note
                    )
                )
            })
            .catch(err => showErrorMsg(`Failed to update color: ${err.message}`))
    }

    function onArchive(noteId) {
        noteService.getById(noteId)
            .then(note => noteService.save({ ...note, state: 'archived', isPinned: false }))
            .then(() => {
                loadNotes()
                showSuccessMsg('Note successfully moved to archive!')
            })
            .catch(err => showErrorMsg(`Failed to move note to archive: ${err.message}`))
    }

    function onTrash(noteId) {
        noteService.getById(noteId)
            .then(note => noteService.save({ ...note, state: 'deleted', isPinned: false }))
            .then(() => {
                showSuccessMsg('Note successfully moved to trash!')
                loadNotes()
            })
            .catch(err => showErrorMsg(`Failed to move note to trash: ${err.message}`))
    }

    function onPin(noteId) {
        noteService.getById(noteId)
            .then(note => {
                const updatedNote = { ...note, isPinned: !note.isPinned }
                return noteService.save(updatedNote)
            })
            .then((updatedNote) => {
                showSuccessMsg(`Note successfully ${updatedNote.isPinned ? 'pinned' : 'unpinned'}!`)
                loadNotes()
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
            .then(note => noteService.save({ ...note, state: 'active' }))
            .then(() => {
                showSuccessMsg('Note successfully moved to active!')
                loadNotes()
            })
            .catch(err => showErrorMsg(`Failed to move note to active: ${err.message}`))
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
                                    <NoteAdd />
                                    {pinnedNotes.length > 0 && <NoteList
                                        notes={pinnedNotes}
                                        title="Pinned"
                                        onSetBgColor={onSetBgColor}
                                        onTrash={onTrash}
                                        onArchive={onArchive}
                                        onPin={onPin}
                                    />}
                                    <NoteList
                                        notes={unpinnedNotes}
                                        title={pinnedNotes.length > 0 ? 'Others' : ''}
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
                            element={<NoteList notes={notes}
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
