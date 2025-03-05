const { useState, Fragment } = React


export function NoteTxt({ note, editMode, onSaveNote }) {

    const [title, setTitle] = useState(note.info.title || '')
    const [txt, setTxt] = useState(note.info.txt || '')

    function handleSubmit(event) {
        event.preventDefault()
        onSaveNote({ title, txt })
    }

    if (editMode) {
        return (
            <form className="flex column" onSubmit={handleSubmit}>
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <textarea value={txt} onChange={e => setTxt(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        )
    }

    return (
        <Fragment>
            <h3>{title}</h3>
            <p>{txt}</p>
        </Fragment>
    )
}
