const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { MailCompose } from './apps/mail/pages/MailCompose.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'
import { BookAdd } from './apps/book/pages/BookAdd.jsx'


export function RootCmp() {
    return (
        <Router>
            <section className="root-cmp">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                    <Route path="/mail/compose" element={<MailCompose />} />
                    
                    <Route path="/note/*" element={<NoteIndex />} />

                    <Route path='/books' element={<BookIndex />} />
                    <Route path='/books/:bookId' element={<BookDetails />} />
                    <Route path='/books/add' element={<BookEdit />} />
                    <Route path='/books/add-from-google' element={<BookAdd />} />
                    <Route path='/books/edit/:bookId' element={<BookEdit />} />
                </Routes>
                <UserMsg />
            </section>
        </Router>
    )
}
