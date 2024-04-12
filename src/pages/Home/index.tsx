
import { Dialog } from "@radix-ui/themes"
import { Header } from "../../components/Header"
import { Post } from "../../components/Post"
import { SideProfile } from "../../components/SideProfile"
import { useAuth } from "../../hooks/useAuth"
import { CreateNewPostDiv, HomeContainer, OpenCreateNewPostButton, Wrapper } from "./styles"
import { NewPostModal } from "../../components/NewPostModal"
import { Plus } from "phosphor-react"
import { useEffect, useState } from "react"


export function Home() {
    
    const user = useAuth()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [followers, setFollowers] = useState<number>(0)
    const [following, setFollowing] = useState<number>(0)
    


    async function callUserInformations() {
        if(user.access_token){
           const userInfo = await user.getUserInfo(user.access_token)
           setUsername(userInfo.username)
           setEmail(userInfo.email)
           setFollowers(userInfo.followers)
           setFollowing(userInfo.following)
        }
    }

    useEffect(() => {
        callUserInformations()
    }, [])
        
    
   

    return(
        <Wrapper>
            <Header />
            <HomeContainer>
                <SideProfile
                    username={username}
                    email={email}
                    followers={followers}
                    following={following}
                />
                <Post>
                </Post>
            </HomeContainer>
            <CreateNewPostDiv>  
                <Dialog.Root>
                    <Dialog.Trigger>
                        <OpenCreateNewPostButton><Plus size={20}/></OpenCreateNewPostButton>
                    </Dialog.Trigger>
                    <NewPostModal />
                </Dialog.Root>
            </CreateNewPostDiv>
        </Wrapper>
        
        
            
        
        
    )
}