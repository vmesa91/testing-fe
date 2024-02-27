
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

export const activeNote = {
    id: 'ABC123',
    title: 'New note',
    body: 'New note body',
    date: 1234567,
    imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
}