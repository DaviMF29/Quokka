
import { useAuth } from "../../hooks/useAuth"


export function Home() {

    const user = useAuth()

    return(
        <>
            <h1>Seja bem vindo: {user.email}</h1>
            


            <button onClick={user.logout}>Logout</button>
        </>
        
    )
}