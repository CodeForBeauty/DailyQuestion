# Daliy question

This app is portfolio project

## Development stack

React

Express

Typescript

Turso

Docker

## How to run

### Prerequisites

Docker

Git

### Building

Copy this repository

```bash
git clone https://github.com/CodeForBeauty/DailyQuestion
```

Go into the compied folder

```bash
cd DailyQuestion
```

Build docker image

```bash
docker build -t daily-question .
```

### Running

Start the application with docker

```bash
docker run daily-question
```

The application will start on localhost using port 3333 or environment variable PORT.
after starting application will be accesible on: http://localhost:3333/