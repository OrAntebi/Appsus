const { useState, Fragment } = React

export function NoteVideo({ note, editMode, onSaveNote }) {

    const [title, setTitle] = useState(note.info.title || '')
    const [url, setUrl] = useState(note.info.url || '')

    function handleSubmit(event) {
        event.preventDefault()
        onSaveNote({ title, url })
    }

    if (editMode) {
        return (
            <form className="note-edit flex column" onSubmit={handleSubmit}>
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <input value={url} onChange={e => setUrl(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        )
    }

    return (
        <Fragment>
            <h3>{title}</h3>
            <video controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Fragment>
    )
}
