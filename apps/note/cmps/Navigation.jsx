const { NavLink, useNavigate } = ReactRouterDOM

export function Navigation({ menuLock }) {

    const navigate = useNavigate()

    return (
        <nav className={`navigation flex column ${menuLock ? 'menuIsLock' : ''}`}>
            <ul className="clean-list">
                <li className="nav-item flex">
                    <img src="assets\img\note\notes.svg" alt="notes icon" className="nav-icon" onClick={() => navigate("")} />

                    <NavLink to="" end className="nav-link">Notes</NavLink>
                </li>

                <li className="nav-item flex">
                    <img src="assets\img\note\archive.svg" alt="archive icon" className="nav-icon" onClick={() => navigate("archive")} />

                    <NavLink to="archive" className="nav-link">Archive</NavLink>
                </li>

                <li className="nav-item flex">
                    <img src="assets\img\note\trash.svg" alt="trash icon" className="nav-icon" onClick={() => navigate("trash")} />

                    <NavLink to="trash" className="nav-link">Trash</NavLink>
                </li>
            </ul>
        </nav>
    )
}
