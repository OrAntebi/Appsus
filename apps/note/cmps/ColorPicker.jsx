export function ColorPicker({ onSetBgColor }) {

    function handleColorChange(color) {
        onSetBgColor(color)
    }

    return (
        <section className="color-picker flex align-center space-between">
            <input type="radio" id="red" name="color" className="input-hidden" />
            <label htmlFor="red" className="color red" onClick={()=>handleColorChange('#f08080')}></label>

            <input type="radio" id="yellow" name="color" className="input-hidden" />
            <label htmlFor="yellow" className="color yellow" onClick={()=>handleColorChange('#ffffe0')}></label>

            <input type="radio" id="blue" name="color" className="input-hidden" />
            <label htmlFor="blue" className="color blue" onClick={()=>handleColorChange('#add8e6')}></label>

            <input type="radio" id="green" name="color" className="input-hidden" />
            <label htmlFor="green" className="color green" onClick={()=>handleColorChange('#90ee90')}></label>
        </section>

    )
}