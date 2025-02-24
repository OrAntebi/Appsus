const { useNavigate, useSearchParams } = ReactRouterDOM
const useState = React.useState
const useEffect = React.useEffect

import { mailService } from '../services/mail.service.js'

export function MailCompose() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [mail, setMail] = useState({
        to: searchParams.get('to') || '',
        subject: searchParams.get('subject') || '',
        body: searchParams.get('body') || ''
    })

    useEffect(() => {
        mailService.query({ status: 'draft' }).then(drafts => {
            if (drafts.length > 0) {
                setMail(drafts[0]) 
            }
        })
    }, [])

    useEffect(() => {
        const autoSave = setInterval(() => {
            if (mail.to || mail.subject || mail.body) {
                mailService.saveDraft(mail)
            }
        }, 5000)

        return () => clearInterval(autoSave) 
    }, [mail])

    function handleChange(ev) {
        const { name, value } = ev.target
        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    function sendMail(ev) {
        ev.preventDefault()
        const newMail = { ...mail, sentAt: Date.now(), removedAt: null }
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
