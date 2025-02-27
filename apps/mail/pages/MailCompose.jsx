const { useNavigate, useSearchParams } = ReactRouterDOM
const useState = React.useState
const useEffect = React.useEffect

import { mailService } from '../services/mail.service.js'

export function MailCompose( onClose ) {
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
    }, [])            

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
    
    function saveMail(mail) {
        mail.id = utilService.makeId()
        mail.sentAt = Date.now()
        mails.push(mail) 
        _saveMailsToStorage()
        return Promise.resolve(mail)
    }    

    function discardDraft() {
        if (mail.id) {
            mailService.remove(mail.id).then(() => navigate('/mail')) 
        }
        onClose()
    }

    return (
        <div className="mail-compose">
            <header className="compose-header">
                <span>New Message</span>
                <button className="close-btn" onClick={discardDraft}>✖</button>
            </header>
            <form onSubmit={sendMail}>
                <input 
                    type="email" 
                    name="to" 
                    placeholder="To" 
                    value={mail.to} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="subject" 
                    placeholder="Subject" 
                    value={mail.subject} 
                    onChange={handleChange} 
                />
                <textarea 
                    name="body" 
                    placeholder="Write your email..." 
                    value={mail.body} 
                    onChange={handleChange} 
                ></textarea>
                <footer className="compose-footer">
                    <button type="submit" className="send-btn">Send</button>
                    <button type="button" className="discard-btn" onClick={discardDraft}>Discard</button>
                </footer>
            </form>
        </div>
    )
}
