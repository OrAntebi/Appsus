const { Link } = ReactRouterDOM

export function Home() {
    return (
        <div className="home-page">
            <div className="home-container">
                <header className="hero-section">
                    <div className="hero-content">
                        <h1>Welcome to Appsus</h1>
                        <p>Your Ultimate Productivity Companion</p>
                        <div className="hero-cta">
                            <Link to="/mail" className="btn">Launch Mail</Link>
                            <Link to="/note" className="btn">Open Notes</Link>
                            <Link to="/books" className="btn">Explore Books</Link>
                        </div>
                    </div>
                    <div className="hero-illustration">
                        <div className="app-icons">
                        <div className="icon book-icon">
                                <i className="fas fa-book"></i>
                            </div>
                            <div className="icon mail-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="icon note-icon">
                                <i className="fas fa-sticky-note"></i>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="features-section">
                    <h2>What Makes Appsus Awesome?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <h3>Seamless Sync</h3>
                            <p>Keep your emails, notes, and books synchronized across all your devices.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-lock"></i>
                            <h3>Secure Storage</h3>
                            <p>Your data is protected with state-of-the-art security measures.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-filter"></i>
                            <h3>Smart Filtering</h3>
                            <p>Organize your content with advanced filtering and search capabilities.</p>
                        </div>
                    </div>
                </section>

                <section className="app-overview">
                    <div className="overview-content">
                        <h2>Three Powerful Tools, One Platform</h2>
                        <div className="app-details">
                            <div className="app-detail">
                                <h3>Email Management</h3>
                                <ul>
                                    <li>Intuitive inbox organization</li>
                                    <li>Quick star and read/unread toggles</li>
                                    <li>Powerful search and filter options</li>
                                </ul>
                            </div>
                            <div className="app-detail">
                                <h3>Note Taking</h3>
                                <ul>
                                    <li>Multiple note types (text, list, image, video)</li>
                                    <li>Color-coded organization</li>
                                    <li>Easy archiving and restoration</li>
                                </ul>
                            </div>
                            <div className="app-detail">
                                <h3>Book Management</h3>
                                <ul>
                                    <li>Organize your reading list</li>
                                    <li>Track reading progress</li>
                                    <li>Add and manage book details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2>Ready to Boost Your Productivity?</h2>
                    <p>Dive in and experience the power of Appsus today!</p>
                    <div className="cta-buttons">
                        <Link to="/mail" className="btn">Start with Mail</Link>
                        <Link to="/note" className="btn">Begin Note-Taking</Link>
                        <Link to="/books" className="btn">Begin finding your book</Link>
                    </div>
                </section>
            </div>
        </div>
    )
}