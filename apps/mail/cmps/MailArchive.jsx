import { getArchivedMails, unarchiveMail } from '../services/mail.service.js'

export function MailArchive() {
    const [archivedMails, setArchivedMails] = React.useState([])

    React.useEffect(() => {
        const refreshArchivedMails = () => {
            setArchivedMails(getArchivedMails())
        }
    
        refreshArchivedMails()
    }, [archivedMails])


    function handleUnarchive(mailId) {
        unarchiveMail(mailId)
        setArchivedMails([...getArchivedMails()]) 
    }

    return (
        <div className="mail-archive">
            <h2>Archived Mails</h2>
            {archivedMails.length === 0 ? <p>No archived mails</p> : (
                archivedMails.map(mail => (
                    <div key={mail.id} className="mail-item">
                        <span>{mail.subject}</span>
                        <button className="action-btn unarchive-btn" onClick={() => handleUnarchive(mail.id)}>
                            <i className="fas fa-box-open"></i> 
                            <span className="tooltip">Unarchive</span>
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}
