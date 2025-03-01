const { NavLink, useNavigate } = ReactRouterDOM

export function Navigation({ onSetFilter, menuLock, handleResize }) {

    const navigate = useNavigate()

    function onItemClick(filter) {
        onSetFilter(filter)
        handleResize()
    }

    return (
        <nav className={`navigation flex column ${menuLock ? 'menuIsLock' : ''}`}>
            <ul className="clean-list"  >
                <li className="nav-item flex" onClick={() => onItemClick('active')}>
                    <img src="assets\img\note\notes.svg" alt="notes icon" className="nav-icon" onClick={() => navigate("")} />

                    <NavLink to="" end className="nav-link">Note</NavLink>
                </li>

                <li className="nav-item flex" onClick={() => onItemClick('archived')}>
                    <img src="assets\img\note\archive.svg" alt="archive icon" className="nav-icon" onClick={() => navigate("archive")} />

                    <NavLink to="archive" className="nav-link">Archive</NavLink>
                </li>

                <li className="nav-item flex" onClick={() => onItemClick('deleted')}>
                    <img src="assets\img\note\trash.svg" alt="trash icon" className="nav-icon" onClick={() => navigate("trash")} />

                    <NavLink to="trash" className="nav-link">Trash</NavLink>
                </li>
            </ul>
        </nav>
    )
}
