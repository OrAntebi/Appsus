const { NavLink, useNavigate } = ReactRouterDOM

export function Navigation({ onSetFilter, menuLock }) {

    const navigate = useNavigate()

    return (
        <nav className={`navigation flex column ${menuLock ? 'menuIsLock' : ''}`}>
            <ul className="clean-list"  >
                <li className="nav-item flex" onClick={() => onSetFilter('active')}>
                    <img src="assets\img\note\notes.svg" alt="notes icon" className="nav-icon" onClick={() => navigate("")} />

                    <NavLink to="" end className="nav-link">Note</NavLink>
                </li>

                <li className="nav-item flex" onClick={() => onSetFilter('archived')}>
                    <img src="assets\img\note\archive.svg" alt="archive icon" className="nav-icon" onClick={() => navigate("archive")} />

                    <NavLink to="archive" className="nav-link">Archive</NavLink>
                </li>

                <li className="nav-item flex" onClick={() => onSetFilter('deleted')}>
                    <img src="assets\img\note\trash.svg" alt="trash icon" className="nav-icon" onClick={() => navigate("trash")} />

                    <NavLink to="trash" className="nav-link">Trash</NavLink>
                </li>
            </ul>
        </nav>
    )
}
