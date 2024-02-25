import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"
import { MemoryRouter, useNavigate } from "react-router-dom"


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }))

describe('Tests in <SearchPage />', () => { 
 
    beforeEach( () => { jest.clearAllMocks() } )
    
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

        const input = screen.getByRole('textbox', { value: { name: 'searchText' } })
        expect( input.value ).toBe('batman')

        const headingTitle = screen.getByRole('heading', { level: 5 })   
        expect( headingTitle.textContent ).toBe('Batman')

        const divNoHero = screen.getByLabelText('alert-no-hero')
        expect( divNoHero.style.display ).toBe('none')

      })

      test('should show an error if it doesnt find the hero (batman123)', () => { 
        
        render( 
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/> 
            </MemoryRouter>
        )  

        const divNoHero = screen.getByLabelText('alert-no-hero')
        expect( divNoHero.style.display ).toBe('')
        expect( divNoHero.innerHTML ).toContain('batman123')

       })

       test('should call the navigate method to see a hero', () => { 

        const navigate = jest.fn()
        useNavigate.mockReturnValue(navigate)
        
        render( 
            <MemoryRouter>
                <SearchPage/> 
            </MemoryRouter>
        )   

        screen.debug()

        const formInput = screen.getByRole('textbox')
        fireEvent.change( formInput, { target: { name: 'searchText', value: 'superman' }})

        const form = screen.getByLabelText('form')
        fireEvent.submit( form )

        expect(navigate).toHaveBeenCalledWith('?q=superman')


        })
 })