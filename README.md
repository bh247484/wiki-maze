# What is it?

It's a trivia maze game built with React/Typescript, ASP.NET (C#), and Postgres. You start at one Wikipedia page and make your way to another using only related links. Related articles are fetched from Wikipedia's publicly available web api.



# How to spin up locally
1. Have local Docker installation.
2. Run `make psql-up` in the root directory to start the postgres db.
3. Then `make asp-dev` to launch the ASP server.
4. Then `make asp-migrate` to scaffold the db schema.
5. Finally `make vite-dev` to start the React app frontend at `http://localhost:5173`.

# Architecture

## React App

## ASP.NET/Postgres Backend

