import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { notesData } from './data/notesData.js'

export const noteService = {
    query,
    getById,
    remove,
    save,
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

function _updateNote(note) {
    return storageService.put(KEY, note)
}

function _addNote(note) {
    return storageService.post(KEY, note)
}

function _saveNotesToStorage() {
    utilService.saveToStorage(KEY, notesData)
}
