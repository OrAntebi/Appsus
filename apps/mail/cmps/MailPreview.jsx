const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStar, onToggleRead, onRemove, onSelectMail, selectedMails, handleArchive }) {
    const navigate = useNavigate()

    function handleMailClick(ev) {
        ev.stopPropagation()
        const mailId = mail.id 
        console.log("Navigating to mail:", mailId) 
        
        if (mail.removedAt) {
            navigate(`/mail/${mailId}`)
        } else if (mail.status === 'draft') {
            navigate(`/mail/compose?draftId=${mailId}`)
        } else {
            navigate(`/mail/${mailId}`)
        }
    }

    function formatTimestamp() {
        const mailDate = new Date(mail.sentAt)
        const now = new Date()
        const isToday = mailDate.toDateString() === now.toDateString()
        const isYesterday = mailDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()

        if (isToday) return mailDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        if (isYesterday) return `Yesterday, ${mailDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        return mailDate.toLocaleDateString([], { month: 'short', day: '2-digit' }) + `, ` + mailDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`} onClick={handleMailClick}>
            <div className="mail-checkbox" onClick={(ev) => ev.stopPropagation()}>
                <input type="checkbox" checked={selectedMails.includes(mail.id)} onChange={(ev) => onSelectMail(mail.id, ev.target.checked)} />
                <span className="checkbox-tooltip tooltip">Select</span>
            </div>

            <div className="mail-left">
                <button className="star-btn" onClick={(ev) => { ev.stopPropagation(); onToggleStar(mail) }}>
                    {mail.isStared ? '★' : '☆'}
                </button>
                <span className="mail-sender">{mail.from}</span>
            </div>

            <div className="mail-content">
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-separator"> - </span>
                <span className="mail-body">{mail.body.substring(0, 50)}...</span>
            </div>

            <span className="mail-timestamp">{formatTimestamp()}</span>

            <div className="mail-actions">
            <button className="action-btn archive-btn" onClick={(ev) => {
                ev.stopPropagation()
                if (typeof handleArchive === 'function') {
                    handleArchive(mail.id)
                } else {
                    console.error("handleArchive is not a function")
                }
            }}>
                <i className="fas fa-archive"></i>
                <span className="tooltip">Archive</span>
            </button>

                <button className="action-btn mark-read-btn" onClick={(ev) => { ev.stopPropagation(); onToggleRead(mail) }}>
                    <i className={mail.isRead ? "fas fa-envelope-open" : "fas fa-envelope"}></i> 
                    <span className="tooltip">{mail.isRead ? 'Mark as unread' : 'Mark as read'}</span>
                </button>

                <button className="action-btn trash-btn" onClick={(ev) => { ev.stopPropagation(); onRemove(mail.id) }}>
                    <i className="fas fa-trash"></i> 
                    <span className="tooltip">Trash</span>
                </button>
            </div>
        </div>
    )
}

