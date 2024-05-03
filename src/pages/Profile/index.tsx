import { Box, Button, Tabs } from "@radix-ui/themes";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { Banner, ProfileInfo, ProfilePicture, ProfileText, ProfileWrapper, StyledBox, StyledTabTrigger } from "./styles";
import '@radix-ui/themes/styles.css';
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createEditFormSchema = z.object({
    username: z.string(),
})

type CreateEditFormData = z.infer<typeof createEditFormSchema>



export function Profile() {

    const user = useAuth()

    const {
        register, 
        handleSubmit, 
        formState: {errors},
        watch,
        reset,
        } =  useForm<CreateEditFormData>({
        resolver: zodResolver(createEditFormSchema)
    })

    useEffect(() => {
        const fetchData = async () => {
            if(user.access_token){
               user.getUserInfo(user.access_token) 
            }
        }

        fetchData()
    }, [user.username])

    function handleEditProfile(data: CreateEditFormData){
        if(user.access_token && user.userId){
            user.updateUserInfo(user.access_token,user.userId,data.username)
            user.getUserInfo(user.access_token)
        }

    }

    
    return(
        <>
            <Header />
            <ProfileWrapper>
                <Banner src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg"></Banner>
                <ProfileInfo>
                   <ProfilePicture src="https://avatars.githubusercontent.com/eliasmedeiros898"></ProfilePicture>
                   <ProfileText>
                    <h1>{user?.username ? user.username : 'user not found'}</h1> 
                    <h3>{user?.email ? user.email : 'email not found'}</h3>

                   </ProfileText>
                </ProfileInfo>

                
                    <Tabs.Root defaultValue="account">
                        <Tabs.List color="cyan">
                            <StyledTabTrigger value="account">Account</StyledTabTrigger>
                            <StyledTabTrigger value="favoritePosts">Post Favoritos</StyledTabTrigger>
                            <StyledTabTrigger value="settings">Settings</StyledTabTrigger>
                        </Tabs.List>

                        <StyledBox pt="3">
                            <Tabs.Content value="account">
                                <form style={{display:'flex',flexDirection:'column'}} onSubmit={handleSubmit(handleEditProfile)}>
                                    <div>
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" id="username" defaultValue={user.username} {...register('username')}/>
                                    </div>
                                    <div>
                                        <label htmlFor="image">Imagem de perfil:</label>
                                        <input type="file" id="image" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email: </label>
                                        <input type="text" id="email" value={user.email} disabled/>
                                    </div>
                                    

                                    <Button type="submit">Save</Button>
                                </form>
                            </Tabs.Content>

                            <Tabs.Content value="favoritePosts">
                                <p>Posts favoritos</p>
                            </Tabs.Content>

                            <Tabs.Content value="settings">
                                <p>settings content</p>
                            </Tabs.Content>
                        </StyledBox>
                    </Tabs.Root>
                

                
                      
            </ProfileWrapper>


        </>
    )
}