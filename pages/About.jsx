export function About() {
    return (
        <div className="about-page" style={{height: 'calc(100vh - 60px)', overflowY: 'auto'}}>
            <div className="about-container">
                <section className="app-intro">
                    <h1>Appsus: Your All-in-One Productivity Companion</h1>
                    <p>
                        Appsus is a comprehensive web application designed to streamline your digital life 
                        by combining essential productivity tools into a single, intuitive platform. 
                        Our mission is to help you stay organized, focused, and efficient.
                    </p>
                </section>

                <section className="app-features">
                    <h2>Key Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="fas fa-envelope"></i>
                            <h3>Mail</h3>
                            <p>A robust email management system with advanced filtering, starring, and organization capabilities.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-sticky-note"></i>
                            <h3>Notes</h3>
                            <p>Create, organize, and manage notes with multiple input types, including text, lists, images, and videos.</p>
                        </div>
                    </div>
                </section>

                <section className="developers">
                    <h2>Meet the Developers</h2>
                    <div className="developers-grid">
                    <div className="developer-card">
                            <div className="developer-avatar">
                                <img src="assets/img/or.jpg" alt="Or Antebi" />
                            </div>
                            <h3>Or Antebi</h3>
                            <p>Full Stack Web Developer</p>
                            <div className="developer-socials">
                                <a href="https://github.com/or87600" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/orantebi/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                            <p className="developer-bio">
                                Innovative developer with a keen eye for detail and a passion for 
                                creating seamless, user-friendly web applications.
                            </p>
                        </div>
                        <div className="developer-card">
                            <div className="developer-avatar">
                                <img src="assets/img/yakov.jpg" alt="Yakov Cohen" />
                            </div>
                            <h3>Yakov Cohen</h3>
                            <p>Full Stack Web Developer</p>
                            <div className="developer-socials">
                                <a href="https://github.com/YakovCo44" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/yakov-cohen/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                            <p className="developer-bio">
                                Passionate about creating intuitive and efficient web solutions. 
                                Specializing in modern web technologies and user-centric design.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="technologies">
                    <h2>Technologies Used</h2>
                    <div className="tech-stack">
                        <div className="tech-item">
                            <i className="fab fa-react"></i>
                            <span>React</span>
                        </div>
                        <div className="tech-item">
                            <i className="fab fa-js"></i>
                            <span>JavaScript</span>
                        </div>
                        <div className="tech-item">
                            <i className="fab fa-css3-alt"></i>
                            <span>CSS</span>
                        </div>
                        <div className="tech-item">
                            <i className="fab fa-html5"></i>
                            <span>HTML5</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
