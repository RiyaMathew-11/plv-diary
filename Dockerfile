# syntax = docker/dockerfile:1

FROM alpine:3.20.3

WORKDIR /app/

RUN apk add nodejs python3 py3-pip curl bash npm git
RUN curl https://pyenv.run | bash
RUN pip install --break-system-packages pipenv asdf

COPY . .

RUN pipenv install --dev
RUN npm i

WORKDIR /app/src/plv-diary

EXPOSE 5000

CMD ["pipenv", "run", "flask", "run", "--host=0.0.0.0"]
