import { fireEvent, render, screen } from "@testing-library/react"
import { TodoAdd } from "../../src/08-useReducer/TodoAdd"


describe('Test in <TodoAdd />', () => { 
    
    test('should render the component', () => { 
        
        render( <TodoAdd /> )
        
        expect( screen.getByPlaceholderText('¿Qué hay que hacer?' )).toBeDefined()
        expect( screen.getByRole('button', { name: 'Agregar'} )).toBeDefined()

     })

    test('should call onNewTodo is submitted with valid input', () => { 

        const onNewTodoMock = jest.fn()

        render( <TodoAdd onNewTodo={onNewTodoMock} /> )
       

        const addButton = screen.getByRole('button', { name: 'Agregar'} )
        const inputText = screen.getByPlaceholderText('¿Qué hay que hacer?' )

        fireEvent.change( inputText, { target: { value: 'New Todo Description' } } )
        fireEvent.click( addButton )

        expect( onNewTodoMock ).toHaveBeenCalledTimes(1)
        expect( inputText.value).toBe('')
    })

    test('should not call onNewTodo is submitted with invalid input', () => { 

        const onNewTodoMock = jest.fn()

        render( <TodoAdd onNewTodo={onNewTodoMock} /> )
       

        const addButton = screen.getByRole('button', { name: 'Agregar'} )

        fireEvent.click( addButton )

        expect( onNewTodoMock ).toHaveBeenCalledTimes(0)
    })
 

 })