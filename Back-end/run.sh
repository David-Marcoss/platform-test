#!/bin/sh

# Criar e ativar o ambiente virtual
python -m venv venv
. venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Exportar variáveis de ambiente para o Flask
export FLASK_APP=app
export FLASK_ENV=development
export FLASK_DEBUG=True

# Aguardar 5 segundos (opcional, dependendo da sua necessidade)
sleep 5

# Inicializar e aplicar migrações do banco de dados
flask db init
flask db migrate
flask db upgrade

# Iniciar a aplicação Flask
flask run --host=0.0.0.0 --port=5000
