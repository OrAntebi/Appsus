const { useState, Fragment } = React

export function NoteTodos({ note, editMode, onSaveNote }) {

    const [title, setTitle] = useState(note.info.title || '')
    const [todos, setTodos] = useState(note.info.todos)

    function handleSubmit(event) {
        event.preventDefault()
        onSaveNote({ title, todos })
    }

    function toggleTodo(idx) {
        const updatedTodos = todos.map((todo, index) => {
            if (index === idx) return { ...todo, doneAt: todo.doneAt ? null : Date.now() }
            return todo
        })
        setTodos(updatedTodos)
        onSaveNote({ title, todos: updatedTodos })
    }

    if (editMode) {
        return (
            <form className="flex column" onSubmit={handleSubmit}>
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <ul className="clean-list">
                    {todos.map((todo, idx) => (
                        <li key={idx} className="todo-item">
                            <input
                                value={todo.txt}
                                onChange={e => {
                                    const updatedTodos = [...todos]
                                    updatedTodos[idx] = { ...todo, txt: e.target.value }
                                    setTodos(updatedTodos)
                                }}
                                className="todo-text-input"
                            />
                        </li>
                    ))}
                </ul>
                <button type="submit">שמור שינויים</button>
            </form>
        )
    }

    return (
        <Fragment>
            <h3>{title}</h3>
            <ul className="clean-list">
                {todos.map((todo, idx) => (
                    <li key={idx} className="todo-item">
                        <label className="todo-label">
                            <input
                                type="checkbox"
                                className="todo-checkbox"
                                checked={!!todo.doneAt}
                                onChange={() => toggleTodo(idx)}
                            />
                            <span className="todo-text">{todo.txt}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}
