# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /app
ENV FLASK_APP run.py

# Copiar e instalar as dependências
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o restante do código
COPY . .

# Adicionar permissões de execução ao script run.sh
RUN chmod +x ./run.sh

# Instalar virtualenv (se você realmente precisa dele) - opcional
# RUN pip install virtualenv

# Usar CMD para executar o script
CMD ["./run.sh"]
