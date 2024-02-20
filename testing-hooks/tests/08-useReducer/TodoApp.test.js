import { render, screen } from "@testing-library/react"
import { TodoApp } from "../../src/08-useReducer/TodoApp"
import { useTodos } from "../../src/hooks/useTodos"


jest.mock('../../src/hooks/useTodos')

describe('Tests in < TodoApp />', () => { 

    useTodos.mockReturnValue({
        todos: [
            { id: 1, description: "New Item 1", done: false },
            { id: 2, description: "New Item 2", done: true }
        ],
          todosCount: 2,
          pendingTodosCount: 1,
          handleDeleteTodo: jest.fn(),
          handleToggleTodo: jest.fn(),
          handleNewTodo: jest.fn()
        })
    

    test('should render the component successfully', () => { 
        
        render( <TodoApp /> )
        screen.debug()

        expect( screen.getByText('New Item 1') ).toBeTruthy()
        expect( screen.getByText('New Item 2') ).toBeTruthy()
        expect( screen.getByRole('textbox') ).toBeTruthy()
     })


 })