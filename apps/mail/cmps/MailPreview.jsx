const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStar, onToggleRead, onRemove, onRestore, onSelectMail, selectedMails }) {
    const navigate = useNavigate()

    function handleMailClick(ev) {
        ev.stopPropagation() 
        if (mail.removedAt) {
            navigate(`/mail/${mail.id}`) 
        } else if (mail.status === 'draft') {
            navigate(`/mail/compose?draftId=${mail.id}`)
        } else {
            navigate(`/mail/${mail.id}`) 
        }
    }

    return (
        <div className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`} onClick={handleMailClick}>
            {/* Checkbox - Stop Propagation */}
            <div className="mail-checkbox" onClick={(ev) => ev.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={selectedMails.includes(mail.id)}
                    onChange={(ev) => onSelectMail(mail.id, ev.target.checked)}
                />
                <span className="checkbox-tooltip">Select</span>
            </div>

            {/* Left Section: Star + Sender */}
            <div className="mail-left">
                <button className="star-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    onToggleStar(mail)
                }}>
                    {mail.isStared ? '★' : '☆'}
                </button>
                <span className="mail-sender">{mail.from}</span>
            </div>

            {/* Middle Section: Subject + Preview */}
            <div className="mail-content">
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-body">{mail.body.substring(0, 50)}...</span>
            </div>

            {/* Right Section: Actions (Delete, Archive, etc.) */}
            <div className="mail-actions">
                <button className="archive-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    // Call archive function here
                }}>
                    📥
                    <span className="tooltip">Archive</span>
                </button>
                <button className="mark-unread-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    onToggleRead(mail)
                }}>
                    ✉️
                    <span className="tooltip">Mark as Unread</span>
                </button>
                <button className="trash-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    onRemove(mail.id)
                }}>
                    🗑️
                    <span className="tooltip">Delete</span>
                </button>
            </div>
        </div>
    )
}
