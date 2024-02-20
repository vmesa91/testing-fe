import { render , screen } from "@testing-library/react"
import { HomePage } from "../../src/09-useContext/HomePage"
import { UserContext } from "../../src/09-useContext/context/UserContext"

describe('Tests in <HomePage />', () => { 

    const user = {
        id: 123,
        name: 'Fernando Herrera',
        email: 'fernando@google.com'
    }

    test('should render the component with user null', () => { 
        
        render( 
        
            <UserContext.Provider value={{ user: null }}>
    
                <HomePage/> 
    
            </UserContext.Provider>
        )    
        
        screen.debug()

        const preTag = screen.getByLabelText('pre')
        expect( preTag.innerHTML ).toBe('null')
        console.log()

     })

    test('should render the component with user valid', () => { 
        
        render( 
        
            <UserContext.Provider value={{ user: user }}>
    
                <HomePage/> 
    
            </UserContext.Provider>
        )    
        
        screen.debug()

        const preTag = screen.getByLabelText('pre')
        expect( preTag.innerHTML ).toContain(user.name)
        expect( preTag.innerHTML ).toContain(`${user.id}`)

     })


 })