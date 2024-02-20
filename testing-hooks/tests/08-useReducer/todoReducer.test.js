import { todoReducer } from "../../src/08-useReducer/todoReducer"


describe('Tests in todoReducer', () => { 

    const initialState = [
        {
            id: 1,
            done: false,
            description: 'Initial Todo',
        }
    ]

    test('should return initial state', () => { 
        
        const newState = todoReducer( initialState, {} )
        expect (newState).toBe( initialState )

     })


    test('should add a todo', () => { 
        
        const action = {
            type: '[TODO] Add Todo',
            payload: {
                id: 2,
                done: false,
                description: 'Add new todo'
            }
        }

        const newState = todoReducer( initialState, action )
        expect( newState.length ).toBe(2)
        expect( newState ).toContain( action.payload )

     }) 


     test('should remove a todo', () => { 
        
        const action = {
            type: '[TODO] Remove Todo',
            payload: 1
        }

        const newState = todoReducer( initialState, action )
        expect( newState.length ).toBe(0)

      }) 

     test('should not remove todo if id not exist', () => { 
        
        const action = {
            type: '[TODO] Remove Todo',
            payload: 3
        }

        const newState = todoReducer( initialState, action )
        expect( newState ).toEqual( initialState )

      }) 


      test('should toggle todo', () => { 
        
        const action = {
            type: '[TODO] Toggle Todo',
            payload: 1
        }

        const [ newState ] = todoReducer( initialState, action )
        expect( newState.done ).toBeTruthy()

       })

       test('should not toggle todo if id not exist', () => { 
        
        const action = {
            type: '[TODO] Toggle Todo',
            payload: 3
        }

        const newState = todoReducer( initialState, action )
        expect( newState ).toEqual( initialState )

       })

 })