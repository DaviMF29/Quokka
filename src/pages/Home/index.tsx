
import { useAuth } from "../../hooks/useAuth"


export function Home() {

    const user = useAuth()

    return(
        <>
            <h1>Email: {user.email}</h1>
            <h2>Usuario: {user.username}</h2>


            <button onClick={user.logout}>Logout</button>
        </>
        
    )
}