export function MailHeader({ filterBy, onFilterChange, sortBy, onSortChange, setReadFilter, setFolder, setLabelFilter }) {
    return (
        <header className="mail-header">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search mail"
                    value={filterBy.txt}
                    onChange={onFilterChange}
                    className="search-bar"
                />
            </div>

            <div className="filters">
                <label>Sort: </label>
                <select value={sortBy} onChange={ev => onSortChange(ev.target.value)}>
                    <option value="date-newest">Newest First</option>
                    <option value="date-oldest">Oldest First</option>
                    <option value="subject-az">Subject A-Z</option>
                    <option value="subject-za">Subject Z-A</option>
                </select>

                <label>Show: </label>
                <select onChange={ev => {
                    const value = ev.target.value
                    setFolder(value === 'starred' ? 'starred' : 'inbox')
                }}>
                    <option value="all">All Emails</option>
                    <option value="starred">Starred</option>
                </select>

                <label>Filter: </label>
                <select onChange={ev => setReadFilter(ev.target.value === 'all' ? null : ev.target.value === 'read')}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>

                <label>Label: </label>
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
        </header>
    )
}
