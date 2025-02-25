export function NotePreview({ note }) {
    return (
        <div className="note-preview">
            <h2>{note.info.title}</h2>
        </div>
    )
}