const { useState } = React

export function Sidebar({ onSetFolder, isSidebarOpen, toggleSidebar }) { 

    return (
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                ☰
            </button>

            <button onClick={() => onSetFolder('inbox')} title="Inbox">
                <span className="icon">📥</span>
                {isSidebarOpen && <span className="text">Inbox</span>}
            </button>

            <button onClick={() => onSetFolder('sent')} title="Sent">
                <span className="icon">📤</span>
                {isSidebarOpen && <span className="text">Sent</span>}
            </button>

            <button onClick={() => onSetFolder('trash')} title="Trash">
                <span className="icon">🗑️</span>
                {isSidebarOpen && <span className="text">Trash</span>}
            </button>

            <button onClick={() => onSetFolder('draft')} title="Drafts">
                <span className="icon">📝</span>
                {isSidebarOpen && <span className="text">Drafts</span>}
            </button>

            <button onClick={() => onSetFolder('starred')} title="Starred">
                <span className="icon">⭐</span>
                {isSidebarOpen && <span className="text">Starred</span>}
            </button>
        </aside>
    )
}
