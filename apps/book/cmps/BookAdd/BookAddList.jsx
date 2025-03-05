import { LongText } from "../Util-Cmps/LongText.jsx"

export function BookAddList({ booksList, onSave }) {
    return (
        <ul className='google-search-list flex column clean-list'>
            {booksList.map(book =>
                <li key={book.id} className="flex space-between">
                    <LongText text={book.title} length={50} />
                    <button className="btn fa add-book-btn" onClick={() => onSave(book)}></button>
                </li>)}
        </ul>
    )
}
