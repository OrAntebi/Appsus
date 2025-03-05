const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function onToggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return <header className={`app-header header-layout ${isMenuOpen ? 'openedMenu' : ''}`}>

        <Link to="/">
            <img src="assets\img\logo.png" alt="Appsus logo" className="main-logo" onClick={isMenuOpen ? onToggleMenu : null} />
        </Link>

        <div className="overlay" onClick={onToggleMenu}></div>
        <div className="hamburger-menu-container flex align-center justify-center">
            <img src="assets\img\note\menu.svg" alt="Main menu icon" onClick={onToggleMenu} />
        </div>

        <nav className="main-nav flex column">
            <ul className="clean-list">
                <li><NavLink to="/" className="flex justify-center align-center" onClick={onToggleMenu}>Home</NavLink></li>
                <li><NavLink to="/about" className="flex justify-center align-center" onClick={onToggleMenu}>About</NavLink></li>
                <li><NavLink to="/mail" className="flex justify-center align-center" onClick={onToggleMenu}>Mister Email</NavLink></li>
                <li><NavLink to="/note" className="flex justify-center align-center" onClick={onToggleMenu}>Miss Keep</NavLink></li>
                <li><NavLink to="/books" className="flex justify-center align-center" onClick={onToggleMenu}>Miss Book</NavLink></li>
            </ul>
        </nav>
    </header>
}
