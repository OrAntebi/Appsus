const { useState, useEffect } = React

import { noteService } from '../services/noteService.js'

export function ArchiveNotes() {

    const [notes, setNotes] = useState([])
    const [menuLock, setMenuLocked] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query("active")
            .then(notes => {
                setNotes([...notes])
            })
    }


    return (
        <section className="archive">
            <h1>Archive</h1>
        </section>
    )
}