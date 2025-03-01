const { useState } = React
import { noteService } from '../services/note.service.js';
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js';

export function NoteAdd() {
    const [noteType, setNoteType] = useState('NoteTxt');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [todos, setTodos] = useState('');

    // Handle type change and reset fields
    const handleTypeChange = (e) => {
        setNoteType(e.target.value);
        setTitle('');
        setContent('');
        setTodos('');
    };

    // Save the note using a note template from noteService.getEmptyNote
    const handleSave = () => {
        // Get an empty note template based on the noteType
        const newNote = noteService.getEmptyNote(noteType);

        // Set the common title field
        newNote.info.title = title;

        // Fill in the rest of the info based on the note type
        if (noteType === 'NoteTxt') {
            newNote.info.txt = content;
        } else if (noteType === 'NoteImg' || noteType === 'NoteVideo') {
            newNote.info.url = content;
        } else if (noteType === 'NoteTodos') {
            // Split the todos input by commas and create an array of todo objects
            newNote.info.todos = todos
                .split(',')
                .map(todo => ({ txt: todo.trim(), doneAt: null }));
        }

        // Save the new note using your noteService
        noteService.save(newNote)
            .then(() => {
                showSuccessMsg('Note added successfully!');
                // Reset the form fields
                setTitle('');
                setContent('');
                setTodos('');
            })
            .catch(err => showErrorMsg("Error adding note: " + err.message));
    };

    return (
        <section className="note-add flex align-center justify-center">
            <div className="note-add-form flex column">
                <div className="note-type-selector">
                    <label htmlFor="noteType">Note Type:</label>
                    <select id="noteType" value={noteType} onChange={handleTypeChange}>
                        <option value="NoteTxt">Text</option>
                        <option value="NoteImg">Image</option>
                        <option value="NoteVideo">Video</option>
                        <option value="NoteTodos">Todos</option>
                    </select>
                </div>
                <input
                    type="text"
                    placeholder="Title..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                {/* For Text and Todos types, we use a textarea */}
                {(noteType === 'NoteTxt' || noteType === 'NoteTodos') && (
                    <textarea
                        placeholder={noteType === 'NoteTxt' ? 'Enter text...' : 'Enter todos separated by commas...'}
                        value={noteType === 'NoteTxt' ? content : todos}
                        onChange={e => noteType === 'NoteTxt' ? setContent(e.target.value) : setTodos(e.target.value)}
                    />
                )}
                {/* For Image and Video types, we use an input for URL */}
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
