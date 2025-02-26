const { useParams, useNavigate } = ReactRouterDOM
const useState = React.useState
const useEffect = React.useEffect

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const { mailId } = useParams()
    const navigate = useNavigate()
    const [mail, setMail] = useState(null)

    useEffect(() => {
        setMail(null) 
        mailService.get(mailId).then(setMail)
    }, [mailId])

    function toggleReadStatus() {
        const updatedMail = { ...mail, isRead: !mail.isRead }
        mailService.update(updatedMail).then(setMail)
    }

    function toggleStar() {
        const updatedMail = { ...mail, isStared: !mail.isStared }
        mailService.update(updatedMail).then(setMail)
    }    

    function deleteMail() {
        mailService.remove(mailId).then(() => navigate('/mail'))
    }

    function replyToMail() {
        navigate(`/mail/compose?to=${mail.from}&subject=Re: ${mail.subject}`)
    }

    function toggleLabel(label) {
        mailService.toggleLabel(mail.id, label).then(setMail)
    }    

    function deleteMail() {
        if (mail.removedAt) {
            mailService.remove(mail.id).then(() => navigate('/mail')) // Permanently delete
        } else {
            const updatedMail = { ...mail, removedAt: Date.now() }
            mailService.update(updatedMail).then(() => navigate('/mail')) // Move to Trash
        }
    }    

    function forwardMail() {
        navigate(`/mail/compose?subject=Fwd: ${mail.subject}&body=${encodeURIComponent(mail.body)}`)
    }    

    if (!mail) return <p>Loading...</p>

    return (
        <section className="mail-details">
            <button onClick={() => navigate(-1)}>← Back</button>
            <button onClick={forwardMail}>Forward</button>
            <h2>{mail.subject}</h2>
            <h4>From: {mail.from}</h4>
            <h4>To: {mail.to}</h4>
            <p>{mail.body}</p>

            <button onClick={toggleStar}>
                {mail.isStared ? '★ Starred' : '☆ Star'}
            </button>

            <button onClick={toggleReadStatus}>
                {mail.isRead ? 'Mark as Unread' : 'Mark as Read'}
            </button>

            {mail.removedAt ? (
                <button onClick={restoreMail}>Restore</button>
            ) : (
                <button onClick={deleteMail}>Move to Trash</button>
            )}

            <button onClick={replyToMail}>Reply</button>
            <div className="labels">
                <button onClick={() => toggleLabel('Work')}>Work</button>
                <button onClick={() => toggleLabel('Personal')}>Personal</button>
                <button onClick={() => toggleLabel('Important')}>Important</button>
            </div>
        </section>
        
    )
}
