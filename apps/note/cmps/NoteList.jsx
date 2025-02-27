
import { NotePreview } from './NotePreview.jsx'
import { NoteControl } from './NoteControl.jsx'

export function NoteList({ notes, onSetBgColor, onTrash, onArchive, onPin }) {

    return (
        <section className="note-list flex">
            {notes.map(note => (
                <article className="note-card flex column" key={note.id} style={note.style}>
                    <NotePreview note={note} />
                    <NoteControl
                        onSetBgColor={(color) => onSetBgColor(note.id, color)}
                        onTrash={() => onTrash(note.id)}
                        onArchive={() => onArchive(note.id)}
                        onPin={() => onPin(note.id)}
                    />
                </article>
            ))}
        </section>
    )
}
