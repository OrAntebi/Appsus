import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'

const { useState, useEffect } = React
const useNavigate = ReactRouterDOM.useNavigate

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '', status: 'inbox', isRead: null })
    const [sortBy, setSortBy] = useState('date-newest')

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy).then(mails => {
            let sortedMails = [...mails]

            if (sortBy === 'date-newest') {
                sortedMails.sort((a, b) => b.createdAt - a.createdAt)
            } else if (sortBy === 'date-oldest') {
                sortedMails.sort((a, b) => a.createdAt - b.createdAt)
            } else if (sortBy === 'subject-az') {
                sortedMails.sort((a, b) => a.subject.localeCompare(b.subject))
            } else if (sortBy === 'subject-za') {
                sortedMails.sort((a, b) => b.subject.localeCompare(a.subject))
            }

            setMails(sortedMails)
        })
    }

    function toggleStar(mail){
        const updatedMail = { ...mail, isStared: !mail.isStared }
        mailService.update(updatedMail).then(() => loadMails())
    }

    function toggleRead(mail) {
        const updatedMail = { ...mail, isRead: !mail.isRead }
        mailService.update(updatedMail).then(() => {
            setMails(prevMails => prevMails.map(m => m.id === mail.id ? updatedMail : m))
        })
    }
    
    function handleFilterChange(ev) {
        setFilterBy(prevFilter => ({ ...prevFilter, txt: ev.target.value }))
    }

    function setFolder(status) {
        setFilterBy(prevFilter => ({ ...prevFilter, status }))
    }

    function setReadFilter(isRead) {
        setFilterBy(prevFilter => ({ ...prevFilter, isRead }))
    }

    function handleRemove(mailId) {
        mailService.remove(mailId).then(() => {
            setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        })
    }

    function handleRestore(mailId) {
        mailService.restore(mailId).then(() => {
            setMails(prevMails => prevMails.map(mail =>
                mail.id === mailId ? { ...mail, removedAt: null } : mail
            ))
        })
    }  

        return (
            <div className="container">
                {/* Sidebar (Fixed Gmail-like Navigation) */}
                <aside className="sidebar">
                    <button className="compose-btn">
                        <span className="material-icons">edit</span> Compose
                    </button>
                    <button onClick={() => setFolder('inbox')}>
                        <span className="material-icons">inbox</span> Inbox
                    </button>
                    <button onClick={() => setFolder('sent')}>
                        <span className="material-icons">send</span> Sent
                    </button>
                    <button onClick={() => setFolder('trash')}>
                        <span className="material-icons">delete</span> Trash
                    </button>
                    <button onClick={() => setFolder('draft')}>
                        <span className="material-icons">drafts</span> Drafts
                    </button>
                    <button onClick={() => setFolder('starred')}>
                        <span className="material-icons">star</span> Starred
                    </button>
                </aside>
    
                {/* Mail Section */}
                <div className="mail-list-container">
                    {/* Search & Filters Header */}
                    <header className="mail-header">
                        <input 
                            type="text" 
                            placeholder="Search mails..." 
                            value={filterBy.txt} 
                            onChange={handleFilterChange} 
                            className="search-bar"
                        />
                        
                        {/* Sorting & Filtering */}
                        <div className="filters">
                            <label>Sort by: </label>
                            <select value={sortBy} onChange={ev => setSortBy(ev.target.value)}>
                                <option value="date-newest">Newest First</option>
                                <option value="date-oldest">Oldest First</option>
                                <option value="subject-az">Subject A-Z</option>
                                <option value="subject-za">Subject Z-A</option>
                            </select>
    
                            <label>Filter: </label>
                            <select onChange={ev => setReadFilter(ev.target.value === 'all' ? null : ev.target.value === 'read')}>
                                <option value="all">All</option>
                                <option value="read">Read</option>
                                <option value="unread">Unread</option>
                            </select>
    
                            <label>Show: </label>
                            <select onChange={ev => {
                                const value = ev.target.value
                                setFilterBy(prev => ({
                                    ...prev,
                                    isStared: value === 'starred' ? true : null 
                                }))
                            }}>
                                <option value="all">All Emails</option>
                                <option value="starred">Starred</option>
                            </select>
    
                            <label>Label: </label>
                            <select onChange={ev => setFilterBy(prev => ({
                                ...prev, labels: ev.target.value === 'all' ? [] : [ev.target.value]
                            }))}>
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
    
                    {/* Mail List */}
                    <section className="mail-list">
                        <MailList 
                            mails={mails} 
                            onToggleStar={toggleStar} 
                            onToggleRead={toggleRead} 
                            onRemove={handleRemove}
                            onRestore={handleRestore}
                        />
                    </section>
                </div>
            </div>
        )
    }
    


