const { Fragment } = React

export function NoteTodos({ note }) {

    const { title, todos } = note.info

    return (
        <Fragment>
            <h3>{title}</h3>
            <ul className="clean-list">
                {todos.map((todo, idx) => (
                    <li key={idx}>
                        <input type="checkbox" checked={!!todo.doneAt} readOnly />
                        <span>{todo.txt}</span>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}
