import { NotePreview } from './NotePreview.jsx'
import { NoteControl } from './NoteControl.jsx'
const { useState } = React

export function NoteList({ notes }) {

    const [bgColor, setBgColor] = useState({})

    function onSetBgColor({ note }) {
        setBgColor({ ...note, style: { backgroundColor: bgColor } })
    }


    return (
        <section className="note-list flex">
            {notes.map(note => {
                return (
                    <article className="note-card" key={note.id} style={{ bgColor }}>
                        <NotePreview note={note} />
                        <NoteControl onSetBgColor={() => onSetBgColor(note)} />
                    </article>
                )
            })}
        </section>
    )
}
