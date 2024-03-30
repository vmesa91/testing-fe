import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from ".";
import { FirebaseDB } from "../../firebase/config";

describe('Tests in Journal thunks', () => {

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach( () => jest.clearAllMocks() ) 
    
    test('startNewNote should create a new note successfully', async() => {
        
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } })

        await startNewNote()( dispatch, getState )

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() )
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({ 
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number )
         }))
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({ 
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number )
         }))  
         
        // Borrar  de firebase
        const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` )
        const docs = await getDocs( collectionRef )

        const deletePromises = []
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) )
        await Promise.all( deletePromises )
    })

})