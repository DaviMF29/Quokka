import { Box, Tabs } from "@radix-ui/themes";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { Banner, ProfileInfo, ProfilePicture, ProfileText, ProfileWrapper, StyledBox, StyledTabTrigger } from "./styles";
import '@radix-ui/themes/styles.css';
import { useEffect } from "react";

export function Profile() {

    const user = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            if(user.access_token){
               user.getUserInfo(user.access_token) 
            }
        }

        fetchData()
    }, [])


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
                            <StyledTabTrigger value="documents">Documents</StyledTabTrigger>
                            <StyledTabTrigger value="settings">Settings</StyledTabTrigger>
                        </Tabs.List>

                        <StyledBox pt="3">
                            <Tabs.Content value="account">
                                <form style={{display:'flex',flexDirection:'column'}}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" value={user.username} disabled/>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" value={user.email} disabled/>
                                    <label htmlFor="followers">Followers</label>
                                    <input type="text" id="followers" value={user.followers} disabled/>
                                    <label htmlFor="following">Following</label>
                                    <input type="text" id="following" value={user.following} disabled/>
                                </form>
                            </Tabs.Content>

                            <Tabs.Content value="documents">
                                <p>documents content</p>
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