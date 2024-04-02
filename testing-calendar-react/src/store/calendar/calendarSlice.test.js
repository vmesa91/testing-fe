import { calendarWithActiveEventState, calendarWithEventState, events, initialState } from "../../../tests/fixtures/calendarStatesFixture"
import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "./calendarSlice"

describe('Tests in Calendar Slice', () => { 
    
    test('should return initial state', () => { 
        
        expect(calendarSlice.getInitialState()).toEqual( initialState )  

    })


    test('should add a new event correctly', () => { 
        
        const state = calendarSlice.reducer( initialState , onAddNewEvent(events[0]) ) 
        expect( state.events ).toContain( events[0] )

     })

    test('should update an event correctly', () => { 
    
        const newEvent = {
            id: '1',
            start: new Date('2024-04-01 13:00:00'),
            end: new Date('2024-04-03 15:00:00'),
            title: 'Jose Wedding',
            notes: 'We have to buy a present'
        }

        const state = calendarSlice.reducer( calendarWithEventState, onUpdateEvent( newEvent ) )
        expect( state.events ).toContain( newEvent )

    })

    test('should delete an event correctly', () => { 
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() )
        expect( state.events ).not.toContain( events[0] )
        expect( state.activeEvent ).toBeNull()

     })

    test('should set active an event correctly', () => { 
        
        const state = calendarSlice.reducer( calendarWithEventState, onSetActiveEvent( events[0] ) )
        expect( state.activeEvent ).toEqual( events[0] )

     }) 

    test('should load all events correctly', () => { 
        
        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) )
        expect( state.events ).toEqual( events )

        const newEvent = [{
            id: '3',
            start: new Date('2024-04-01 13:00:00'),
            end: new Date('2024-04-03 15:00:00'),
            title: 'Jose Wedding',
            notes: 'We have to buy a present'
        }]

        const newState = calendarSlice.reducer( state, onLoadEvents( newEvent ) )
        expect( newState.events ).toEqual( [...events, ...newEvent] )
        expect( newState.events.length ).toBe(3)
     }) 

    test('should logout correctly', () => { 
        
        const state = calendarSlice.reducer( calendarWithEventState, onLogoutCalendar() )
        expect( state ).toEqual({
            isLoadingEvents: true,
            events: [],
            activeEvent: null

        })
     })




     
 })