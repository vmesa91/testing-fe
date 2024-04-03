import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "./useUiStore";
import { Provider } from "react-redux";
import { uiSlice } from "../store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Tests in useUiStore', () => {
    
    test('should return default values', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })
        
        const { result } = renderHook( () => useUiStore(),
        { wrapper: ({children}) => <Provider store={mockStore} > { children } </Provider> } )

        expect( result.current ).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        })

     })

    test('openDateModal should return true in isDateModalOpen', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook( () => useUiStore(),
        { wrapper: ({children}) => <Provider store={mockStore} > { children } </Provider> } )

        const { openDateModal } = result.current
        
        act( () => {  openDateModal() } )

        expect( result.current.isDateModalOpen ).toBeTruthy()

     }) 
    test('closeDateModal should return false in isDateModalOpen', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook( () => useUiStore(),
        { wrapper: ({children}) => <Provider store={mockStore} > { children } </Provider> } )

        const { closeDateModal } = result.current
        
        act( () => {  closeDateModal() } )

        expect( result.current.isDateModalOpen ).toBeFalsy()

     }) 
    test('toggleDateModal should return true or false depending of isDateModalOpen value', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook( () => useUiStore(),
        { wrapper: ({children}) => <Provider store={mockStore} > { children } </Provider> } )
        
        act( () => {  result.current.toggleDateModal() } )

        expect( result.current.isDateModalOpen ).toBeFalsy()

        act( () => {  result.current.toggleDateModal() } )

        expect( result.current.isDateModalOpen ).toBeTruthy()

     }) 
});