import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { ProtectedLayout } from './components/ProtectedLayout'



export function Router() {
    return(
        <Routes>
            
    
            <Route path='/' element={<Login/>}/>
            
            <Route path='/home' element={
                <ProtectedLayout>
                    <Home />
                </ProtectedLayout>
            }/>
             
        </Routes>

        
    )
}


