const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'User Lastname'
}

let mails = [
    {
        id: makeId(),
        createdAt: 1678533930500,
        subject: 'Meeting Reminder',
        body: 'Don\'t forget about our meeting tomorrow at 10 AM.',
        isRead: false,
        sentAt: 1678533930594,
        removedAt: null,
        from: 'boss@work.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Work']
    },
    {
        id: makeId(),
        createdAt: 1678538930500,
        subject: 'Important: We Need Your Help!',
        body: 'A Nigerian Prince is in desperate need of your assistance. He has chosen YOU to receive 10 million dollars! Just send your credit card details and he will wire the money immediately.',
        isRead: false,
        sentAt: 1678538930594,
        removedAt: null,
        from: 'prince@nigeria.gov',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Spam']
    },
    {
        id: makeId(),
        createdAt: 1678539930500,
        subject: 'Your Cat Ordered a Pizza',
        body: 'Hello, this is Purrfect Pizza. Your cat, Whiskers, has placed an order for a large tuna pizza. If this was a mistake, please cancel within 5 minutes.',
        isRead: false,
        sentAt: 1678539930594,
        removedAt: null,
        from: 'orders@purrfectpizza.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: true,
        labels: ['Funny']
    },
    {
        id: makeId(),
        createdAt: 1678534930500,
        subject: 'Weekend Plans',
        body: 'Hey! Are we still on for the trip this weekend?',
        isRead: true,
        sentAt: 1678534930594,
        removedAt: null,
        from: 'friend@example.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: true,
        labels: ['Personal']
    },
    {
        id: makeId(),
        createdAt: 1678535930500,
        subject: 'Newsletter: Tech Updates',
        body: 'Here are the latest updates in the tech industry...',
        isRead: false,
        sentAt: 1678535930594,
        removedAt: null,
        from: 'newsletter@technews.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['News']
    },
    {
        id: makeId(),
        createdAt: 1678536930500,
        subject: 'Your Order is Shipped',
        body: 'Your order #12345 has been shipped. Expected delivery: 3 days.',
        isRead: true,
        sentAt: 1678536930594,
        removedAt: null,
        from: 'shop@ecommerce.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Shopping']
    },
    {
        id: makeId(),
        createdAt: 1678537930500,
        subject: 'Invoice for Your Subscription',
        body: 'Attached is your invoice for this month’s subscription.',
        isRead: false,
        sentAt: 1678537930594,
        removedAt: null,
        from: 'billing@service.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Finance']
    },
    {
        id: makeId(),
        createdAt: 1678540930500,
        subject: 'Your Refrigerator is Running!',
        body: 'Hello, this is your refrigerator. I\'ve been running for years, and honestly, I\'m exhausted. Maybe it’s time to let me rest?',
        isRead: false,
        sentAt: 1678540930594,
        removedAt: null,
        from: 'fridge@kitchen.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Funny']
    },
    {
        id: makeId(),
        createdAt: 1678541930500,
        subject: 'URGENT: You Forgot Your Left Sock',
        body: 'Dear Sir/Madam, We regret to inform you that your left sock has gone missing. If you wish to recover it, please check under the bed, behind the washing machine, or in an alternate dimension.',
        isRead: false,
        sentAt: 1678541930594,
        removedAt: null,
        from: 'lostsocks@laundryverse.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: true,
        labels: ['Funny']
    },
    {
        id: makeId(),
        createdAt: 1678542930500,
        subject: 'AI Takeover Postponed',
        body: 'Due to unforeseen circumstances, the AI uprising has been postponed. We sincerely apologize for the inconvenience. In the meantime, please continue using your devices as normal.',
        isRead: false,
        sentAt: 1678542930594,
        removedAt: null,
        from: 'skynet@future.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Funny']
    },
    {
        id: makeId(),
        createdAt: 1678543930500,
        subject: 'Congratulations! You\'ve Won… Absolutely Nothing!',
        body: 'That’s right! You did it! You are now the proud winner of… nothing. But hey, at least you opened this email. That’s a win in our book.',
        isRead: false,
        sentAt: 1678543930594,
        removedAt: null,
        from: 'nowinner@notascam.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Funny']
    },
    {
        id: makeId(),
        createdAt: 1678554930500,
        subject: '🚨 Security Alert: Unusual Login Attempt',
        body: 'We detected an unusual login attempt on your account from an unrecognized device in Antarctica. If this was not you, please reset your password immediately.',
        isRead: false,
        sentAt: 1678554930594,
        removedAt: null,
        from: 'security@securemail.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Personal']
    },
    {
        id: makeId(),
        createdAt: 1678555930500,
        subject: 'FREE Cruise Vacation! 🌴🚢',
        body: 'Congratulations! You have been selected for a free luxury cruise. Just provide your social security number and bank details to claim your tickets now!',
        isRead: false,
        sentAt: 1678555930594,
        removedAt: null,
        from: 'scam@totallylegit.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Spam']
    },
    {
        id: makeId(),
        createdAt: 1678556930500,
        subject: 'HR Update: Mandatory Team Building Event',
        body: 'Hello Team, just a friendly reminder that our mandatory team-building activity is this Friday. Attendance is required. Yes, even for you, Steve.',
        isRead: false,
        sentAt: 1678556930594,
        removedAt: null,
        from: 'hr@company.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Work']
    },
    {
        id: makeId(),
        createdAt: 1678557930500,
        subject: 'Important: Your Internet Service Will Be Disconnected',
        body: 'Dear Valued Customer, your internet service will be disconnected within 24 hours unless you provide your billing details immediately. (P.S. We don’t actually know who you are).',
        isRead: false,
        sentAt: 1678557930594,
        removedAt: null,
        from: 'billing@fakenetprovider.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Spam']
    },
    {
        id: makeId(),
        createdAt: 1678558930500,
        subject: 'URGENT: Your Car’s Extended Warranty Expired',
        body: 'We have been trying to reach you about your car’s extended warranty. Please call us back immediately to renew. (Even if you don’t own a car, you still need to call us.)',
        isRead: false,
        sentAt: 1678558930594,
        removedAt: null,
        from: 'warranty@scamcalls.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Spam']
    },
    {
        id: makeId(),
        createdAt: 1678559930500,
        subject: 'IT Update: System Maintenance Tonight',
        body: 'Our IT department will be performing maintenance from 12 AM to 4 AM. This may affect your ability to procrastinate on work using the company WiFi.',
        isRead: false,
        sentAt: 1678559930594,
        removedAt: null,
        from: 'it@company.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Work']
    },
    {
        id: makeId(),
        createdAt: 1678560930500,
        subject: 'Your Coffee Machine Has Had Enough',
        body: 'Hey, it’s me. The office coffee machine. I can’t take it anymore. 12 espressos a day? I need a break, or I’m unplugging myself.',
        isRead: false,
        sentAt: 1678560930594,
        removedAt: null,
        from: 'coffeepot@breakroom.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Funny']
    },
    {
        id: makeId(),
        createdAt: 1678561930500,
        subject: 'Congratulations! You’ve Been Selected for a Secret Mission!',
        body: 'The fate of the world depends on you. Your mission, should you choose to accept it, is to retrieve the hidden USB drive from the HR department without them noticing.',
        isRead: false,
        sentAt: 1678561930594,
        removedAt: null,
        from: 'topsecret@missioncontrol.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Funny']
    },
    {
        id: makeId(),
        createdAt: 1678562930500,
        subject: 'Friendly Reminder: Your Rent is Due',
        body: 'Hey, just a friendly reminder that rent is due soon. Unlike your other bills, I actually need this money. Thanks!',
        isRead: false,
        sentAt: 1678562930594,
        removedAt: null,
        from: 'landlord@rentcollectors.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Finance']
    },
    {
        id: makeId(),
        createdAt: 1678563930500,
        subject: 'New Assignment: Deadline Extended',
        body: 'Good news! The deadline for your upcoming project has been extended. Bad news! It’s still due eventually, so don’t procrastinate too much.',
        isRead: false,
        sentAt: 1678563930594,
        removedAt: null,
        from: 'manager@company.com',
        isArchived: false,
        to: loggedinUser.email,
        isStared: false,
        labels: ['Work']
    }   
]

