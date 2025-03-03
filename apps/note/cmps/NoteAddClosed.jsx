export function NoteAddClosed({ noteTypes, onOpen, onTypeClick }) {
    return (
        <section className="note-closed flex" onClick={onOpen}>
            <span className="placeholder">Take a note...</span>
            <div className="icons">
                {noteTypes.map(item => (
                    <span
                        key={item.type}
                        data-type={item.type}
                        className={'fa ' + item.icon}
                        title={item.title}
                        onClick={onTypeClick}
                    ></span>
                ))}
            </div>
        </section>
    )
}