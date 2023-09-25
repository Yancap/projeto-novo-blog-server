

### refatorar o repository memory e logo en seguida recriar os testes unitários de cada parte, seguindo a ordem do banco de dados
## Padronizar as respostas de error dos controller para { error: "tipoDoError", message: "mesagem"}

- [x] Management InMemory Repository ---    [x] Testes Unitários --- [x] Errors
- [x] Admin Testes Unitários                                     --- [x] Errors
- [x] Categories InMemory Repository ---    [x] Testes Unitários --- [x] Errors
- [x] Articles InMemory Repository ---      [x] Testes Unitários --- [x] Errors
- [x] ArticlesTags InMemory Repository ---  [x] Testes Unitários --- [] Errors
- [x] Tags InMemory Repository ---          [x] Testes Unitários --- [] Errors
- [x] Credits InMemory Repository ---       [x] Testes Unitários --- [] Errors

- [x] Comments InMemory Repository ---      [x] Testes Unitários --- [] Errors
- [x] Users InMemory Repository ---         [x] Testes Unitários --- [] Errors

# Padronizar os errors para {error: tipo do error, message: error.message} #

## Adicionar route params e GET em algumas rotas que recebem requisições via body e POST


// Script: "posttest:controller-admin": "prisma migrate reset --skip-seed --force",

- [] Criar atualização de senha e avatar para managers

- [-] O Admin Token deve ser utilizado para as requisições exclusivas do Admin para que assim, nenhuma outra pessoa consigar realizar requisições a essa rota