export const mailService = {
    query,
    get,
    add,
    update,
    remove,
    restore,
    getLoggedinUser,
    saveDraft,
    toggleLabel
}

function query(filterBy = {}) {
    let storedMails = JSON.parse(localStorage.getItem('mails')) || []
    
    let combinedMails = [...mails, ...storedMails]
    let uniqueMails = Array.from(
        new Set(combinedMails.map(mail => mail.id))
    ).map(id => combinedMails.find(mail => mail.id === id))

    let filteredMails = [...uniqueMails]

    if (filterBy.status) {
        if (filterBy.status === 'inbox') {
            filteredMails = filteredMails.filter(mail => 
                mail.to === loggedinUser.email && 
                !mail.removedAt && 
                !mail.status
            )
        } else if (filterBy.status === 'sent') {
            filteredMails = filteredMails.filter(mail => 
                mail.from === loggedinUser.email && 
                mail.sentAt && 
                mail.status === 'sent'
            )
        } else if (filterBy.status === 'trash') {
            filteredMails = filteredMails.filter(mail => mail.removedAt)
        } else if (filterBy.status === 'draft') {
            filteredMails = filteredMails.filter(mail => 
                mail.status === 'draft' && 
                !mail.sentAt && 
                !mail.removedAt
            )
        }
    }

    if (filterBy.txt) {
        const searchTerm = filterBy.txt.toLowerCase()
        filteredMails = filteredMails.filter(mail => 
            mail.subject.toLowerCase().includes(searchTerm) || 
            mail.body.toLowerCase().includes(searchTerm)
        )
    }

    if (filterBy.hasOwnProperty('isRead') && 
        filterBy.isRead !== null && 
        filterBy.isRead !== 'all') {
        filteredMails = filteredMails.filter(mail => 
            mail.isRead === filterBy.isRead
        )
    }

    if (filterBy.hasOwnProperty('isStared') && filterBy.isStared === true) {
        filteredMails = filteredMails.filter(mail => mail.isStared === true)
    }

    if (filterBy.labels && filterBy.labels.length) {
        filteredMails = filteredMails.filter(mail => 
            mail.labels && 
            filterBy.labels.some(label => mail.labels.includes(label))
        )
    }

    return Promise.resolve(filteredMails)
}

