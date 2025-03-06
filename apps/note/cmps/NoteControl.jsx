const { useState, Fragment } = React
import { ColorPicker } from "./ColorPicker.jsx"
import { DynamicControls } from "./DynamicCmps/DynamicControls.jsx"

export function NoteControl({ note, toggleEditMode, onSetBgColor, onArchive, onTrash, onPin, onRestore, onDeleteForever, onEmail }) {
    const [paletteIsOpen, setPaletteIsOpen] = useState(false)

    const togglePalette = () => setPaletteIsOpen(prev => !prev)

    return (
        <Fragment>
            <section className="note-control flex">
                <DynamicControls
                    note={note}
                    toggleEditMode={toggleEditMode}
                    togglePalette={togglePalette}
                    onArchive={() => onArchive(note.id)}
                    onTrash={() => onTrash(note.id)}
                    onPin={() => onPin(note.id)}
                    onRestore={() => onRestore(note.id)}
                    onDeleteForever={() => onDeleteForever(note.id)}
                    onEmail={onEmail}
                />
            </section>
            {paletteIsOpen && <ColorPicker onSetBgColor={(color) => onSetBgColor(color)} />}
        </Fragment>
    )
}
