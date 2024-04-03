import { act, renderHook } from "@testing-library/react";
import { useAuthStore } from "./useAuthStore";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../store";
import { Provider } from "react-redux";
import { testUser } from "../../tests/fixtures/userFixture";
import { initialState, notAuthenticatedState } from "../../tests/fixtures/authStatesFixture";


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
        
        // Clean localStorage
        localStorage.clear()
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

    test('startRegister should change the status to authenticated and return the user correctly', () => { 
        


     })

});