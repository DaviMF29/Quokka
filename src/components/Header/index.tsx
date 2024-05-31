import { useNavigate } from 'react-router-dom'
import quokkaLogo from '../../assets/urso branco 1.svg'
import { useAuth } from '../../hooks/useAuth'
import { DeleteAllButton, DeleteNotificationButton, ExitButton, HeaderContainer, Logo, NotificationButton, NotificationDiv, PopoverDiv, StyledListIcon } from './styles'
import { Bell, List, Trash } from 'phosphor-react'
import { Popover } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

interface NotificationProps {
    _id: string
    senderId: string
    recipientId: string
    text: string
    createdAt: Date
    type: string
    seen: boolean
}


export function Header() {

    const user = useAuth()
    const history = useNavigate()

    const [notifications, setNotifications] = useState<NotificationProps[]>([])

    
    async function getNotifications() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.access_token}`
            }
        }
        const response = await api.get(`/api/notifications`, config)
        setNotifications(response.data)
    }

    async function handleDeleteNotification( notificationId:string) {
        await api.delete(`api/notification/${notificationId}`)
        getNotifications()
    }

    async function handleDeleteAllNotifications(userId:string) {
        await api.delete(`api/notifications/${userId}`)
        getNotifications()
    }



    useEffect(() => {

        getNotifications()

    },[])
    
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
                <PopoverDiv size="4">
                        
                        {notifications.length > 0 ?( notifications.map(notification => {
                                 return (
                                      <NotificationDiv key={notification._id}>
                                        
                                        <p>{notification.text}</p>
                                        <DeleteNotificationButton onClick={() => handleDeleteNotification(notification._id)}><StyledListIcon /></DeleteNotificationButton>
                                      </NotificationDiv>
                                 )
                            })
                        ): (<p>Sem notificações no momento</p>)}
                        {notifications.length > 0 && (<DeleteAllButton onClick={() => handleDeleteAllNotifications(user.userId ?? '')}>apagar tudo</DeleteAllButton>)}
                </PopoverDiv>
                </Popover.Root>
                
                <ExitButton onClick={userLogout}>Sair</ExitButton>  
            </div>
            
        </HeaderContainer>
    )
}