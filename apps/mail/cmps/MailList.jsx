import { MailPreview } from './MailPreview.jsx'
const { useState } = React

export function MailList({ mails, onToggleStar, onToggleRead, onRemove, onRestore }) {
    const [selectedMails, setSelectedMails] = useState([])

    function handleSelectMail(mailId, isChecked) {
        setSelectedMails(prevSelected => 
            isChecked 
                ? [...prevSelected, mailId] 
                : prevSelected.filter(id => id !== mailId)
        )
    }

    function handleSelectAll(ev) {
        const isChecked = ev.target.checked
        setSelectedMails(isChecked ? mails.map(mail => mail.id) : [])
    }

    if (!mails || !mails.length) return <p>No emails to show</p>

    return ( 
        <div className='mail-box'>
            {/* "Select All" Checkbox */}
            <div className="select-all-container">
                <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedMails.length === mails.length && mails.length > 0}
                />
                <span>Select All</span>
            </div>

                {mails.map(mail => (
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
                ))}
        </div>

    )
}


