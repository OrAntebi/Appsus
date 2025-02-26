export function NotePreview({ note }) {
    const { info: { title } } = note
    
    return (
        <div className="note-preview">
            <h2>{title}</h2>
        </div>

    )
}