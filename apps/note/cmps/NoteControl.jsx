const { useState, Fragment } = React

import { ColorPicker } from "./ColorPicker.jsx"

export function NoteControl({ onSetBgColor, onArchive, onTrash, onPin }) {

    const [paletteIsOpen, setPaletteIsOpen] = useState(false)

    function onPaletteIsOpen() {
        setPaletteIsOpen(!paletteIsOpen)
    }


    return (
        <Fragment>
            <section className="note-control flex">
                <img src="assets\img\note\palette.svg" alt="Palette icon" onClick={onPaletteIsOpen} />
                <img src="assets\img\note\archive.svg" alt="Archive icon" onClick={onArchive} />
                <img src="assets\img\note\trash.svg" alt="Trash icon" onClick={onTrash} />
                <img src="assets\img\note\pin.svg" alt="Pin icon" onClick={onPin} />
            </section>
            {paletteIsOpen && <ColorPicker onSetBgColor={(color)=>onSetBgColor(color)}/>}
        </Fragment>
    )
}