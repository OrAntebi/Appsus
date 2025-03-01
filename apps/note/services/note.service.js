import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { notesData } from './data/notesData.js'

export const noteService = {
    query,
    getById,
    remove,
    save,
    getEmptyNote
}

const KEY = 'notesDB'


function query(stateFilter) {
    return storageService.query(KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = notesData
                _saveNotesToStorage()
            }

            return notes.filter((note) => note.state === stateFilter)
        })
}

function getById(noteId) {
    return storageService.get(KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(KEY, noteId)
}

function save(note) {
    return note.id ? _updateNote(note) : _addNote(note)
}

function getEmptyNote(noteType) {
    const emptyNote = {
        // Optionally, you can generate an ID here or let the storage service handle it.
        // id: utilService.makeId(),
        createdAt: Date.now(),
        type: noteType,
        isPinned: false,
        state: 'active',
        style: {
            backgroundColor: '#FFF8DC'
        },
        info: {}
    }

    switch (noteType) {
        case 'NoteTxt':
            emptyNote.info = { title: '', txt: '' }
            break;
        case 'NoteImg':
            emptyNote.info = { title: '', url: '' }
            break;
        case 'NoteVideo':
            emptyNote.info = { title: '', url: '' }
            break;
        case 'NoteTodos':
            emptyNote.info = { title: '', todos: [] }
            break;
        default:
            emptyNote.info = { title: '', txt: '' }
    }

    return emptyNote;
}

function _updateNote(note) {
    return storageService.put(KEY, note)
}

function _addNote(note) {
    return storageService.post(KEY, note)
}

function _saveNotesToStorage() {
    utilService.saveToStorage(KEY, notesData)
}
