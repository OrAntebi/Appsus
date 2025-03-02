const { useState } = React;

export function NoteAdd({ onAddNote }) {
    const [noteType, setNoteType] = useState('NoteTxt');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTypeChange = (e) => {
        setNoteType(e.target.value);
        setTitle('');
        setContent('');
    };

    const handleSave = () => {
        const newNote = {
            type: noteType,
            info: { title }
        };

        if (noteType === 'NoteTxt') newNote.info.txt = content;
        else if (noteType === 'NoteImg' || noteType === 'NoteVideo') newNote.info.url = content;
        else if (noteType === 'NoteTodos') {
            newNote.info.todos = content.split(',').map(todo => ({ txt: todo.trim(), doneAt: null }));
        }

        onAddNote(newNote);
        setTitle('');
        setContent('');
    };

    return (
        <section className="note-add flex align-center justify-center">
            <div className="note-add-form flex column">
                <label htmlFor="noteType">Note Type:</label>
                <select id="noteType" value={noteType} onChange={handleTypeChange}>
                    <option value="NoteTxt">Text</option>
                    <option value="NoteImg">Image</option>
                    <option value="NoteVideo">Video</option>
                    <option value="NoteTodos">Todos</option>
                </select>

                <input
                    type="text"
                    placeholder="Title..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                {(noteType === 'NoteTxt' || noteType === 'NoteTodos') && (
                    <textarea
                        placeholder={noteType === 'NoteTxt' ? 'Enter text...' : 'Enter todos separated by commas...'}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                )}

                {(noteType === 'NoteImg' || noteType === 'NoteVideo') && (
                    <input
                        type="text"
                        placeholder="Enter URL..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                )}

                <button onClick={handleSave}>Save Note</button>
            </div>
        </section>
    );
}
