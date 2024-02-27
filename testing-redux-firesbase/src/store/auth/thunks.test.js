import { checkingAuthentication, checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleSignIn, startLogout } from "."
import { testingUser } from "../../../tests/fixtures/authFixtures"
import { logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"

jest.mock( '../../firebase/providers' )

describe('Tests in Auth Thunks', () => { 
    
    const dispatch = jest.fn()
     
    beforeEach( () =>jest.clearAllMocks() )

    test('should call checkingCredentials method', async() => { 

        /* 
         # Primer parámetro : llamar a la función
         # Segundo parámetro : EL retorno de la función 
        
        checkingAuthentication = () => {
            return async( dispatch ) => {}}
        }
        
        */ 
        await checkingAuthentication()( dispatch )
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )

    })

    
    test('startGoogleSignIn should call checkingCredentials & login successfully ', async() => { 
        
        const loginData = {
            ok: true,
            ...testingUser
        }
        await singInWithGoogle.mockResolvedValue( loginData )
        await startGoogleSignIn()( dispatch )
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
       
    })
    test('startGoogleSignIn should call checkingCredentials & logout successfully', async() => { 
        
        const loginData = {
            ok: false,
            errorMessage: 'Error Message'
        }
        await singInWithGoogle.mockResolvedValue( loginData )
        await startGoogleSignIn()( dispatch )
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) )
       
    })

    test('startCreatingUserWithEmailPassword should call checkingCredentials & login successfully ', async() => { 
        
        const loginData = {
            ok: true,
            ...testingUser
        }

        await registerUserWithEmailPassword.mockResolvedValue( loginData )    
        await startCreatingUserWithEmailPassword({ 
            email: testingUser.email,
            password: '123456',
            displayName: testingUser.displayName,
        })( dispatch )    

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )

    })
    test('startCreatingUserWithEmailPassword should call checkingCredentials & logout successfully ', async() => { 
        
        const loginData = {
            ok: false,
            errorMessage: 'Error Message'
        }

        await registerUserWithEmailPassword.mockResolvedValue( loginData )    
        await startCreatingUserWithEmailPassword({ 
            email: testingUser.email,
            password: '123456',
            displayName: testingUser.displayName,
        })( dispatch )    

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) )

    })


    test('startLogout should call logoutFirebase, clearNotes & logout', async() => {
      
        await startLogout()( dispatch )
        expect( logoutFirebase ).toHaveBeenCalled()
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() )
        expect( dispatch ).toHaveBeenCalledWith( logout() )

    })


 })