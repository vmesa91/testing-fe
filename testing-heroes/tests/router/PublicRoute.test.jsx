import { render , screen } from "@testing-library/react"
import { PublicRoute } from "../../src/router/PublicRoute"
import { AuthContext } from "../../src/auth"
import { MemoryRouter, Routes, Route } from "react-router-dom"

describe('Tests in <PublicRoute />', () => { 

    const initialState = {
        logged: false,  
    }

    test('should show children if it doesnt authenticated', () => { 

        render( 
            < AuthContext.Provider value={initialState}>
                <PublicRoute>
                        <h1>Public Route</h1>
                </PublicRoute>
            </AuthContext.Provider >
        )

        expect( screen.getByText('Public Route') ).toBeTruthy()

     })

    test('should navigate if it is authenticated', () => { 


        const newState = {
            logged: true,
            user: { id: '1', name: 'Virginia Mesa' }  
        }

        render( 
            <AuthContext.Provider value={newState}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={ 
                            <PublicRoute>
                                <h1>Public Route</h1>
                            </PublicRoute> }>
                        </Route>
                        <Route path='marvel' element={ <h1> Marvel </h1> }></Route>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider >
        )

        expect( screen.getByText('Marvel') ).toBeTruthy()


     })

 })
