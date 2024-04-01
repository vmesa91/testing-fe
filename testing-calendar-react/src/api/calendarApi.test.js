import calendarApi from "./calendarApi";


describe('Tests in Calendar API', () => {
    
    test('should have the default config', () => { 

        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL )

     })

    
    test('should have x-token inside headers', async() => { 

        localStorage.setItem('token', 'ABC-123-XS')
        const res = await calendarApi.get('/auth')
            .then( (res) => res )
            .catch( (res) => res )

        expect( res.response.config.headers['x-token'] ).toBe( 'ABC-123-XS' )

     }) 
})