const { useParams, useNavigate } = ReactRouterDOM
const useState = React.useState
const useEffect = React.useEffect

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'User Lastname'
}

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const { mailId } = useParams()
    const navigate = useNavigate()
    const [mail, setMail] = useState(null)
    const [isReplying, setIsReplying] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [thread, setThread] = useState([])

    useEffect(() => {
        setMail(null)
    
        mailService.get(mailId).then(mailData => {
            if (!mailData) {
                navigate('/mail')
                return
            }
            
            if (!mailData.isRead) {
                const updatedMail = { ...mailData, isRead: true }
                mailService.update(updatedMail).then(setMail)
            } else {
                setMail(mailData)
            }
    
            mailService.getMailThread(mailId).then(setThread)
    
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

    function replyToMail() {
        setIsReplying(true)
    }

    function cancelReply() {
        setIsReplying(false)
        setReplyText('')
    }

    function sendReply() {
        const replyMail = {
            to: mail.from,
            subject: `Re: ${mail.subject}`,
            body: replyText,
            sentAt: Date.now(),
            removedAt: null,
            status: 'sent',
            from: loggedinUser.email
        }
        
        mailService.add(replyMail).then(() => {
            setIsReplying(false)
            setReplyText('')
    
            mailService.getMailThread(mail.id).then(setThread)
        })
    }    

    function toggleLabel(label) {
        if (!mail.labels) mail.labels = []
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
    
            <div className="mail-body">
                {mail.body ? <p>{mail.body}</p> : <p className="empty-msg">No content available</p>}
            </div>

            {isReplying && (
                <div className="reply-section">
                    <div className="reply-header">
                        <span>Replying to {mail.from}</span>
                    </div>
                    <div className="reply-content">
                        <textarea 
                            value={replyText} 
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                        ></textarea>
                    </div>
                    <div className="reply-footer">
                        <button className="send-btn" onClick={sendReply}>Send</button>
                        <button className="cancel-btn" onClick={cancelReply}>Discard</button>
                    </div>
                </div>
            )}
            <div className="mail-thread">
                {thread.length > 1 && thread.map((message, idx) => (
                    <div key={message.id} className={`mail-message ${idx === thread.length - 1 ? 'current' : ''}`}>
                        <div className="mail-message-header">
                            <div className="mail-sender">
                                <span><strong>{message.from}</strong></span>
                                <span className="mail-date">{new Date(message.sentAt).toLocaleString()}</span>
                            </div>
                            <div className="mail-recipients">To: {message.to}</div>
                        </div>
                        <div className="mail-message-body">
                            <p>{message.body}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    ) 
}
