import { fireEvent, render , screen } from "@testing-library/react"
import { LoginPage } from "../../src/09-useContext/LoginPage"
import { UserContext } from "../../src/09-useContext/context/UserContext"

describe('Tests in <LoginPage />', () => { 

    const user = {
        id: 123,
        name: 'Fernando Herrera',
        email: 'fernando@google.com'
    }

    const setUser = jest.fn()

    test('should show the user name', () => { 
        
        render( 
            <UserContext.Provider value={{ user }} >
                <LoginPage />     
            </UserContext.Provider>
        )
        screen.debug()

        const preTag = screen.getByLabelText('pre')
        expect( preTag.innerHTML ).toContain(user.name)

     })

    test('should call setUser when click in the button', () => { 

        render( 
            <UserContext.Provider value={{ user, setUser }} >
                <LoginPage />     
            </UserContext.Provider>
        )

        const button = screen.getByRole('button', { name: 'Establecer usuario' })
        fireEvent.click( button )
       
        expect( setUser ).toHaveBeenCalledTimes(1)
        expect( setUser ).toHaveBeenCalledWith({ id: 123, name: 'Juan', email: 'juan@google.com' })




     })

 })