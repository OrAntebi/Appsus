export function NoteHeader({ filter, menuLock, onMenuLock}) {

    return (
        <header className="note-header flex align-center">
            <img src="assets\img\note\menu.svg" alt="Toggle menu" className={menuLock ? 'menuLock' : ''} onClick={onMenuLock} />
            <h1>{filter === 'active' ? 'Notes' : filter === 'archived' ? 'Archive' : 'Trash'}</h1>
        </header>
    )
}