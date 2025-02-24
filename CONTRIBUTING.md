# Contribuindo com o Projeto

Ficamos muito felizes que você esteja interessado em contribuir com este projeto! Aqui vai um passo a passo de como colaborar.

## Sumário

- [Contribuindo com o Projeto](#contribuindo-com-o-projeto)
  - [Sumário](#sumário)
  - [Como Reportar um Bug](#como-reportar-um-bug)
  - [Como Sugerir uma Funcionalidade](#como-sugerir-uma-funcionalidade)
  - [Configurando o Ambiente de Desenvolvimento](#configurando-o-ambiente-de-desenvolvimento)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Fluxo de Pull Requests](#fluxo-de-pull-requests)
  - [Padrões de Código](#padrões-de-código)
  - [Código de Conduta](#código-de-conduta)

---

## Como Reportar um Bug

1. **Verifique** se o bug já não foi reportado na aba de [Issues](../../issues).
2. **Abra** uma nova Issue, usando o template de “Bug Report” se disponível.
3. **Informe**:
   - Versão do projeto (ou branch).
   - Passos para reproduzir o erro.
   - Comportamento esperado vs. real.
   - Logs ou prints, se possível.

---

## Como Sugerir uma Funcionalidade

1. **Procure** na aba de [Issues](../../issues) se alguém já não sugeriu algo similar.
2. **Crie** uma nova Issue, usando o template de “Feature Request” se disponível.
3. **Detalhe**:
   - O problema que a feature resolveria.
   - Exemplo de uso.
   - Qualquer captura de tela ou mockup, se relevante.

---

## Configurando o Ambiente de Desenvolvimento

1. **Clone o repositório**
   ```bash
   git clone https://github.com/LevirMenezes/CooDocs.git
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

## Variáveis de Ambiente

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

## Fluxo de Pull Requests

1. **Faça um fork** do projeto.
2. **Crie uma branch** para sua feature/bugfix:
   ```bash
   git checkout -b feature-minha-ideia-genial
   ```
3. **Implemente** sua feature ou correção de bug.
4. **Teste** localmente (e escreva testes automatizados se possível).
5. **Commit e push:** para sua feature/bugfix:
   ```bash
   git commit -m "Adiciona ideia genial"
   git push origin feature-minha-ideia-genial
   ```
6. **Abra um Pull Request** (PR) no repositório principal, descrevendo suas mudanças.
7. Aguarde revisão; faça ajustes se solicitado.

---

## Padrões de Código

  - Estilo: Preferimos usar [ESLint](https://eslint.org) + [Prettier](https://prettier.io) (ou outro padrão) para padronizar o código.
  - Nome de variáveis: Em inglês, camelCase para JS.
  - Commits: Tente ser claro no título. Se quiser, siga o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## Código de Conduta

Este projeto segue o [Contributor Covenant](https://www.contributor-covenant.org). Resumidamente:

  - Seja respeitoso e amigável.
  - Sem discriminação, assédio ou discurso de ódio.
  - Relate comportamentos inapropriados à equipe de mantenedores.

---

Obrigado por dedicar seu tempo para contribuir! Qualquer dúvida, fique à vontade para abrir uma Issue ou entrar em contato. Boas contribuições! 🎉