import quokkaLogo from '../../assets/urso branco 1.svg'
import { HeaderContainer, Logo } from './styles'


export function Header() {
    return(
        <HeaderContainer>
            <Logo src={quokkaLogo} alt="" />
            <strong>Quokka</strong>
        </HeaderContainer>
    )
}