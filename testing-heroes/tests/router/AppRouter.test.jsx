import { render , screen } from "@testing-library/react"
import { AppRouter } from "../../src/router/AppRouter"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"

describe('Tests in <AppRouter />', () => { 
    
    const initialState = {
        logged: false,  
    }
    test('should show login if it isnt authenticated', () => { 
        
        render( 
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={initialState}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getAllByText('Login').length ).toBe(2)


     })

     test('should show the Marvel Component if it is authenticates', () => { 
        
        const newState = {
            logged: true,
            user: { id: '1', name: 'Virginia Mesa' }  
        }

        render( 
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={newState}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        screen.debug()
        expect( screen.getByText('Marvel')).toBeTruthy()
        expect( screen.getByText(newState.user.name)).toBeTruthy()

      })


 })