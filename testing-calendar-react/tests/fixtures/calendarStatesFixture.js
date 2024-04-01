
export const events =  [
    {
        id: '1',
        start: new Date('2024-04-01 13:00:00'),
        end: new Date('2024-04-03 15:00:00'),
        title: 'Boss Birthday',
        notes: 'We have to buy a cake'
    },
    {
        id: '2',
        start: new Date('2024-04-01 13:00:00'),
        end: new Date('2024-04-03 15:00:00'),
        title: 'Josh Birthday',
        notes: 'We need to book a pub'
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventState = {
    isLoadingEvents: true,
    events: [  ...events ],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: true,
    events: [  ...events ],
    activeEvent:  { ...events[0] }
}