
import { Header } from "../../components/Header"
import { Post } from "../../components/Post"
import { SideProfile } from "../../components/SideProfile"
import { useAuth } from "../../hooks/useAuth"
import { HomeContainer, Wrapper } from "./styles"


export function Home() {

    const user = useAuth()

    return(
        <Wrapper>
            <Header />
            <HomeContainer>
                <SideProfile/>
                <Post>
                </Post>
            </HomeContainer>
        </Wrapper>
        
        
            
        
        
    )
}