
export function NoteAddContent({ note: { type, info }, handleChange }) {

    if (type === 'NoteTxt') {
        return (
            <textarea
                className="note-content"
                placeholder="Take a note..."
                name="txt"
                value={info.txt || ''}
                onChange={handleChange}
            />
        )
    } else if (type === 'NoteImg' || type === 'NoteVideo') {
        return (
            <input
                className="note-content"
                type="text"
                placeholder={'Enter ' + (type === 'NoteImg' ? 'Image' : 'Video') + ' URL...'}
                name="url"
                value={info.url || ''}
                onChange={handleChange}
            />
        )
    } else if (type === 'NoteTodos') {
        return (
            <textarea
                className="note-content"
                placeholder="Enter comma-separated todos..."
                name="todos"
                value={(info.todos && info.todos.map(function (todo) { return todo.txt }).join(', ')) || ''}
                onChange={handleChange}
            />
        )
    } else {
        return null
    }
}