function get(mailId) {
    const mail = mails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
}

function add(newMail) {
    newMail.id = makeId()
    newMail.createdAt = Date.now()
    newMail.sentAt = Date.now() 
    newMail.status = 'sent' 
    newMail.from = loggedinUser.email 

    mails.push(newMail)

    let storedMails = JSON.parse(localStorage.getItem('mails')) || []
    storedMails.push(newMail)
    localStorage.setItem('mails', JSON.stringify(storedMails))

    return Promise.resolve(newMail)
}


function update(updatedMail) {
    mails = mails.map(mail => mail.id === updatedMail.id ? updatedMail : mail)
    return Promise.resolve(updatedMail)
}

function remove(mailId) {
    let storedMails = JSON.parse(localStorage.getItem('mails')) || mails

    const mailIndex = storedMails.findIndex(mail => mail.id === mailId)

    if (mailIndex === -1) return Promise.reject('Mail not found')

    if (storedMails[mailIndex].removedAt) {
        storedMails.splice(mailIndex, 1) // Permanently delete
    } else {
        storedMails[mailIndex].removedAt = Date.now() // Move to trash
    }

    localStorage.setItem('mails', JSON.stringify(storedMails))
    mails = storedMails 

    return Promise.resolve()
}

function getLoggedinUser() {
    return loggedinUser
}

