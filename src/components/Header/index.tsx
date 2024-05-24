import { useNavigate } from 'react-router-dom'
import quokkaLogo from '../../assets/urso branco 1.svg'
import { useAuth } from '../../hooks/useAuth'
import { ExitButton, HeaderContainer, Logo, NotificationButton } from './styles'
import { Bell } from 'phosphor-react'
import { Popover, Button, Inset } from '@radix-ui/themes'


export function Header() {
    const user = useAuth()
    const history = useNavigate()

    function userLogout() {
        user.logout()
        history('/')
    }
    return(
        <HeaderContainer >
            <a href='/home'><Logo src={quokkaLogo} alt="" /></a>
            <strong>Quokka</strong>
            <div>
            <Popover.Root>
                <Popover.Trigger>
                        <NotificationButton><Bell size={24} /></NotificationButton>
                </Popover.Trigger>
                <Popover.Content size="4">
                       <div>notificações aqui</div> 
                </Popover.Content>
                </Popover.Root>
                
                <ExitButton onClick={userLogout}>Sair</ExitButton>  
            </div>
            
        </HeaderContainer>
    )
}