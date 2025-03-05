
const { useState } = React

import '/assets/css/apps/mail/Sidebar.css'

export function Sidebar({ onSetFolder, isSidebarOpen, toggleSidebar, onCompose }) { 

    return (
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>

            <button className="toggle-btn" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i> 
            </button>

            <button className="compose-btn" onClick={onCompose}>
                <i className="fas fa-pencil-alt"></i> 
                {isSidebarOpen && <span className="text">Compose</span>}
            </button>

            <nav className="menu">
                <button onClick={() => onSetFolder('inbox')} className="menu-item">
                    <i className="fas fa-inbox"></i> 
                    {isSidebarOpen && <span className="text">Inbox</span>}
                </button>

                <button onClick={() => onSetFolder('starred')} className="menu-item">
                    <i className="fas fa-star"></i> 
                    {isSidebarOpen && <span className="text">Starred</span>}
                </button>

                <button onClick={() => onSetFolder('sent')} className="menu-item">
                    <i className="fas fa-paper-plane"></i>
                    {isSidebarOpen && <span className="text">Sent</span>}
                </button>

                <button onClick={() => onSetFolder('draft')} className="menu-item">
                    <i className="fas fa-file-alt"></i> 
                    {isSidebarOpen && <span className="text">Drafts</span>}
                </button>

                <button onClick={() => onSetFolder('archive')} className="menu-item">
                    <i className="fas fa-archive"></i> 
                    {isSidebarOpen && <span className="text">Archive</span>}
                </button>

                <button onClick={() => onSetFolder('trash')} className="menu-item">
                    <i className="fas fa-trash"></i> 
                    {isSidebarOpen && <span className="text">Trash</span>}
                </button>
            </nav>
        </aside>
    )
}
