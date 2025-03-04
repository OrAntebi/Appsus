import { MailPreview } from './MailPreview.jsx'
const { useState, useEffect } = React

export function MailList({ mails, onToggleStar, onToggleRead, onRemove, onRestore, allSelected, setAllSelected }) {
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
                            onToggleStar={onToggleStar}
                            onToggleRead={onToggleRead}
                            onRemove={onRemove}
                            onRestore={onRestore}
                            onSelectMail={handleSelectMail}
                            selectedMails={selectedMails}
                        />
                    </div>
                ))}
        </div>
    )
}

