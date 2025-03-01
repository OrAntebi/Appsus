import { SpecificNote } from './DynamicCmps/SpecificNote.jsx'

export function NotePreview({ note }) {

    return (
        <div className="note-preview flex column">
            <SpecificNote note={note} />
        </div>

    )
}


