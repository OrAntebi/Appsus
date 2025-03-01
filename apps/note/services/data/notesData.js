export const notesData = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        state: 'active',
        style: {
            backgroundColor: '#FFF8DC'
        },
        info: {
            title: 'My First Note',
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        state: 'active',
        style: {
            backgroundColor: '#FFF8DC'
        },
        info: {
            title: 'Bobi and Me',
            url: 'https://picsum.photos/200'
        }
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        state: 'active',
        style: {
            backgroundColor: '#FFF8DC'
        },
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]