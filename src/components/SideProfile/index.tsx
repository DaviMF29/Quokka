import { Aside, Avatar, Cover, Profile, ProfileButton } from "./styles";
import profilePic from '../../assets/profilepic.png'


export function SideProfile() {
    return(
        <Aside>
            <Cover src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=30" alt="" />
            <Profile>
                <Avatar
                src={profilePic}></Avatar>
                <strong>Elias Medeiros</strong>
                <span>Junior Developer</span>
            </Profile>
            <footer>
                <ProfileButton>
                    Editar seu perfil
                </ProfileButton>
            </footer>
        </Aside>
    )
}