# Amanhã

- [x] Fazer um serviço que apenas um ADMIN pode cadastrar um Autor, 
gerando um token único para o ADMIN com assinatura de sua 'hierarchy'

- [x] Fazer os erros personalizados para os serviços de Articles

- [x] Adicionar a criação de Tags e Créditos ao Artigos e em seus serviços de criação

- [X] Fazer o login e registro de usuários
// O Usuário se loga com o NextAuth do Google ou Github e seus dados serão persistidos no banco

- [X] O Autor deve poder excluir o artigo
- [X] O Autor deve poder excluir comentários de seus artigos
- [x] a criação das rotas e controllers para o CMS

- [x] configurar um ambiente de desenvolvimento, usar o SQLite no prisma nesse ambiente para testes

- [x] Substituir as autenticações de hierarquia dos Services, pela autenticação via token 

- [x] Rota para os artigos
- [x] Otimizar os services de artigos, refatorando para reduzir as Querys


- [x] Rota para o ADMIN excluir outros artigos
- [x] Rota de criação de artigos
- [//] Criar um ambiente e um banco de dados para testes com o prisma, para testar
as rotas de criação de artigos.
- [x] Criar as rotas restantes de artigos
- [x] Criar o repositorio do prisma para os users, comments e 
criar a rota para pegar os comentarios do artigo
- [x] Verificar se os dados retornados por cada controller é os
dados do miragejs

### refatorar o repository memory e logo en seguida recriar os testes unitários de cada parte, seguindo a ordem do banco de dados
## Padronizar as respostas de error dos controller para { error: "tipoDoError", message: "mesagem"}

- [x] Management InMemory Repository --- [x] Testes Unitários --- [] Errors
- [x] Admin Testes Unitários --- [] Errors
- [x] Categories InMemory Repository --- [x] Testes Unitários --- [] Errors
- [x] Articles InMemory Repository --- [] Testes Unitários --- [] Errors
- [x] ArticlesTags InMemory Repository --- [] Testes Unitários --- [] Errors
- [x] Tags InMemory Repository --- [] Testes Unitários --- [] Errors
- [x] Credits InMemory Repository --- [] Testes Unitários --- [] Errors

- [] Comments InMemory Repository --- [] Testes Unitários --- [] Errors
- [] Users InMemory Repository --- [] Testes Unitários --- [] Errors

# TESTES UNITÁRIOS DO ARTICLES #

- [-] O Admin Token deve ser utilizado para as requisições exclusivas do Admin para que assim, nenhuma outra pessoa consigar realizar requisições a essa rota
