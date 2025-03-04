import { Sidebar } from '../cmps/Sidebar.jsx'
import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailCompose } from '../pages/MailCompose.jsx'

const { useState, useEffect } = React
const useNavigate = ReactRouterDOM.useNavigate

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '', status: 'inbox', isRead: null })
    const [sortBy, setSortBy] = useState('date-newest')
    const [isSideBarOpen, setIsSidebarOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isComposing, setIsComposing] = useState(false)
    const navigate = useNavigate()
    const [allSelected, setAllSelected] = useState(false)

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy).then(mails => {
            let sortedMails = [...mails]

            if (sortBy === 'date-newest') {
                sortedMails.sort((a, b) => b.createdAt - a.createdAt)
            } else if (sortBy === 'date-oldest') {
                sortedMails.sort((a, b) => a.createdAt - b.createdAt)
            } else if (sortBy === 'subject-az') {
                sortedMails.sort((a, b) => a.subject.localeCompare(b.subject))
            } else if (sortBy === 'subject-za') {
                sortedMails.sort((a, b) => b.subject.localeCompare(a.subject))
            }

            setMails(sortedMails)
        })
    }

    function toggleCompose() {
        setIsComposing(prev => !prev)
    }

    function toggleStar(mail) {
        const updatedMail = { ...mail, isStared: !mail.isStared }
        mailService.update(updatedMail).then(() => {
            setMails(prevMails => 
                prevMails.map(m => m.id === mail.id ? updatedMail : m)
            )
        })
    }

    function setLabelFilter(label) {
        setFilterBy(prev => ({
            ...prev,
            labels: label ? [label] : []
        }))
    }

    function toggleSidebar(){
        setIsSidebarOpen(prev => !prev)
    }

    function toggleRead(mail) {
        const updatedMail = { ...mail, isRead: !mail.isRead }
        mailService.update(updatedMail).then(() => {
            setMails(prevMails => prevMails.map(m => m.id === mail.id ? updatedMail : m))
        })
    }

    function handleFilterChange(ev) {
        setFilterBy(prevFilter => ({ ...prevFilter, txt: ev.target.value }))
    }

    function setFolder(status) {
        // Update this function
        if (status === 'starred') {
            setFilterBy(prevFilter => ({ 
                ...prevFilter, 
                status: 'inbox', 
                isStared: true 
            }))
        } else {
            setFilterBy(prevFilter => ({ 
                ...prevFilter, 
                status, 
                isStared: null 
            }))
        }
    }

    function handleRemove(mailId) {
        mailService.remove(mailId).then(() => {
            setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        })
    }

    function handleSelectAll(ev) {
        const isChecked = ev.target.checked
        setAllSelected(isChecked)
    }

    function handleRestore(mailId) {
        mailService.restore(mailId).then(() => {
            loadMails() 
        })
    }

    function setReadFilter(isRead) {
        setFilterBy(prevFilter => ({ ...prevFilter, isRead }))
    }

    return (
        <div className="container">
            <Sidebar onSetFolder={setFolder} 
            isSidebarOpen={isSideBarOpen} 
            toggleSidebar={toggleSidebar} 
            onCompose={toggleCompose}
            />

            <div className="mail-list-container">
            <MailHeader
                filterBy={filterBy}
                onFilterChange={handleFilterChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                setReadFilter={setReadFilter}
                setFolder={setFolder}
                setLabelFilter={setLabelFilter}
                onSelectAll={handleSelectAll}
                allSelected={allSelected}
            />

                <section className="mail-list">
                    <MailList
                        mails={mails}
                        onToggleStar={toggleStar}
                        onToggleRead={toggleRead}
                        onRemove={handleRemove}
                        onRestore={handleRestore}
                        allSelected={allSelected}
                        setAllSelected={setAllSelected}
                    />
                </section>
            </div>

            {isComposing && <MailCompose onClose={toggleCompose} />}
        </div>
    )
}