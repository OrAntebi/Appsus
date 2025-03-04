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

        mailService.get(mailId).then(mailData => {
            if (!mailData) {
                navigate('/mail') 
                return
            }
            setMail(mailData)
        }).catch(() => navigate('/mail'))
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
        <section className="mail-open">

            <div className="mail-toolbar">
                <button onClick={() => navigate(-1)}>
                    <i className="fas fa-arrow-left"></i> Back
                </button>
                <button onClick={toggleStar}>
                    <i className={`fa-star ${mail.isStared ? 'fas' : 'far'}`}></i>
                </button>
                <button onClick={replyToMail}>
                    <i className="fas fa-reply"></i> Reply
                </button>
                <button onClick={forwardMail}>
                    <i className="fas fa-share"></i> Forward
                </button>
                <button onClick={deleteMail}>
                    <i className="fas fa-trash"></i> Trash
                </button>
            </div>
    
            <div className="mail-title">
                <h2>{mail.subject}</h2>
                <div className="mail-meta">
                    <span className="mail-from"><strong>{mail.from}</strong> - {new Date(mail.sentAt).toLocaleString()}</span>
                    <span className="mail-to">To: {mail.to}</span>
                </div>
            </div>
    
            <div className="mail-body-content">
                {mail.body ? <p>{mail.body}</p> : <p className="empty-msg">No content available</p>}
            </div>
        </section>
    ) 
}
