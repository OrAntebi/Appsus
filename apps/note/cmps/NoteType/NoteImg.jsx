const { Fragment } = React

export function NoteImg({ note }) {

    const { title, url } = note.info

    return (
        <Fragment>
            <h3>{title}</h3>
            <img src={url} alt={title} />
        </Fragment>
    )
}
