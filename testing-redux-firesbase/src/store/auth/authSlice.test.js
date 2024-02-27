import { authenticatedState, initialState, notAuthenticatedState, testingUser } from "../../../tests/fixtures/authFixtures"
import { authSlice, checkingCredentials, login, logout } from "./authSlice"

describe('Tests in authSlice', () => { 
    
    test('should return the initial state  and call it auth', () => { 
        
        const state = authSlice.reducer(initialState, {})

        expect( state ).toBe( initialState ) 
        expect( authSlice.name ).toBe('auth')

     })

     test('should authenticate successfully', () => { 

        const action = login( testingUser )
        const state = authSlice.reducer(initialState, action)

        expect( state ).toStrictEqual( authenticatedState ) 

      })

     test('should logout successfully', () => { 

        const action = logout()
        const state = authSlice.reducer(authenticatedState, action)

        expect( state ).toStrictEqual( {
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: notAuthenticatedState.uid,
            email: notAuthenticatedState.email,
            displayName: notAuthenticatedState.displayName,
            photoURL: notAuthenticatedState.photoURL,
            errorMessage: undefined,
        } ) 

      })
     test('should logout with an error', () => { 

        const errorMessage = 'Credentials are incorrect'
        const action = logout( { errorMessage } )
        const state = authSlice.reducer(authenticatedState, action)

        expect( state ).toStrictEqual( {
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: notAuthenticatedState.uid,
            email: notAuthenticatedState.email,
            displayName: notAuthenticatedState.displayName,
            photoURL: notAuthenticatedState.photoURL,
            errorMessage
        } ) 

      })


      test('should change to checking state', () => {
        
        const action = checkingCredentials()
        const state = authSlice.reducer( initialState, action )
        expect( state.status ).toBe('checking')
      })

 })