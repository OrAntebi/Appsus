import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onToggleStar, onToggleRead, onRemove, onRestore }) {
    return (
        <div className="mail-list">
            {mails.map(mail => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    onToggleStar={onToggleStar}
                    onToggleRead={onToggleRead}
                    onRemove={onRemove}
                    onRestore={onRestore} 
                />
            ))}
        </div>
    )
}


