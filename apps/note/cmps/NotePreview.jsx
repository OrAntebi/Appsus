import { SpecificNote } from './DynamicCmps/SpecificNote.jsx'

export function NotePreview({ note, editMode, onSaveNote }) {

    return (
        <div className="note-preview flex column">
            <SpecificNote
                note={note}
                editMode={editMode}
                onSaveNote={onSaveNote}
            />
        </div>

    )
}


