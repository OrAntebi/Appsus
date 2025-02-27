const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStar, onToggleRead, onRemove, onRestore, handleMailClick }) {
    const navigate = useNavigate()

    function handleMailClick() {
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
        <div className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
            <div className="mail-left">
                <button className="star-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    onToggleStar(mail)
                }}>
                    {mail.isStared ? '★' : '☆'}
                </button>
                <span className={`mail-sender ${mail.isRead ? '' : 'bold'}`}>{mail.from}</span>
            </div>

            <div className="mail-content">
                <h4 className={mail.isRead ? '' : 'bold'}>{mail.subject}</h4>
                <p>{mail.body.substring(0, 50)}...</p>
                <div className="mail-labels">
                    {mail.labels && mail.labels.map(label => (
                        <span key={label} className={`label ${label.toLowerCase()}`}>{label}</span>
                    ))}
                </div>
            </div>

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

