const { useState } = React

export function NoteControl({ onSetBgColor }) {

    const [palleteIsOpen, setPalleteIsOpen] = useState(false)

    function onPalleteIsOpen() {
        setPalleteIsOpen(!palleteIsOpen)
    }

    return (
        <section className="note-control">
            <img src="assets\img\note\pallete.svg" alt="Pallete icon" onClick={onPalleteIsOpen} />
            {palleteIsOpen && <ColorPicker />}
        </section>
    )
}


export function ColorPicker() {
    return (
        <section className="color-picker">
            <span className="red">y</span>
            <span className="yellow"></span>
            <span className="blue"></span>
            <span className="green"></span>
        </section>
    )
}