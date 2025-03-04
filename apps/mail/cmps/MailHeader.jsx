export function MailHeader({ filterBy, onFilterChange, sortBy, onSortChange, setReadFilter, setFolder, setLabelFilter, onSelectAll, allSelected  }) {
    
    function handleSelectAll(ev) {
        const isChecked = ev.target.checked
        setAllSelected(isChecked)
    }

    return (
        <header className="mail-header">
            <div className="mail-header-left">
                <div className="select-all-container">
                    <input
                        type="checkbox"
                        id="select-all"
                        onChange={onSelectAll}
                        checked={allSelected}
                    />
                    <label htmlFor="select-all">Select All</label>
                </div>
            </div>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search mail"
                    value={filterBy.txt}
                    onChange={onFilterChange}
                    className="search-bar"
                />
            </div>

            <div className="mail-header-controls">
                <div className="sort-control">
                    <select value={sortBy} onChange={ev => onSortChange(ev.target.value)}>
                        <option value="date-newest">Newest First</option>
                        <option value="date-oldest">Oldest First</option>
                        <option value="subject-az">Subject A-Z</option>
                        <option value="subject-za">Subject Z-A</option>
                    </select>
                </div>

                <div className="filter-control">
                    <span>Show:</span>
                    <select onChange={ev => {
                        const value = ev.target.value
                        setFolder(value === 'starred' ? 'starred' : 'inbox')
                    }}>
                        <option value="all">All Emails</option>
                        <option value="starred">Starred</option>
                    </select>
                </div>

                <div className="filter-control">
                    <span>Filter:</span>
                    <select onChange={ev => setReadFilter(ev.target.value === 'all' ? null : ev.target.value === 'read')}>
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>
                </div>

                <div className="filter-control">
                    <span>Label:</span>
                    <select onChange={(ev) => {
                        if (typeof setLabelFilter === 'function') { 
                            setLabelFilter(ev.target.value === 'all' ? null : ev.target.value)
                        }
                    }}>
                        <option value="all">All Labels</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Important">Important</option>
                        <option value="Spam">Spam</option>
                        <option value="Romantic">Romantic</option>
                        <option value="Funny">Funny</option>
                        <option value="News">News</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>
            </div>
        </header>
    )
}