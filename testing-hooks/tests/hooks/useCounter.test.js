
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../../src/hooks/useCounter';

describe('Tests in useCounter', () => { 

    it('Should return default values', () => {

        const { result } = renderHook( () => useCounter() )
        const { counter, increment, decrement, reset } = result.current

        expect( counter ).toBe(10);
        expect( decrement ).toEqual( expect.any( Function ) )
        expect( increment ).toEqual( expect.any( Function ) )
        expect( reset ).toEqual( expect.any( Function ) )

    })

    it('Should return 100 whether we set 100 as initialValue', () => {

        const { result } = renderHook( () => useCounter(100) )
        const { counter } = result.current

        expect( counter ).toBe(100);
    })

    it('Counter should increment when click on increment', () => {

        const { result } = renderHook( () => useCounter() )
        const { counter, increment } = result.current

        act(() => {
            increment()  
        })

        expect( result.current.counter ).toBe(11)

    })
    it('Counter should increment the value when click on increment', () => {
        
        const { result } = renderHook( () => useCounter() )
        const { counter, increment } = result.current
        
        act(() => {
            increment()  
        })
        
        expect( result.current.counter ).toBe(11)
        
    })
    
})

it('Counter should decrement the value when click on decrement', () => {

    const { result } = renderHook( () => useCounter() )
    const { counter, decrement } = result.current

    act(() => {
        decrement()  
    })

    expect( result.current.counter ).toBe(9)

})
it('Counter should reset the value when click on reset', () => {

    const { result } = renderHook( () => useCounter() )
    const { counter, increment, reset } = result.current

    act(() => {
        increment()
        reset()  
    })

    expect( result.current.counter ).toBe(10)

})