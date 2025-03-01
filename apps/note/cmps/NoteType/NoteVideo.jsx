const { Fragment } = React

export function NoteVideo({ note }) {

    const { title, url } = note.info

    return (
        <Fragment>
            <h3>{title}</h3>
            <video controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Fragment>
    )
}
