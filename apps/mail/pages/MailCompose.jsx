const { useNavigate, useSearchParams } = ReactRouterDOM
const useState = React.useState
const useEffect = React.useEffect

import { mailService } from '../services/mail.service.js'

export function MailCompose() {
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
        mailService.add(newMail).then(() => navigate('/mail'))
    }    

    function discardDraft() {
        mailService.remove(mail.id).then(() => navigate('/mail')) 
    }

    return (
        <section className="mail-compose">
            <h2>New Message</h2>
            <form onSubmit={sendMail}>
                <label>To:</label>
                <input type="email" name="to" value={mail.to} onChange={handleChange} required />

                <label>Subject:</label>
                <input type="text" name="subject" value={mail.subject} onChange={handleChange} required />

                <label>Message:</label>
                <textarea name="body" value={mail.body} onChange={handleChange}></textarea>

                <button type="submit">Send</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </section>
    )
}
