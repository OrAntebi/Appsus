export function NoteAddOpen({ note, noteTypes, onChange, onSubmit, onClose, onTypeClick }) {

    const textareaProps =
        note.type === 'NoteTxt'
            ? { placeholder: 'Take a note...', name: 'txt', value: note.info.txt || '' }
            : note.type === 'NoteTodos'
                ? { placeholder: 'Enter comma-separated todos...', name: 'todos', value: note.info.todos ? note.info.todos.map(todo => todo.txt).join(', ') : '' }
                : { placeholder: `Enter ${note.type === 'NoteImg' ? 'Image' : 'Video'} URL...`, name: 'url', value: note.info.url || '' }

    return (
        <form className="note-open" onSubmit={onSubmit}>
            <section className="top-row">
                <input
                    className="title-input"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={note.info.title || ''}
                    onChange={onChange}
                />
            </section>

            <textarea
                className="note-content"
                {...textareaProps}
                onChange={onChange}
            />

            <section className="bottom-row">
                <div className="icons">
                    {noteTypes.map(item => (
                        <span
                            key={item.type}
                            data-type={item.type}
                            className={'fa ' + item.icon + (note.type === item.type ? ' active' : '')}
                            title={item.title}
                            onClick={onTypeClick}
                        ></span>
                    ))}
                </div>
                <div className="actions">
                    <button className="close-btn" type="button" onClick={onClose}>
                        Close
                    </button>
                    <button className="save-btn" type="submit">
                        Save
                    </button>
                </div>
            </section>
        </form>
    )
}
