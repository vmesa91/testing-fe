
export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // }
}

export const activeNoteState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: {
        id: 'ABC123',
        title: '',
        body: '',
        date: 1234567,
        imageUrls: ['https://foto1.jpg'], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    }
}

export const savingNewNoteState = {
    isSaving: true,
    messageSaved: '',
    notes: [],
    active: null,
}

export const notesState = {
    isSaving: false,
    messageSaved: '',
    notes: [
        {  
            id: '1',
            title: 'New note 1',
            body: 'New note body 1',
            date: 345678,
            imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'],
        }, 
        {  
            id: '2',
            title: 'New note 2',
            body: 'New note body 2',
            date: 876644,
            imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'],
        }
    ],
    active: null,
}


export const newNote = {
    id: 'ABC123',
    title: 'New note',
    body: 'New note body',
    date: 1234567,
    imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
}

export const newEmptyNote = {
    id: 'ABC123',
    title: '',
    body: '',
    date: 1234567,
    imageUrls: []
}
