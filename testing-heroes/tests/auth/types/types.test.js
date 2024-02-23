import { types } from "../../../src/auth/types/types"

describe('Tests in Types', () => { 
    
    it('should return types', () => { 
        
        expect( types ).toEqual({
            login:  '[Auth] Login',
            logout: '[Auth] Logout',
        })

     })

 })