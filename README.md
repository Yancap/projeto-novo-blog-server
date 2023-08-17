POSTGRESQL_USERNAME=yan 
POSTGRESQL_DATABASE=artechdb 
5432:5432 

# APP

Página de artigos de tecnologia

## RFs (Requisitos funcionais)
    São as funcionalidades da aplicação.

- [x] Deve ser possível se como usuário cadastrar;
- [x] Deve ser possível comentar e excluir como usuário;
- [] Deve ser possível adicionar artigo as favoritos
- [] Deve ser possível pesquisar sobre artigos por meio de seu titulo;
- [] Deve ser possível pesquisar sobre artigos por meio dos seus autores;
- [] Deve ser possível pesquisar sobre artigos por meio de suas tags;
- [] Deve ser possível pesquisar sobre artigos por meio de suas tags;
- [x] Apenas Autores e Admin devem possuir acessos ao CMS;
- [x] Autores devem poder criar artigos;
- [x] Autores devem poder editar apenas seus artigos;
- [] Autores devem poder excluir apenas seus artigos;
- [] Autores devem poder excluir comentários apenas de seus artigos;
- [] Autores devem poder alterar o avatar;
- [x] Deve se retornar um Token do Login
- [x] Deve se possível se logar com um Token
- [x] Admin devem poder excluir outros artigos
- [x] Admin devem poder excluir outros autores

## RNs (Regras de negócio)
    São caminhos que cada requisito pode tomar, com base em uma regra, validação,
autenticação, condições, etc. Sempre deve estar associada a um Requisito Funcional.

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve possuir acesso o CMS;
- [x] Apenas Autores e Admin devem possuir acessos ao CMS;
- [] Apenas o ADMIN pode cadastrar Autores; /TODO/
- [x] Apenas o ADMIN pode excluir artigos de terceiros;


## RNFs (Requisitos não-funcionais)
    São requisitos que não partem do cliente, ou seja, são requisitos técnicos como:
Banco de dados utilizados, bibliotecas, frameworks, etc.

- [x] A senha do Autor precisa estar criptografada;
- [x] A senha do ADMIN precisa estar criptografada;
- [x] Os dados devem estar em um Banco de dados PostgreSQL;
- [X] Deverá existir um JWT diferente para cada categoria (Usuário, Autor e Admin);
- [] Deverá existir um JWT diferente para acessar a API por parte do Cliente e por parte do CMS;