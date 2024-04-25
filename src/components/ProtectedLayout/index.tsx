import { useAuth } from "../../hooks/useAuth";
import { LoginFailScreen } from "../LoginFailScreen";


export function ProtectedLayout({ children } : {children: JSX.Element}){
    const auth = useAuth()

    if(!auth.access_token){
        return <LoginFailScreen/>
    }

    return children
}