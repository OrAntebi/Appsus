const { useNavigate, useSearchParams } = ReactRouterDOM
const useState = React.useState
const useEffect = React.useEffect

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'

export function MailCompose({ onClose }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [mail, setMail] = useState({
        to: '',
        subject: '',
        body: ''
    })

    useEffect(() => {
        const draftId = searchParams.get('draftId')
        if (draftId) {
            mailService.get(draftId).then(setMail)
        } 

        const to = searchParams.get('to')
        const subject = searchParams.get('subject')
        const body = searchParams.get('body')

        if (to || subject || body) {
            setMail(prevMail => ({
                ...prevMail,
                to: to || prevMail.to,
                subject: subject || prevMail.subject,
                body: body ? `\n\n${body}` : prevMail.body
            }))
        }
    }, [searchParams])            

    useEffect(() => {
        const saveTimeout = setTimeout(() => {
            if (!mail.to.trim() && !mail.subject.trim() && !mail.body.trim()) return
            mailService.saveDraft(mail)
        }, 5000) 

        return () => clearTimeout(saveTimeout)
    }, [mail])            

    function handleChange(ev) {
        const { name, value } = ev.target
        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    function sendMail(ev) {
        ev.preventDefault()
        const newMail = { ...mail, sentAt: Date.now(), removedAt: null, status: null }
        mailService.add(newMail).then(() => {
            navigate('/mail')
            onClose()
        })
    }       

    function discardDraft() {
        if (mail.id) {
            mailService.remove(mail.id).then(() => navigate('/mail')) 
        }
        onClose()
    }

    return (
        <div className="compose-overlay">
            <div className="mail-compose">
                <header className="compose-header">
                    <span>New Message</span>
                    <div className="compose-controls">
                        <button className="close-btn" onClick={discardDraft}>×</button>
                    </div>
                </header>
                
                <form onSubmit={sendMail}>
                    <div className="compose-field">
                        <label>To</label>
                        <input 
                            type="email" 
                            id="email-to" 
                            name="to" 
                            value={mail.to} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="compose-field">
                        <label>Subject</label>
                        <input 
                            type="text" 
                            id="email-subject" 
                            name="subject" 
                            value={mail.subject} 
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div className="compose-body">
                    <textarea 
                        id="email-body" 
                        name="body" 
                        value={mail.body} 
                        onChange={handleChange} 
                    ></textarea>
                    </div>
                    
                    <footer className="compose-footer">
                        <button type="submit" className="send-btn">Send</button>
                        <button type="button" className="discard-btn" onClick={discardDraft}>Discard</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}
