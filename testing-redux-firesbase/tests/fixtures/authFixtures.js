
export const initialState = {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
}

export const authenticatedState = {
        status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
        uid: '123ABC',
        email: 'testing@gmail.com',
        displayName: 'Testing User',
        photoURL: 'https://photo.jpg',
        errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const testingUser = {
    uid: '123ABC',
    email: 'testing@gmail.com',
    displayName: 'Testing User',
    photoURL: 'https://photo.jpg',
}