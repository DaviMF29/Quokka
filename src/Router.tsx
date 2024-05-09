import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { ProtectedLayout } from './components/ProtectedLayout'
import { Profile } from './pages/Profile'
import { useAuth } from './hooks/useAuth'
import { UserPage } from './pages/UserPage'



export function Router() {

    const user = useAuth()
    return(
        <Routes>
            
    
            <Route path='/' element={<Login/>}/>
            
            <Route path='/home' element={
                <ProtectedLayout>
                    <Home />
                </ProtectedLayout>
            }/>
            <Route path='/profile' element={
                <ProtectedLayout>
                    <Profile />
                </ProtectedLayout>
            }/>
            <Route path='/:userName' element={
                <ProtectedLayout>
                    <UserPage userId={user.userId ? user.userId.toString() : ''}/>
                </ProtectedLayout>
            }/>
             
        </Routes>

        
    )
}


