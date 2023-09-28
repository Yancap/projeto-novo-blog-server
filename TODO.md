

### refatorar o repository memory e logo en seguida recriar os testes unitários de cada parte, seguindo a ordem do banco de dados

CMS
- [x] Management  Repository ---    [x] Testes Unitários --- [x] Errors
- [x] Admin Testes Unitários                             --- [x] Errors
- [x] Categories  Repository ---    [x] Testes Unitários --- [x] Errors
- [x] Articles  Repository ---      [x] Testes Unitários --- [x] Errors
- [x] ArticlesTags  Repository ---  [x] Testes Unitários 
- [x] Tags  Repository ---          [x] Testes Unitários --- [x] Errors
- [x] Credits  Repository ---       [x] Testes Unitários --- [x] Errors

CLIENT
- [x] Comments  Repository ---      [] Testes Unitários --- [] Errors
- [x] Users  Repository ---         [] Testes Unitários --- [] Errors
- [x] Articles  Repository ---      [] Testes Unitários --- [] Errors

# Padronizar os errors para {error: tipo do error, message: error.message} #

## Adicionar route params e GET em algumas rotas que recebem requisições via body e POST


// Script: "posttest:controller-admin": "prisma migrate reset --skip-seed --force",

- [] Criar atualização de senha e avatar para managers

- [-] O Admin Token deve ser utilizado para as requisições exclusivas do Admin para que assim, nenhuma outra pessoa consigar realizar requisições a essa rota
