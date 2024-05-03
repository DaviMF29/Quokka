import { Aside, Avatar, Cover, Profile, ProfileButton } from "./styles";
import avatarImg from '../../assets/avatar_img.png'
import { useNavigate } from "react-router-dom";
import { IUser } from "../../Context/AuthProvider/types";



export function SideProfile({username, email, followers, following}:IUser) {
    const navigate = useNavigate()

    function handleGoToProfile(){
        navigate('/profile')
    }

    function listToNumber(followers: Array<any> | undefined){
        if(followers === undefined){
            return 0
        }
        return followers.length
    }

    return(
        <Aside>
            <Cover src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=30" alt="" />
            <Profile>
                <Avatar
                src={avatarImg}></Avatar>
                <strong>{username}</strong>
                <span>{email}</span>
                <div>
                    <span>Seguidores: {listToNumber(followers)}</span>
                    <span>Seguindo: {listToNumber(following)}</span>
                </div>
            </Profile>
            <footer>
                <ProfileButton onClick={handleGoToProfile}>
                    Editar seu perfil
                </ProfileButton>
            </footer>
        </Aside>
    )
}