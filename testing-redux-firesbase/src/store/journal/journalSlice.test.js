import { activeNoteState, initialState, newEmptyNote, newNote, notesState, savingNewNoteState } from "../../../tests/fixtures/journalFixtures"
import { addNewEmptyNote, clearNotesLogout, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"

describe('Tests in Journal Slice', () => {
  
    test('should return the initial state and call it journal', () => { 
        
        const state = journalSlice.reducer( initialState, {} )

        expect( state ).toBe( initialState )
        expect( journalSlice.name ).toBe('journal')

     })    

    test('should save a new note successfully', () => { 
        
         const action = savingNewNote()
         const state = journalSlice.reducer( initialState, action )
 
         expect( state ).toStrictEqual( savingNewNoteState )
         expect( state.isSaving ).toBeTruthy()

    })

    test('should add a new empty note successfully', () => { 
        
        const action = addNewEmptyNote( newEmptyNote )
        const state = journalSlice.reducer( notesState, action )

        expect( state.notes ).toStrictEqual([ ...notesState.notes, newEmptyNote ])
        expect( state.notes.length ).toBe(3)

   })
    test('should set as active a note successfully', () => { 
        
        const action = setActiveNote( newNote )
        const state = journalSlice.reducer( initialState, action )

        expect( state.active ).toStrictEqual( newNote )

   })
    test('should set notes successfully', () => { 
        
        const action = setNotes( newNote )
        const state = journalSlice.reducer( notesState, action )

        expect( state.notes ).toStrictEqual( newNote )

   })
    test('should set saving successfully', () => { 
        
        const action = setSaving()
        const state = journalSlice.reducer( initialState, action )

        expect( state.isSaving ).toBeTruthy()

   })

    test('should update Note successfully', () => { 

        const updatedNote = {  
            id: '1',
            title: 'Update note 1',
            body: 'Update note body 1',
            date: 345678,
            imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'],
        }
        
        const action = updateNote( updatedNote )
        const state = journalSlice.reducer( notesState, action )

        expect( state.notes[0] ).toStrictEqual({
            id: '1',
            title: 'Update note 1',
            body: 'Update note body 1',
            date: 345678,
            imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'],
        })
        expect( state.messageSaved ).toBe('Update note 1, actualizada correctamente')

   })

   test('should set photos in the active note successfully', () => { 

        const newPhotoNote = ['https://newphoto.jpg']

        const action = setPhotosToActiveNote( newPhotoNote )
        const state = journalSlice.reducer( activeNoteState, action )

        expect( state.isSaving ).toBeFalsy()
        expect( state.active.imageUrls ).toContain( ...newPhotoNote )
        expect( state.active.imageUrls.length ).toBe( 2 )

   })

   test('should clear notes successfully', () => { 

        const action = clearNotesLogout()
        const state = journalSlice.reducer( notesState, action )

        expect( state ).toStrictEqual({
            isSaving: false,
            messageSaved: '',
            notes: [],
            active: null
        })

    })

    test('should delete note by id successfully', () => { 

        const noteId =  {  
            id: '1',
            title: 'New note 1',
            body: 'New note body 1',
            date: 345678,
            imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'],
        }
        
        const action = deleteNoteById( noteId.id )
        const state = journalSlice.reducer( notesState, action )

        expect( state.active ).toBe(null)
        expect( state.notes.length ).toBe(1)
        expect( state.notes ).not.toContain( noteId )

     })




})