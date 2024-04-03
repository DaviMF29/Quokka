import { useAuth } from "../../hooks/useAuth";


export function ProtectedLayout({ children } : {children: JSX.Element}){
    const auth = useAuth()

    if(!auth.email){
        return <h1>You are not logged!</h1>
    }

    return children
}