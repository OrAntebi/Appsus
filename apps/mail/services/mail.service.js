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
        to: loggedinUser.email,
        isStared: false,
        labels: ['Funny']
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
    let filteredMails = mails
    if (filterBy.status) {
        if (filterBy.status === 'inbox') {
            filteredMails = filteredMails.filter(mail => mail.to === loggedinUser.email && !mail.removedAt)
        } else if (filterBy.status === 'sent') {
            filteredMails = filteredMails.filter(mail => mail.from === loggedinUser.email && !mail.removedAt)
        } else if (filterBy.status === 'trash') {
            filteredMails = filteredMails.filter(mail => mail.removedAt)
        } else if (filterBy.status === 'draft') {
            filteredMails = filteredMails.filter(mail => !mail.sentAt && !mail.removedAt) // ✅ Drafts have no sentAt
        }
    }
    if (filterBy.txt) {
        filteredMails = filteredMails.filter(mail => 
            mail.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) || 
            mail.body.toLowerCase().includes(filterBy.txt.toLowerCase())
        )
    }
    if (filterBy.hasOwnProperty('isRead') && filterBy.isRead !== null && filterBy.isRead !== 'all') {
        filteredMails = filteredMails.filter(mail => mail.isRead === filterBy.isRead)
    }
    if (filterBy.hasOwnProperty('isStared') && filterBy.isStared !== null) {
        filteredMails = filteredMails.filter(mail => mail.isStared === filterBy.isStared)
    }    
    if (filterBy.labels && filterBy.labels.length) {
        filteredMails = filteredMails.filter(mail => {
            return filterBy.labels.some(label => mail.labels.includes(label))
        })
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
    mails.push(newMail)
    return Promise.resolve(newMail)
}

function update(updatedMail) {
    mails = mails.map(mail => mail.id === updatedMail.id ? updatedMail : mail)
    return Promise.resolve(updatedMail)
}

function remove(mailId) {
    const mailIndex = mails.findIndex(mail => mail.id === mailId)

    if (mailIndex === -1) return Promise.reject('Mail not found')

    if (mails[mailIndex].removedAt) {
        mails.splice(mailIndex, 1) // Permanently delete
    } else {
        mails[mailIndex].removedAt = Date.now() // Move to trash
    }

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
    const existingDraftIndex = mails.findIndex(mail => mail.id === draftMail.id)

    if (existingDraftIndex !== -1) {
        mails[existingDraftIndex] = draftMail 
    } else {
        draftMail.id = makeId()
        draftMail.createdAt = Date.now()
        draftMail.removedAt = null
        mails.push(draftMail) 
    }

    return Promise.resolve(draftMail)
}

function autoSaveDraft(draftMail) {
    setInterval(() => {
        saveDraft(draftMail)
    }, 5000)
}

function restore(mailId) {
    const mail = mails.find(mail => mail.id === mailId)
    if (!mail || !mail.removedAt) return Promise.reject('Mail not found in trash')

    mail.removedAt = null
    return Promise.resolve(mail)
}

function toggleLabel(mailId, label) {
    const mail = mails.find(mail => mail.id === mailId)
    if (!mail) return Promise.reject('Mail not found')

    if (!mail.labels.includes(label)) {
        mail.labels.push(label)
    } else {
        mail.labels = mail.labels.filter(l => l !== label)
    }

    return Promise.resolve(mail)
}


