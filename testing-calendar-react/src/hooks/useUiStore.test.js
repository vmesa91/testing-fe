import { renderHook } from "@testing-library/react";
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
       
        console.log(result)

        expect( result.current ).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        })

     })
});