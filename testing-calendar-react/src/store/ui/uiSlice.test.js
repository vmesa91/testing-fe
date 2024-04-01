import { onCloseDateModal, onOpenDateModal, uiSlice } from "./uiSlice";


describe('Tests in uiSlice', () => {
    
    test('should return the state by default', () => { 

        console.log(uiSlice.getInitialState())

        expect(uiSlice.getInitialState()).toEqual( { isDateModalOpen: false } )
        
     })

     test('should change isDateModalOpen correctly', () => { 
        
        let state = uiSlice.getInitialState()
        state = uiSlice.reducer( state, onOpenDateModal() )
        expect( state.isDateModalOpen ).toBeTruthy()

        state = uiSlice.reducer( state, onCloseDateModal() )
        expect( state.isDateModalOpen ).toBeFalsy()

      })
});