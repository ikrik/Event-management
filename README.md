# Event Management Application

## Overview

The **Event Management Application** is a full-stack web application built using **Nest.js** for the backend and **Next.js** for the frontend. It allows users to:

- View a list of events
- Search for events based on location
- Paginate through event results
- Add new events
- Edit existing events

The backend consists of two Nest.js services:

- **API Gateway (Port: 3001)**: Acts as a single entry point for the frontend and routes requests to the appropriate microservice.
- **Event Management Microservice (Port: 3002)**: Handles event-related operations such as retrieving, creating, and updating events.

The frontend is a **Next.js** application that interacts with the backend to provide a seamless user experience.

## Technologies Used

- **Backend:** Nest.js (TypeScript, Node.js)
- **Frontend:** Next.js (React/Next 15, TypeScript, TypeScript)
- **Communication:** Microservices architecture with TCP transport
- **Docker:** Containerization and orchestration

## Prerequisites

Ensure you have the following installed before running the application:

- **Docker** ([https://www.docker.com/get-started](https://www.docker.com/get-started))
- **Docker Compose**

## Running the Application with Docker Compose

The application is fully containerized and can be run using **Docker Compose**.

### Steps to Run the Application

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Build and start the containers**:

   ```sh
   docker-compose up --build
   ```

   This will build the images and start the services.

3. **Access the application**:

   - **Frontend:** `http://localhost:3000`
   - **API Gateway:** `http://localhost:3001`
   - **Event Management Microservice:** Runs on port `3002` but is accessed internally via the API Gateway.

4. **Stop the containers**:

   ```sh
   docker-compose down
   ```

   This stops and removes the containers.

## Project Structure

```
backend/
  apps/
    api-gateway/        # API Gateway (Nest.js)
    event-management/   # Event Management Microservice (Nest.js)
  libs/
    contracts/          # Shared DTOs and constants
frontend/
  src/app/             # Next.js Frontend
.dockerignore
.gitignore
.nvmrc
.prettierrc
README.md
```

## Development Workflow with Hot Reloading

To ensure **hot reloading** during development, volumes are mounted so that changes made to the code are reflected inside the running containers.

- **Start with hot reloading**:
  ```sh
  docker-compose up --build
  ```
- Any changes made to the **backend** or **frontend** will automatically be updated without needing to restart the containers.

## Troubleshooting

- **Port already in use error:** Ensure no other applications are running on ports `3000`, `3001`, or `3002`.
- **Docker build issues:** Try clearing Docker's cache and rebuilding:
  ```sh
  docker-compose down --rmi all --volumes --remove-orphans
  docker-compose up --build
  ```
- **Database connection issues:** Make sure the database service (if added) is running.


## License

This project is licensed under the MIT License.

