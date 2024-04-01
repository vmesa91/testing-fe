import { initialState } from "../../../tests/fixtures/authStatesFixture"
import { testUser } from "../../../tests/fixtures/userFixture"
import { authSlice, clearErrorMessage, onLogin, onLogout } from "./authSlice"

describe('Tests in authSlice', () => { 
    
    test('should return the initial State', () => { 
        
        expect( authSlice.getInitialState() ).toEqual( initialState )

     })


     test('should login successfully', () => { 
        
        const state = authSlice.reducer( initialState, onLogin( testUser ) )
       
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUser,
            errorMessage: undefined
        })
        
      })


    test('should logout successfully', () => { 

        const state = authSlice.reducer( initialState, onLogout( testUser ) )
        
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: testUser
        })
     })

     test('should logout with an error & clear it', () => { 
        
        const errorMessage = 'Error Message in testing'
        const state = authSlice.reducer( initialState, onLogout( errorMessage ) )
        
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage
        })

        const newState = authSlice.reducer( state, clearErrorMessage() )
        expect( newState.errorMessage ).toBeUndefined()
        
      })

 })