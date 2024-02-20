import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples"
import { useFetch } from "../../src/hooks/useFetch"
import { useCounter } from "../../src/hooks/useCounter"

jest.mock('../../src/hooks/useFetch')
jest.mock('../../src/hooks/useCounter')

describe('Tests in <MultipleCustomHooks/>', () => { 

    const mockIncrement = jest.fn()

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    })

    beforeEach( () => {
        jest.clearAllMocks()
    } )

    it('Render correctly the component' , () => {

        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        })

        render( <MultipleCustomHooks/> )

        expect( screen.getByText('Loading...') )
        expect( screen.getByText('BreakingBad Quotes') )
        
        const nextButton = screen.getByRole('button', { name: 'Next quote' })
        expect( nextButton.disabled ).toBeTruthy()

    })

    it('Should be show a quote', () => {
        
        useFetch.mockReturnValue({
            data: [{ author: 'Virginia', quote: 'Hi World' }],
            isLoading: false,
            hasError: null
        }) 
        
        render( <MultipleCustomHooks/> )
        screen.debug()

        expect( screen.getByText('Hi World') ).toBeTruthy()
        expect( screen.getByText('Virginia') ).toBeTruthy()
        
        const nextButton = screen.getByRole('button', { name: 'Next quote' })
        expect( nextButton.disabled ).toBeFalsy()

    })

    it('Should call increment function', () => {

        useFetch.mockReturnValue({
            data: [{ author: 'Virginia', quote: 'Hi World' }],
            isLoading: false,
            hasError: null
        }) 

        render( <MultipleCustomHooks/> )

        const nextButton = screen.getByRole('button', { name: 'Next quote' })
        fireEvent.click( nextButton )
        
        expect( mockIncrement ).toHaveBeenCalled()

    })

})

