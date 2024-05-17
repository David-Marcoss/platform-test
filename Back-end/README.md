## Rodando Projeto

### configurações flask

``` sh

    export FLASK_APP=app
    export FLASK_ENV=development
    export FLASK_DEBUG=True
```

### configurações banco de dados

``` sh

    flask db init
    flask db migrate
    flask upgrade
```