import { act, logDOM, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "./useAuthStore";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../store";
import { Provider } from "react-redux";
import { testUser } from "../../tests/fixtures/userFixture";
import { authenticatedState, initialState, notAuthenticatedState } from "../../tests/fixtures/authStatesFixture";
import { calendarApi } from "../api";


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}


beforeEach(() => {
    localStorage.clear()
})

describe('Tests in useAuthStore', () => {

    test('should return values by default', () => { 
        
        const mockStore = getMockStore({
            ...initialState
        })

        const { result } = renderHook( () => useAuthStore(), 
        { wrapper: ( { children } ) => <Provider store={mockStore} > { children } </Provider> })

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
        })
        
     })

    test('startLogin should change the status to authenticated and return the user correctly', async() => { 
        
        const mockStore = getMockStore( { ...notAuthenticatedState } )
        const { result } = renderHook( () => useAuthStore(), 
        { wrapper: ( { children } ) => <Provider store={mockStore} > { children } </Provider> })

        const { startLogin } = result.current

        await act( () => startLogin( { email: testUser.email , password: testUser.password }) )

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: testUser.name, uid: testUser.uid },
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
        })

        expect( localStorage.getItem('token') ).toEqual( expect.any(String) )
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) )
    })

    test('startLogin should fail with wrong credentials', async() => { 

        const mockStore = getMockStore( { ...notAuthenticatedState } )
        const { result } = renderHook( () => useAuthStore(), 
        { wrapper: ( { children } ) => <Provider store={mockStore} > { children } </Provider> })

        const { startLogin } = result.current

        await act( () => startLogin( { email: 'something@gmail.com' , password: '111' }) )

        expect( result.current ).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
        })
        expect(localStorage.getItem('token')).toBeNull()
        await waitFor(  
            () => expect( result.current.errorMessage ).toBe(undefined)
        )

        
     })

    test('startRegister should change the status to authenticated and return the user correctly', async() => { 
        
        const mockStore = getMockStore( { ...notAuthenticatedState } )
        const { result } = renderHook( () => useAuthStore(), 
        { wrapper: ( { children } ) => <Provider store={mockStore} > { children } </Provider> })

        const { startRegister } = result.current

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: 'UID-TEST',
                name: 'Test User',
                token: 'TOKEN-TEST'
            }

        })

        await act( () => startRegister( { email: 'something@gmail.com' , password: '1234567', name: 'Test User' }) )

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                uid: 'UID-TEST',
                name: 'Test User',
            },
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
        })

        spy.mockRestore()

     })

    test('startRegister should fail when the register cant authenticated ', async() => { 
        
        const mockStore = getMockStore( { ...notAuthenticatedState } )
        const { result } = renderHook( () => useAuthStore(), 
        { wrapper: ( { children } ) => <Provider store={mockStore} > { children } </Provider> })

        const { startRegister } = result.current

        await act( () => startRegister( { ...testUser }) )

        expect( result.current ).toEqual({
            errorMessage: 'El usuario ya existe',
            status: 'not-authenticated',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
          })
    })


    test('checkAuthToken should fail if it doesnt exist token', async() => { 
        
        const mockStore = getMockStore( { ...initialState } )
        const { result } = renderHook( () => useAuthStore(), 
        { wrapper: ( { children } ) => <Provider store={mockStore} > { children } </Provider> })

        const { checkAuthToken } = result.current

        await act( () => checkAuthToken() )

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
          })
        //expect( dispatch ).toHaveBeenCalledWith( onLogout() )  

     })

     test('checkAuthToken should renew token and login when it exists', async() => {

        const { data } = await calendarApi.post('/auth', testUser)
        localStorage.setItem('token', data.token)

        const mockStore = getMockStore( { ...initialState } )
        const { result } = renderHook( () => useAuthStore(), 
        { wrapper: ( { children } ) => <Provider store={mockStore} > { children } </Provider> })

        const { checkAuthToken } = result.current

        await act( () => checkAuthToken() )

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Virginia M', uid: '660a7e9e0f6fb025c139926a' },
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
          })
      })

    test('startLogout should clear localStorage', () => { 

        const dispatch = jest.fn()

        jest.mock('../store', () => ({
            onLogoutCalendar: jest.fn(),
            onLogout: jest.fn(),
        }))
        
        localStorage.setItem('token', 'TOKEN-TEST')

        const mockStore = getMockStore( { ...authenticatedState } )
        const { result } = renderHook( () => useAuthStore(), 
        { wrapper: ( { children } ) => <Provider store={mockStore} > { children } </Provider> })

        const { startLogout } = result.current

        act( () => startLogout() )

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
          })

  
        expect( localStorage.getItem('token') ).toBeNull()
        // expect( dispatch ).toHaveBeenCalledWith( onLogoutCalendar() )
        // expect( dispatch ).toHaveBeenCalledWith( onLogout() )

     })  


});