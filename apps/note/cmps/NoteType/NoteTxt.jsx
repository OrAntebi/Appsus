const { Fragment } = React

export function NoteTxt({ note }) {

    const { title, txt } = note.info

    return (
        <Fragment>
            <h3>{title}</h3>
            <p>{txt}</p>
        </Fragment>
    )
}
