import { render, screen } from "@testing-library/react"
import { FabDelete } from "./FabDelete"
import { Provider } from "react-redux"
import { store } from "../../store"

describe('Tests in <FabDelete />', () => { 
    
    test('should render the component correctly', () => { 
       
       render( 
        <Provider store={store}>
            <FabDelete/> 
        </Provider>
       ) 
    })

    
    
})
    