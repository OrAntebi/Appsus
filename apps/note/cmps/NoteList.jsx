import { NotePreview } from './NotePreview.jsx'
import { NoteControl } from './NoteControl.jsx'
import { EmptyTabMsg } from '../cmps/EmptyTabMsg.jsx'

export function NoteList({ notes, title, onSetBgColor, onTrash, onArchive, onPin, onRestore, onDeleteForever }) {

    if (notes.length === 0) return <EmptyTabMsg tabName={title || 'Notes'} />;

    return (
        <section className="note-list flex column">
            {title && notes.length > 0 && <h3 className="notes-title">{title}</h3>}

            <section className="notes-container">
                {notes.map(note => (
                    <article className="note-card flex column" key={note.id} style={note.style}>
                        <NotePreview note={note} />
                        <NoteControl
                            note={note}
                            onSetBgColor={(color) => onSetBgColor(note.id, color)}
                            onTrash={() => onTrash(note.id)}
                            onArchive={() => onArchive(note.id)}
                            onPin={() => onPin(note.id)}
                            onRestore={() => onRestore(note.id)}
                            onDeleteForever={() => onDeleteForever(note.id)}
                        />
                    </article>
                ))}
            </section>

        </section>
    )
}
