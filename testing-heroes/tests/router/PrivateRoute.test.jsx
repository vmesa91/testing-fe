import { render , screen } from "@testing-library/react"
import { PrivateRoute } from "../../src/router/PrivateRoute"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"

describe('Tests in <PrivateRoute />', () => { 


    const initialState = {
        logged: true,
        user: { id: '1', name: 'Virginia Mesa' }  
    }
    
    test('should show children if it is authenticated', () => { 

        Storage.prototype.setItem = jest.fn()
        
        render( 
            < AuthContext.Provider value={initialState}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                            <h1>Private Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider >
        )

        expect( screen.getByText('Private Route') ).toBeTruthy()
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman')

     })
 })