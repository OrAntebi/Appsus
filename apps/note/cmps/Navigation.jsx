const { NavLink } = ReactRouterDOM

export function Navigation() {

    return (
        <nav className="navigation flex column">
            <ul className="clean-list">
                <li className="nav-item flex align-center">
                    <img src="assets\img\note\notes.svg" alt="notes icon" className="nav-icon" />
                    <NavLink to="" end>Notes</NavLink>
                </li>

                <li className="nav-item flex align-center">
                    <img src="assets\img\note\archive.svg" alt="archive icon" className="nav-icon" />
                    <NavLink to="archive">Archive</NavLink>
                </li>

                <li className="nav-item flex align-center">
                    <img src="assets\img\note\trash.svg" alt="trash icon" className="nav-icon" />
                    <NavLink to="trash">Trash</NavLink>
                </li>
            </ul>
        </nav>
    )
}
