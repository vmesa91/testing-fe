import { authReducer } from "../../../src/auth/context/authReducer"


describe('Tests in authReducer', () => { 

    const initialState = {
          logged: false,
    }
    
    it('should return initial state', () => { 
        
        const newState = authReducer( initialState, {} )
        expect( newState ).toBe( initialState )

     })

    it('login : should call the login and set up the user', () => { 
        
        const action = {
            type: '[Auth] Login',
            payload: {
                    id: '1',
                    name: 'Virginia Mesa'
            }
        }

        const newState = authReducer( initialState, action )
        expect( newState.user ).toBe( action.payload )
        expect ( newState.logged  ).toBeTruthy()

     })
    it('logout : should call the logout and set up logged false', () => { 
        
        const action = {
            type: '[Auth] Logout'
        }

        const newState = authReducer( initialState, action )
        expect( newState ).toStrictEqual( initialState )

     })





 })