# CAB230 - Web Computing

code submitted for assignments two and three as part of [CAB230](https://www.qut.edu.au/study/unit?unitCode=CAB230).

## build and run:

assuming `docker` and `docker-compose` are installed, the project root features a `docker-compose.yaml` that will build the
client (`http://localhost:3000`), and API server (`https://localhost:8080`) + `mysqld` instance (this is not exposed to the host machine)
into three separate service containers.

**run the following** to clone the repo, change directory into the cloned repo, and build + run the containers with compose:

```bash
git clone https://github.com/plsuwu/CAB230
cd CAB230
docker compose up -d --build --force-recreate
```

once done, the **containers + images can be stopped and pruned** with:
```bash
docker compose down
docker compose rm # + hit `y` at the prompt.
```

some of the endpoints from the server won't have client pages built as the server was built for a separate (though thematically linked) task.

### A2 - Clientside:

> i think the clientside source code is a little messy and, given more time, would liked to have refactored large sections of code

- Vite + React + Typescript
- React Router
- TailwindCSS

### A3 - Serverside:

- Express + Typescript also
- MariaDB (or MySQL) + Knex
- Zod - largely unnecessary, but I wanted to try Zod (apparently it can be really slow) and I thought it wound
    up being a pretty tidy way to handle bad user input
- Swagger documentation served on the root endpoint
