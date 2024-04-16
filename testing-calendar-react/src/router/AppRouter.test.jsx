import { render, renderHook, screen } from "@testing-library/react"
import { AppRouter } from "./AppRouter"
import { useAuthStore } from "../hooks"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../calendar"

jest.mock('../hooks/useAuthStore')

jest.mock('../calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('Tests in < AppRouter />', () => { 

    const mockCheckAuthToken = jest.fn()

    beforeEach( () =>  jest.clearAllMocks() )
    
    test('should show the initial screen and call checkAuthToken', () => { 

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        })
        
        render( < AppRouter /> )

        expect( screen.getByText('Cargando...')).toBeTruthy()
        expect( mockCheckAuthToken ).toHaveBeenCalled()

     })
    test('should show the login screen if you are not authenticated', () => { 

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        })
        
        const { container } = render( 
            <MemoryRouter initialEntries={['/auth4/other']}>
                < AppRouter /> 
            </MemoryRouter>
        )

        expect( screen.getByText('Ingreso')).toBeTruthy()
        expect( container ).toMatchSnapshot()

     })
    test('should enter int the Calendar screen if you are authenticated', () => { 

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        render( 
            <MemoryRouter>
                < AppRouter /> 
            </MemoryRouter>
        )

        expect( screen.getByText('CalendarPage')).toBeTruthy()

     })

 })