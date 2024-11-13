# Quokka - Rede Social para Desenvolvedores

Quokka é uma rede social criada para desenvolvedores compartilharem seu dia-a-dia, trocarem experiências e se divertirem com memes e conteúdos relacionados à tecnologia.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Equipe](#equipe)
- [Aviso](#aviso)

## Sobre o Projeto

Quokka é uma plataforma social desenvolvida para aproximar desenvolvedores e entusiastas da tecnologia. Nossa missão é promover a interação entre pessoas que compartilham o interesse por programação, com um ambiente de troca de conhecimento, discussões técnicas e, claro, muito humor!

## Funcionalidades Principais

- 📝 **Compartilhamento de Experiências**: Poste sobre seu dia-a-dia como programador e compartilhe suas ideias.
- 💬 **Discussões Técnicas**: Participe de discussões sobre temas como linguagens de programação, frameworks, e melhores práticas.
- 😂 **Humor e Memes**: Divirta-se com memes, piadas e conteúdo leve relacionado à programação.
- 🤝 **Conexão com Outros Desenvolvedores**: Siga outros programadores e faça networking na comunidade.

## Tecnologias Utilizadas

- **Frontend**: [React](https://reactjs.org/)
- **Backend**: [Flask](https://flask.palletsprojects.com/)
- **Banco de Dados**: [MongoDB](https://www.mongodb.com/)
- **Hospedagem**: [Render](https://render.com/)

## Como Rodar o Projeto

Para rodar o projeto Quokka em sua máquina, siga as instruções abaixo para configurar tanto o backend quanto o frontend.

### Pré-Requisitos

- **Node.js** (para rodar o React)
- **Python** (para rodar o Flask)
- **MongoDB** (para o banco de dados)

### Passo a Passo

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/quokka.git
   cd quokka
   ```

2. **Configuração do Backend (Flask)**
   - Acesse a pasta do backend:
     ```bash
     cd backend
     ```
   - Crie um ambiente virtual (opcional, mas recomendado):
     ```bash
     python -m venv venv
     ```
   - Ative o ambiente virtual:
     - No Windows:
       ```bash
       venv\Scripts\activate
       ```
     - No macOS/Linux:
       ```bash
       source venv/bin/activate
       ```
   - Instale as dependências:
     ```bash
     pip install -r requirements.txt
     ```
   - Configure o MongoDB e adicione as credenciais necessárias no arquivo de configuração, se aplicável.
   - Inicie o servidor:
     ```bash
     python app.py
     ```

   O backend estará disponível em `http://localhost:5000`.

3. **Configuração do Frontend (React)**
   - Acesse a pasta do frontend:
     ```bash
     cd ../frontend
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Inicie o servidor do React:
     ```bash
     npm start
     ```

   O frontend estará disponível em `http://localhost:3000`.

4. **Acesse o Projeto**
   - Abra seu navegador e acesse `http://localhost:3000` para visualizar a aplicação.

Pronto! Agora você deve conseguir utilizar o Quokka em sua máquina local.

## Equipe

Este projeto foi desenvolvido por estudantes da **Universidade Estadual da Paraíba (UEPB)** como parte de um trabalho acadêmico.

## Aviso

> **Nota:** Este projeto foi desenvolvido para fins educacionais e não tem fins lucrativos.
