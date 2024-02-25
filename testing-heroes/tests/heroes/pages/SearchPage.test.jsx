import { render, screen } from "@testing-library/react"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"
import { MemoryRouter } from "react-router-dom"

describe('Tests in <SearchPage />', () => { 
    
    test('should render the component', () => { 
        
        const { container } = render( 
            <MemoryRouter>
                <SearchPage/> 
            </MemoryRouter>
        )   

       expect( container ).toMatchSnapshot()

     })


     test('should show batman when I look for it and show the input with the correct queryString', () => { 
        
        render( 
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/> 
            </MemoryRouter>
        )   

        screen.debug()
        const input = screen.getByRole('textbox', { value: { name: 'searchText' } })
        expect( input.value ).toBe('batman')

        const headingTitle = screen.getByRole('heading', { level: 5 })   
        expect( headingTitle ).toContain('Batman')
        


      })
 })