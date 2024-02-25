import { fireEvent, render, screen } from "@testing-library/react"
import { Navbar } from "../../../src/ui"
import { AuthContext } from "../../../src/auth"
import { MemoryRouter, useNavigate } from "react-router-dom"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }))

describe('Tests in <NavBar />', () => { 
    
    const newState = {
        logged: true,
        user: { id: '1', name: 'Virginia Mesa' },
        logout: jest.fn()  
    }

    beforeEach( () => { jest.clearAllMocks() } )

    test('should show the user name', () => { 
        
        render( 
            <AuthContext.Provider value={newState}>
                <MemoryRouter>
                    < Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText(newState.user.name)).toBeTruthy()

     })

     
    test('should call to logout and navigate when click in the Logout button', () => { 
        
        const navigate = jest.fn()
        useNavigate.mockReturnValue(navigate)

        render( 
            <AuthContext.Provider value={newState}>
                <MemoryRouter>
                    < Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutButton = screen.getByRole('button' , { value: { name: 'Logout' } })
        fireEvent.click(logoutButton)
        
        expect( newState.logout ).toHaveBeenCalled()
        expect(navigate).toHaveBeenCalledWith('/login', {"replace": true})
        

      }) 

 })