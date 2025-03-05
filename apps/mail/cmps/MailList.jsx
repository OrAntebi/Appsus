import { MailPreview } from './MailPreview.jsx'
import { archiveMail } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailList({ mails, setMails, onToggleStar, onToggleRead, onRemove, onRestore, allSelected, setAllSelected}) {
    const [selectedMails, setSelectedMails] = useState([])

    useEffect(() => {
        if (allSelected) {
            setSelectedMails(mails.map(mail => mail.id))
        } else {
            setSelectedMails([])
        }
    }, [allSelected, mails])

    function handleSelectMail(mailId, isChecked) {
        if (isChecked) {
            setSelectedMails(prevSelected => [...prevSelected, mailId])
        } else {
            setSelectedMails(prevSelected => prevSelected.filter(id => id !== mailId))
        }
    }

    function handleSelectAll(ev) {
        const isChecked = ev.target.checked
        setAllSelected(isChecked)
    }

    function handleArchive(mailId) {
        archiveMail(mailId)
        
        if (typeof setMails === 'function') {
            setMails(prevMails => prevMails.filter(mail => mail.id !== mailId)) 
        } else {
            console.error("setMails is not available in MailList.jsx")
        }
    }    
    
    useEffect(() => {
        if (mails.length > 0 && selectedMails.length === mails.length) {
            setAllSelected(true)
        } else if (allSelected && selectedMails.length < mails.length) {
            setAllSelected(false)
        }
    }, [selectedMails, mails.length])

    if (!mails || !mails.length) return <p>No emails to show</p>

    return ( 
        <div className='mail-list-container'>
                {mails.map(mail => (
                    <div className="mail-preview-wrapper" key={mail.id}>
                        <MailPreview
                            key={mail.id}
                            mail={mail}
                            setMails={setMails}
                            onToggleStar={onToggleStar}
                            onToggleRead={onToggleRead}
                            onRemove={onRemove}
                            onRestore={onRestore}
                            onSelectMail={(mailId, checked) => {
                            setSelectedMails(prev => checked ? [...prev, mailId] : prev.filter(id => id !== mailId))
                        }}
                            selectedMails={selectedMails}
                            handleArchive={handleArchive}
                        />
                    </div>
                ))}
        </div>
    )
}

