import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { ProfileWrapper } from "./styles";

export function Profile() {

    const user = useAuth()



    return(
        <>
            <Header />
            <ProfileWrapper>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>{user.userId}</div>
                
                
                
            </ProfileWrapper>


        </>
    )
}