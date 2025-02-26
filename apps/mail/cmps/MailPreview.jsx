const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onToggleStar, onToggleRead, onRemove, onRestore }) {
    const navigate = useNavigate()

    function handleMailClick(){
        if (mail.status === 'draft') {
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
            </div>

            <div className="mail-actions">
                {mail.removedAt ? (
                    <button className="restore-btn" onClick={(ev) => {
                        ev.stopPropagation()
                        onRestore(mail.id)
                    }}>
                        Restore
                    </button>
                ) : (
                    <button className="trash-btn" onClick={(ev) => {
                        ev.stopPropagation()
                        onRemove(mail.id)
                    }}>
                        🗑️
                    </button>
                )}

                <button className="view-mail-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    navigate(`/mail/${mail.id}`)
                }}>
                    Open
                </button>
            </div>
        </div>
    )
}




