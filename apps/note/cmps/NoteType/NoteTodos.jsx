import { noteService } from "../../services/note.service.js"

const { useState } = React


export function NoteTodos({ note }) {
    const [todos, setTodos] = useState(note.info.todos)

    function toggleTodo(idx) {
        const updatedTodos = todos.map((todo, i) => {
            if (i === idx) {
                return { ...todo, doneAt: todo.doneAt ? null : Date.now() }
            }
            return todo
        })
        setTodos(updatedTodos)
        saveUpdatedTodos(updatedTodos)
    }

    function saveUpdatedTodos(updatedTodos) {
        const updatedNote = {
            ...note,
            info: {
                ...note.info,
                todos: updatedTodos
            }
        }
        noteService.save(updatedNote)
            .catch(err => {
                console.error('Failed to save the updated todos', err)
            })
    }

    return (
        <div>
            <h3>{note.info.title}</h3>
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
        </div>
    )
}
