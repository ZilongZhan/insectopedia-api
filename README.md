# Insectopedia API

Insectopedia API is a Node.js, Express, and TypeScript-based RESTful API for managing and retrieving insect data. It features a modular, scalable architecture, robust error handling, and a modern development workflow with testing, linting, and CI/CD support.

## Features

- RESTful API for querying insect data (bugs)
- MongoDB database integration via Mongoose
- TypeScript for type safety
- CORS configuration with environment-based origin patterns
- Health check and error handling endpoints
- Extensive unit and integration tests (Jest, Supertest, mongodb-memory-server)
- Prettier, ESLint, and Husky for code quality
- GitHub Actions for CI, code audit, and SonarCloud analysis

## Project Structure

```
src/
  bug/
    controller/
    model/
    router/
    fixtures.ts
    types.ts
  database/
  globals/
  server/
    middlewares/
    __tests__/
    ServerError/
    types.ts
  test-utils/
  env.d.ts
  index.ts
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ZilongZhan/insectopedia-api.git
   cd insectopedia-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment variables template and fill in your values:

   ```bash
   cp .env.sample .env
   ```

   Example `.env`:

   ```
   PORT=3001
   DEBUG=insectopedia:*
   DB_URI=mongodb://localhost:27017/insectopedia
   ALLOWED_ORIGIN_PATTERNS=http://localhost
   ```

## Usage

### Start the server (need to build before starting)

```bash
npm start
```

The API will be available at `http://localhost:3001` by default.

### Development mode (with auto-reload)

```bash
npm run start:dev
```

### Build the project

```bash
npm run build
```

### Run tests

```bash
npm test
```

- For coverage: `npm run test:coverage`
- For watch mode: `npm run test:dev`

## API Endpoints

- `GET /`
  Health check endpoint. Returns `{ "message": "OK" }`.

- `GET /bugs`
  Returns a paginated list of insects.
  Query params:

  - `pageNumber` (optional, default: 1)

  Example response:

  ```json
  {
    "bugs": [
      {
        "commonName": "Insect One",
        "latinName": "Insecta unius",
        "class": "Insecta",
        "description": "Description for insect one.",
        "imageUrl": "https://example.com/insect1.jpg",
        "isDangerous": false,
        "isFavorite": true,
        "order": "OrderOne",
        "phylum": "Arthropoda"
      }
    ],
    "bugsTotal": 16
  }
  ```

## Postman Collection

You can find example requests for this API in the included [Postman collection](../postman_collection.json).  
Import this file into Postman to quickly test the available endpoints.

## Code Quality & CI

- **Linting:**
  Run `npx eslint src --max-warnings 0`
- **Formatting:**
  Run `npx prettier --write .`
- **Pre-commit hooks:**
  Managed by Husky and lint-staged
- **CI/CD:**
  Automated tests and code audit via GitHub Actions ([.github/workflows/](.github/workflows/))

## License

This project is licensed under the ISC License.

## Contact

For questions or feedback, please contact zolong.zhan@gmail.com.
