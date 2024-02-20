
import { renderHook, act } from '@testing-library/react';
import { useForm } from '../../src/hooks/useForm';

describe('Tests in useForm', () => { 

    const initialForm = {
        user: 'Virginia',
        password: '1234567',
        country: 'ES'
    }
    
    it('Should return default values', () => {

        const { result } = renderHook( () => useForm(initialForm) )
        const { formState, onInputChange, onResetForm } = result.current

        expect( formState ).toStrictEqual(initialForm)
        expect( onInputChange ).toEqual( expect.any( Function ) )
        expect( onResetForm ).toEqual( expect.any( Function ) )

        expect( result.current ).toEqual({
            user: initialForm.user,
            password: initialForm.password,
            country: initialForm.country,
            formState: initialForm,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function )

        })

    })

    it('Should change the name in form', () => {

        const newValue = 'Maria'
        const target = { 
            name: 'user',
            value: newValue
         }

        const { result } = renderHook( () => useForm(initialForm) )
        const { onInputChange } = result.current

        act( 
            () => onInputChange( { target } )
        )

        expect( result.current.user ).toBe(newValue)
        expect( result.current.formState.user ).toBe(newValue)

    })

    it('Should reset the value to initial value', () => {

        const newValue = 'Maria'
        const target = { 
            name: 'user',
            value: newValue
         }

        const { result } = renderHook( () => useForm(initialForm) )
        const { onInputChange, onResetForm } = result.current
        
        act( 
            () => {
                onInputChange( { target } )
                onResetForm()
            }
        )

        expect( result.current.user ).toBe(initialForm.user)
        expect( result.current.formState.user ).toBe(initialForm.user)

    })

 })