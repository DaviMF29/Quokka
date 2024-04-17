import { useNavigate } from 'react-router-dom'
import quokkaLogo from '../../assets/urso branco 1.svg'
import { useAuth } from '../../hooks/useAuth'
import { HeaderContainer, Logo } from './styles'


export function Header() {
    const user = useAuth()
    const history = useNavigate()

    function userLogout() {
        user.logout()
        history('/')
    }
    return(
        <HeaderContainer>
            <a href='/home'><Logo src={quokkaLogo} alt="" /></a>
            <strong>Quokka</strong>
            <button onClick={userLogout}>Sair</button>
        </HeaderContainer>
    )
}