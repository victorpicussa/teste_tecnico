
# Teste Técnico: API simples com Node, MySQL e PostgreSQL

  
Desenvolvido em Node, a API possui duas rotas POST: *localhost:3000/login* - que retorna um token caso o usuário e senha estajam corretos; *localhost:3000/insert* - insere dados no banco conforme o usuário. Cada usuário pode inserir dados de contato em seus respectivos bancos.

## INSTALAÇÃO

Antes de tudo é preciso fazer uma cópia do arquivo *.env.example* para *.env* e definir a variável **TOKEN_SECRET** com algum segredo.

Para inicializar o programa é necessário possuir o programa *docker* e *docker-compose*. Com o *docker-compose* basta executar o comando:

```bash
$ docker-compose up
```

Esse comando criará um container para o MySQL, outro para o PSQL, e outro para a API. Com os containers ativos, basta executar os seguintes comandos para acessá-los:

**MySQL**
```bash
$ docker exec -it teste_tecnico_mysql_1 /bin/bash
```

**PostgreSQL**
```bash
$ docker exec -it teste_tecnico_postgresql_1 /bin/bash
```

**API**
```bash
$ docker exec -it teste_tecnico_web_1 /bin/bash
```

## UTILIZAÇÃO

Para poder inserir dados nos bancos, é preciso possuir um token de verificação. Para isso é necessário enviar um POST para *localhost:3000/login* com um dos seguintes parâmetros no campo *body*:

**Usuário Macapa**
```json
{
    "user": "macapa",
    "pwd": "password"
}
```

**Usuário Varejao**
```json
{
    "user": "varejao",
    "pwd": "password"
}
```

A API retornará um token válido por 10 minutos que deve ser utilizado no header com o campo *x-access-token* ao acessar a rota de inserção.
  
Para inserir dados em algum dos bancos\* é preciso enviar um POST para *localhost:3000/insert* com os dados no *body* com o seguinte formato:

```json
{
    "contacts": [
        {
            "name": "Joaquim Vieira",
            "cellphone": "5541988403129"
        }
    ]
}
```

*\*OBS: o usuário macapa terá seus dados inseridos no banco MySQL e o usuário varejao no banco PSQL.*

## ACESSANDO OS BANCOS

Primeiramente, antes de acessar algum banco é preciso acessar seu container como apresentado anteriormente. Na sequência, para acessar os bancos utiliza-se os seguintes comandos:

**MySQL**\*
```bash
$ mysql -u admin -p macapa
```

**PostgreSQL**
```bash
$ psql -U admin -d varejao
```

*\*OBS: A senha de acesso do usuário admin é password.*