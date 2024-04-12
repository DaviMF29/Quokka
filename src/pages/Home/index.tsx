
import { Dialog } from "@radix-ui/themes"
import { Header } from "../../components/Header"
import { Post } from "../../components/Post"
import { SideProfile } from "../../components/SideProfile"
import { useAuth } from "../../hooks/useAuth"
import { CreateNewPostDiv, HomeContainer, OpenCreateNewPostButton, Wrapper } from "./styles"
import { NewPostModal } from "../../components/NewPostModal"
import { Plus } from "phosphor-react"


export function Home() {
    

    return(
        <Wrapper>
            <Header />
            <HomeContainer>
                <SideProfile/>
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