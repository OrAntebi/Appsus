const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStar, onToggleRead, onRemove, onRestore, handleMailClick }) {
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

            {/* Right Section: Actions (Delete) */}
            <div className="mail-actions">
                <button className="trash-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    onRemove(mail.id)
                }}>
                    🗑️
                </button>
            </div>
        </div>
    )
}