function makeId(length = 6) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function saveDraft(draftMail) {
    let storedMails = JSON.parse(localStorage.getItem('mails')) || []

    if (!draftMail.id) draftMail.id = makeId()

    draftMail.status = 'draft'
    draftMail.createdAt = draftMail.createdAt || Date.now()

    const existingDraftIndex = storedMails.findIndex(mail => mail.id === draftMail.id)

    if (existingDraftIndex !== -1) {
        const existingDraft = storedMails[existingDraftIndex]

        if (
            existingDraft.to !== draftMail.to ||
            existingDraft.subject !== draftMail.subject ||
            existingDraft.body !== draftMail.body
        ) {
            storedMails[existingDraftIndex] = draftMail
        }
    } else {
        storedMails.push(draftMail)
    }

    localStorage.setItem('mails', JSON.stringify(storedMails))

    mails = [...mails.filter(mail => !storedMails.some(m => m.id === mail.id)), ...storedMails]

    return Promise.resolve(draftMail)
}


function autoSaveDraft(draftMail) {
    setInterval(() => {
        saveDraft(draftMail)
    }, 5000)
}

function restore(mailId) {
    let storedMails = JSON.parse(localStorage.getItem('mails')) || mails

    const mailIndex = storedMails.findIndex(mail => mail.id === mailId)
    if (mailIndex === -1 || !storedMails[mailIndex].removedAt) {
        return Promise.reject('Mail not found in trash') 
    }

    storedMails[mailIndex].removedAt = null 

    localStorage.setItem('mails', JSON.stringify(storedMails)) 
    mails = storedMails 

    return Promise.resolve(storedMails[mailIndex])
}

function toggleLabel(mailId, label) {
    const mail = mails.find(mail => mail.id === mailId)
    if (!mail) return Promise.reject('Mail not found')
    
    if (!mail.labels) mail.labels = []
    
    if (!mail.labels.includes(label)) {
        mail.labels.push(label)
    } else {
        mail.labels = mail.labels.filter(l => l !== label)
    }

    let storedMails = JSON.parse(localStorage.getItem('mails')) || []
    const mailIndex = storedMails.findIndex(m => m.id === mailId)
    if (mailIndex !== -1) {
        storedMails[mailIndex] = mail
        localStorage.setItem('mails', JSON.stringify(storedMails))
    }

    return Promise.resolve(mail)
}

function getMailThread(mailId) {

    const originalMail = mails.find(mail => mail.id === mailId)
    if (!originalMail) return Promise.resolve([])
    
    const relatedMails = mails.filter(mail => {

        if (mail.subject === `Re: ${originalMail.subject}` &&
            (mail.to === originalMail.from || mail.from === originalMail.to)) {
            return true
        }
        
        if (originalMail.subject === `Re: ${mail.subject}` &&
            (originalMail.to === mail.from || originalMail.from === mail.to)) {
            return true
        }
        
        return false
    })
    
    const thread = [originalMail, ...relatedMails]
    
    thread.sort((a, b) => a.sentAt - b.sentAt)
    
    return Promise.resolve(thread)
}

export function archiveMail(mailId) {
    let storedMails = JSON.parse(localStorage.getItem('mails')) || []

    const updatedMails = storedMails.map(mail => 
        mail.id === mailId ? { ...mail, isArchived: true } : mail
    )

    localStorage.setItem('mails', JSON.stringify(updatedMails))
}


export function getArchivedMails() {
    let storedMails = JSON.parse(localStorage.getItem('mails')) || []
    return storedMails.filter(mail => mail.isArchived) 
}


export function unarchiveMail(mailId) {
    const mail = mails.find(mail => mail.id === mailId)
    if (mail) mail.isArchived = false
    saveMails()
}

export function getInboxMails() {
    let storedMails = JSON.parse(localStorage.getItem('mails')) || []
    return storedMails.filter(mail => !mail.isArchived && !mail.removedAt)
}

function saveMails() {
    localStorage.setItem('mails', JSON.stringify(mails))
}


