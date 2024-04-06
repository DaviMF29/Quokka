import { useNavigate } from "react-router-dom";
import { BackButton, Container, MessageBox } from "./styles";


export function LoginFailScreen() {

    const history = useNavigate()

    function goBackLogin() {
        history('/')
    }
    return(
        <>
            <Container>
                <MessageBox>
                    Usuário não logado
                </MessageBox>
                <BackButton onClick={goBackLogin}>Voltar para o login</BackButton>
                
            </Container>
        </>
    )
        
}