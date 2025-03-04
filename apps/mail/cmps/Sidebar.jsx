const { useState } = React

import '/assets/css/apps/mail/Sidebar.css'

export function Sidebar({ onSetFolder, isSidebarOpen, toggleSidebar, onCompose }) { 

    return (
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            {/* Sidebar Toggle Button */}
            <button className="toggle-btn" onClick={toggleSidebar}>
                ☰
            </button>

            {/* Compose Button - More prominent than others */}
            <button className="compose-btn" onClick={onCompose}>
                <span className="compose-icon">✏️</span> 
                {isSidebarOpen && <span className="text">Compose</span>}
            </button>

            {/* Sidebar Navigation Buttons */}
            <nav className="menu">
                <button onClick={() => onSetFolder('inbox')} className="menu-item">
                    <span className="icon">📥</span>
                    {isSidebarOpen && <span className="text">Inbox</span>}
                </button>

                <button onClick={() => onSetFolder('starred')} className="menu-item">
                    <span className="icon">⭐</span>
                    {isSidebarOpen && <span className="text">Starred</span>}
                </button>

                <button onClick={() => onSetFolder('sent')} className="menu-item">
                    <span className="icon">📤</span>
                    {isSidebarOpen && <span className="text">Sent</span>}
                </button>

                <button onClick={() => onSetFolder('draft')} className="menu-item">
                    <span className="icon">📝</span>
                    {isSidebarOpen && <span className="text">Drafts</span>}
                </button>

                <button onClick={() => onSetFolder('trash')} className="menu-item">
                    <span className="icon">🗑️</span>
                    {isSidebarOpen && <span className="text">Trash</span>}
                </button>
            </nav>
        </aside>
    )
}
