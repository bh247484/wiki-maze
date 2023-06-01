# What is it?

It's a trivia maze game built with React/Typescript, ASP.NET (C#), and Postgres. The player begins at one Wikipedia article and makes their way to goal article using only related links. Related article links are fetched from Wikipedia's publicly available web api.

https://github.com/bh247484/wiki-maze/assets/57693937/7c8cdd9e-e704-410a-8f83-dff47c4949c8

# How to spin up locally
1. Have local Docker installation.
2. Run `make psql-up` in the root directory to start the postgres db.
3. Then `make asp-dev` to launch the ASP server.
4. Then `make asp-migrate` to scaffold the db schema.
5. Finally `make vite-dev` to start the React app frontend at `http://localhost:5173`.

# Architecture

## React App

The React App handles the fetching, updating, and rendering of Wikipedia articles and their related links. Visit the `fetchNodes()` function in the `Trial` component (`/vite-react-app/src/components/trial/index.tsx`) to see an interesting recursive fetching routine that gracefully/progressively loads and renders Wikipedia's paginated api results.

The time in seconds, an array of articles visited, and a player's score are stored and managed in component level state. Game `phase`-s (setup, trial, game report, high scores) are also stored in lieu of a React routing library/pattern (overhead not justifiable in an app of this size).

Once a game ends the React app fetches high scores from the ASP backend and if the player registers a new high score, that score is posted to the backend for storage in the db.

## ASP.NET / Postgres Backend

The ASP backend hosts endpoints for getting and posting high scores. The routes are defined in `/asp-api/Controllers/HighScoreController.cs` and the related data model in `/asp-api/Models/HighScore.cs`. A connection string pointing to a dockerized Postgres instance is passed to the ASP api as an env variable in `docker-compose.yml`. It's then invoked in `Program.cs` (by way of `appsettings.json`) to configure the DbContext.
