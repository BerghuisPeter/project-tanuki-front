# Project Tanuki 🦝

Project Tanuki is a web application featuring a **Real-time Global Chat** and a **Multiplayer Battleship Game**. Built with Angular 17 and powered by Socket.io for real-time communication.

## 🚀 Features

- **Global Chat**: Real-time messaging with other users.
- **Multiplayer Battleship**: Classic battleship game played in real-time.
- **Modern UI**: Styled with Tailwind CSS and Angular Material.
- **Dockerized**: Easy deployment using Docker and Docker Compose.

## 🛠️ Tech Stack

- **Frontend**: Angular 17, Tailwind CSS, Angular Material.
- **Backend**: Node.js, Express, Socket.io.
- **DevOps**: Docker, GitHub Actions, SonarQube.

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Java JDK](https://adoptium.net/) (v11+ required for OpenAPI generator, v17+ recommended)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

> **Note:** Ensure Java is added to your system's Environment Variables (`PATH`). You can verify it by running `java -version` in your terminal.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/project-tanuki.git
cd project-tanuki
```

### 2. Setup Socket Server

The backend handles real-time communication.

```bash
cd socket-server
npm install
npm start
```

By default, the server runs on `http://localhost:8000`.

### 3. Setup Frontend

In a new terminal, from the project root:

```bash
npm install
npm run generate:api
npm start
```

**Note:** You must run `npm run generate:api` before the first launch or whenever the OpenAPI specifications change. This script requires Java to be installed.

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

---

## 📜 Available Scripts

| Command                     | Description                                       |
|-----------------------------|---------------------------------------------------|
| `npm start`                 | Runs the Angular app in development mode.         |
| `npm run build`             | Builds the project for production.                |
| `npm run test`              | Runs unit tests via Karma.                        |
| `npm run test:headless`     | Runs unit tests in headless Chrome (CI).          |
| `npm run socket-server`     | Starts the socket server from the root directory. |
| `npm run generate:api`      | Generates OpenAPI clients for development.        |
| `npm run generate:api:prod` | Generates OpenAPI clients for production.         |
| `npm run lint`              | Lints the project code.                           |
| `npm run sonar`             | Runs tests, linting, and SonarQube analysis.      |

---

## 🐳 Docker Deployment

You can run the entire stack using Docker Compose.

### Using Docker Compose

From the root directory:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

This will start:

- **Frontend**: `http://localhost:80`
- **Socket Server**: `http://localhost:8000`

### Individual Containers

If you prefer running them separately:

**Angular Frontend:**

```bash
# First, build the project
npm run build
# Then build and run the container
docker build -t tanuki-angular -f docker/angular/Dockerfile .
docker run -p 80:80 -e NGINX_HOST=localhost -e PORT=80 tanuki-angular
```

**Socket Server:**

```bash
docker build -t tanuki-socket -f docker/socket/Dockerfile .
docker run -p 8000:8000 tanuki-socket
```

---

## 🧪 Testing

Run `npm test` to execute unit tests via [Karma](https://karma-runner.github.io).
For headless execution (useful for CI/CD), use:

```bash
npm run test:headless
```

## 🏗️ Project Structure

- `src/app/features/battleship`: Battleship game logic and components.
- `src/app/features/global-chat`: Real-time chat implementation.
- `socket-server/`: Node.js/Socket.io backend.
- `docker/`: Dockerfiles and Docker Compose configuration.
