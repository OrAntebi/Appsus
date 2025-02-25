import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { Navigation } from '../cmps/Navigation.jsx'
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { ArchiveNotes } from '../cmps/ArchiveNotes.jsx'
import { TrashNotes } from '../cmps/TrashNotes.jsx'

const { useEffect, useState, Fragment } = React
const { Routes, Route } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => {
                setNotes([...notes])
                console.log('notes:', notes)
            })
    }

    return (
        <Fragment>
            <NoteHeader />

            <main className="note-index flex space-between">
                <Navigation />

                <Routes>
                    <Route index element={notes && <NoteList notes={notes} />} />
                    <Route path="archive" element={<ArchiveNotes />} />
                    <Route path="trash" element={<TrashNotes />} />
                </Routes>
            </main>
        </Fragment>
    )
}
