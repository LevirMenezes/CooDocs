# 🚀 CooDocs

Bem-vindo ao **CooDocs** – a plataforma de colaboração em tempo real mais **descolada** que você já viu!
Aqui, várias pessoas podem **editar documentos** simultaneamente sem (muitos) conflitos.

## 📝 Sumário
- [🚀 CooDocs](#-coodocs)
  - [📝 Sumário](#-sumário)
  - [💡 O que é o CooDocs?](#-o-que-é-o-coodocs)
  - [💡 Por que usar?](#-por-que-usar)
  - [🔧 Recursos Principais](#-recursos-principais)
  - [🚀 Como Rodar Localmente](#-como-rodar-localmente)
    - [Pré-Requisitos](#pré-requisitos)
    - [Passo a Passo](#passo-a-passo)
  - [🛠️ Variáveis de Ambiente](#️-variáveis-de-ambiente)
  - [🧱 Arquitetura Básica](#-arquitetura-básica)
  - [🧪 Como colaborar?](#-como-colaborar)
  - [📄 Licença](#-licença)
  - [👨‍💻 Autor](#-autor)
  - [🙌 Agradecimentos](#-agradecimentos)

---

## 💡 O que é o CooDocs?

Imagine você e seus amigos, cada um em um canto do mundo, escrevendo **simultaneamente** em um documento. Sem precisar ficar enviando e-mails ou usando pombo-correio. O **CooDocs** faz isso pra você:

- Edição em tempo real.
- Tela de login e cadastro, porque nem todo mundo pode entrar na festa sem convite.
- Uma interface ~~mais ou menos~~ super estilosa e repleta de alegria!

---

## 💡 Por que usar?

- **Colaboração**: Não precisa usar aquela velha ferramenta que trava no meio do parágrafo.
- **Simplicidade**: Digita aqui, aparece ali. Coisa linda!
- **Aprendizado**: Se você curte Node.js, Socket.io e uma pitada de caos controlado, esse projeto é pra você.

---

## 🔧 Recursos Principais

- **Edição Colaborativa**: várias pessoas digitando simultaneamente, e tudo atualiza instantaneamente.
- **Autenticação**: login e logout (porque segurança é bom, né?).
- **Recuperação de Senha**: se você é do tipo que esquece a senha toda hora, temos um recurso de e-mail pra isso!
- **Controle de Usuários Online**: fique de olho em quantas almas estão conectadas naquele exato momento.
- **Interface Simples**: estilo “dark mode” pra dar aquela vibe misteriosa.

---

## 🚀 Como Rodar Localmente

Quer testar no seu computador? Siga estes passos:

---

### Pré-Requisitos

- **Node.js** (versão 14 ou superior).
- **NPM** ou **Yarn** (pra instalar dependências).
- Um pouco de **coragem** (porque a vida de dev é cheia de aventuras).
- **MongoDB** (local ou remoto) se quiser salvar seus documentos (ou algum outro DB adaptado).

---

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seuUsuario/coodocs.git
   ```

2. **Acesse a pasta do projeto**
   Entre na pasta do projeto que você acabou de clonar:
   ```bash
   cd CooDocs
   ```

3. **Instale as dependências**
   Instale todas as dependências necessárias usando o npm ou yarn:
   ```bash
   npm install
   ```

   ou
   ```bash
   yarn install
   ```

4. **Configure o ambiente**
  Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias (ex.: `DB_URI`, `SESSION_SECRET`, etc.). Use o arquivo `.env.example` como referência

5. **Rode o projeto**
   Agora é só rodar o projeto e ver a mágica acontecer! ✨
   ```bash
   npm run dev
   ```

   ou
   ```bash
   yarn dev
   ```

6. **Abra o novagador em:**
   ```arduino
   http://localhost:3000
   ```
  E seja feliz colaborando com documentos em tempo real! 🎉

## 🛠️ Variáveis de Ambiente

No `.env` (ou use outra forma de gerenciar segredos) você precisa de algumas variáveis, por exemplo:

  ```env
  # Conexão com Mongo
  DB_URI="mongodb+srv://seuUsuario:senha@cluster.mongodb.net/seuDB"

  # Para DB Local
  #DB_URI="mongodb://localhost:27017/"

  # Nome do banco
  DB_NAME="coodocs"

  # Segredo da sessão
  SESSION_SECRET=SUA_CHAVE_SECRETA

  # Porta
  PORT=3000

  # Se usar GMAIL, deve configurar uma "Senha de App" e usar no lugar de senha.
  EMAIL_USER="seu.email@gmail.com"
  EMAIL_PASS="senha"
  ```

---

## 🧱 Arquitetura Básica

```cpp
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── pages/
│   ├── socket/
│   └── ...
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket/
│   ├── utils/
│   ├── server.js
│   └── ...
├── package.json
├── README.md
└── ...
```

- **public/**: Pasta de arquivos estáticos, dividida em:
  - **css/**: Arquivos de estilo (ex.: `style.css`).
  - **images/**: Images, icons (ex.: `icon.icon, icon.png`).
  - **js/**: Scripts do lado do cliente (ex.: `index.js`).
  - **pages/**: Páginas HTML (ex.: `index.html`, `login.html`, etc.).
  - **socket/**: Scripts específicos de Socket.io para o front-end.
- **src/**: Código-fonte Node.js.
  - **config/**: Arquivos de configuração (ex.: manipulação de dados vindos das rotas).
  - **controllers/**: Lógica de controle (ex.: manipulação de dados vindos das rotas).
  - **middlewares/**: Arquivos de padronizações de erro/autenticações (checkAuth.js).
  - **models/**: Modelos do banco de dados (MongoDB, etc.).
  - **routes/**: Definição de rotas Express (HTTP).
  - **services/**: arquivos para configurações com serviços de terceiro (ex.: mailtrap.js, emailService.js).
  - **socket/**: Lógica de sockets no back-end (ex.: socket-back.js).
  - **utils/**: Eventuais utilitários que possam surgir e que serão utilizados por todo o sistema.
  - **server.js**: Ponto de entrada principal (inicializa o servidor Express/Socket.io).
- **package.json**: Metadados do projeto (scripts, dependências).
- **README.md**: Documentação principal.

---

## 🧪 Como colaborar?

1. **Faça um fork** do projeto.
2. **Crie uma branch** para sua feature/bugfix:
   ```bash
   git checkout -b feature-minha-ideia-genial
   ```
3. **Commit e push:** para sua feature/bugfix:
   ```bash
   git commit -m "Adiciona ideia genial"
   git push origin feature-minha-ideia-genial
   ```
4. **Abra um Pull Request** (PR) explicando suas mudanças.
5. Aguarde um feedback e seja feliz!.

---

## 📄 Licença

  Este projeto está sob a licença [MIT](LICENSE). Sinta-se livre para utilizar, modificar e distribuir este software de acordo com os termos descritos.

---

## 👨‍💻 Autor

  Feito com ❤️ por [Levir Menezes de Souza]!
  Entre em contato:

  - [GitHub](https://github.com/LevirMenezes/)

  - [LinkedIn](https://www.linkedin.com/in/levir-menezes-dev/)

  - [E-mail](mailto:levirmenezes@gmail.com)

---

## 🙌 Agradecimentos

- Em especial ao Prof. Leandro Ferrarezi Valiante, que acreditou no projeto desde o primeiro “Hello World” e incentivou demais para que tudo isso fosse possível!
- A todos que testaram e quebraram o CooDocs em mil pedaços, ajudando a torná-lo melhor!
- A comunidade open source, que sempre salva nossas vidas.
- Você, que leu até aqui. **Obrigado** e bora colaborar! 🥳

---

**Divirta-se usando o projeto!** 🚀
Se tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma [issue](https://github.com/LevirMenezes/CooDocs/issues) ou entrar em contato. 😊

