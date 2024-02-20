import { screen, render, act, fireEvent } from "@testing-library/react"
import { TodoItem } from "../../src/08-useReducer/TodoItem"

describe('Tests in <TodoItem />', () => { 

    const todo = {
        id: 1,
        description: 'Todo 1',
        done: false
    }

    const onDeleteTodoMock = jest.fn()
    const onToggleTodoMock = jest.fn()

    beforeEach( () => 
    {
        jest.clearAllMocks()
        todo.done = false;
    })
    
    test('should render TodoItem', () => { 
        
        render( <TodoItem todo={todo} 
                onDeleteTodo={onDeleteTodoMock} 
                onToggleTodo={onToggleTodoMock} 
        />)

        expect( screen.getByText(todo.description) ).toBeTruthy()
        expect( screen.getByText('Borrar') ).toBeTruthy()
        expect( screen.getAllByRole('listitem') ).toHaveLength(1)
        expect( screen.getByRole('button') ).toBeTruthy()

        const spanElement = screen.getByLabelText('span')
        expect( spanElement.className ).toContain('align-self-center')
        expect( spanElement.className ).not.toContain('text-decoration-line-through')

    })

     test('should render a completed Todo', () => {

        todo.done = true;

        render( <TodoItem todo={todo} 
            onDeleteTodo={onDeleteTodoMock} 
            onToggleTodo={onToggleTodoMock} 
        />)

        expect( screen.getByText(todo.description) ).toBeTruthy()
        expect( screen.getByText('Borrar') ).toBeTruthy()
        expect( screen.getAllByRole('listitem') ).toHaveLength(1)
        expect( screen.getByRole('button') ).toBeTruthy()

        const spanElement = screen.getByLabelText('span')
        expect( spanElement.className ).toContain('text-decoration-line-through')

    })


    test('should call ToggleTodo when I click on it', () => { 

        render( <TodoItem todo={todo} 
            onDeleteTodo={onDeleteTodoMock} 
            onToggleTodo={onToggleTodoMock} 
        />)

        const spanElement = screen.getByLabelText('span')
        fireEvent.click(spanElement)

        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id )
        
     })
    test('should call DeleteTodo when I click on it', () => { 

        render( <TodoItem todo={todo} 
            onDeleteTodo={onDeleteTodoMock} 
            onToggleTodo={onToggleTodoMock} 
        />)

        const button = screen.getByRole('button',  { name: 'Borrar' })
        fireEvent.click(button)

        expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id )
        
     })


 })