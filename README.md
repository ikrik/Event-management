# Event Management System

A **microservices-based** application built with **Nest.js** (TypeScript, Node.js) for the backend and **Next.js** (React, Typescript) for the frontend. 🗓️   
It allows users to:
- View a list of events
- Search for events based on location
- Paginate through event results
- Add new events
- Edit existing events

The backend consists of two Nest.js services:

- 📌 **API Gateway**: Acts as a single entry point for the frontend and routes requests to the appropriate microservice.
- 📌 **Event Management Microservice**: Handles event-related operations such as retrieving, creating, and updating events.

The frontend consists of one **Next.js** services:
- 📌 **Event Management:** Application that interacts with the backend to provide a seamless user experience.

<br>

#### Tech Stack Used

  | Technology  | Usage |
  |------------|----------------------------|
  | **Nest.js** 🚀 | Backend Framework (Node.js) |
  | **Next.js** ⚡ | Frontend Framework (React/Next 15)|
  | **TypeScript** 🔆 | Strongly-typed JavaScript |
  | **Communication:** 📡 | Microservices architecture with TCP transport
  | **Docker** 🐳 | Containerization |
  | **SWR** 🔄 | Data fetching (React) |
  | **TailwindCSS** 🎨 | Styling |

<br>
<br>


## 🚀 Getting Started  

#### Prerequisites  
- Install **Docker** 🐳: [Download Here](https://www.docker.com/get-started)  
- Install **Node.js (v22.1)**: [Download Here](https://nodejs.org/)  



#### Running the Application with Docker Compose

- The application is fully containerized and can be run using **Docker Compose** 📝.

#### Steps to Run the Application

1. **Clone the repository**:

   ```bash
   git clone git@github.com:ikrik/Event-management.git
   cd Event-management
   ```

2. **Build and start the containers**:

   ```bash
   docker-compose up --build
   ```

   This will build the images and start the services.

3. **Access the application**:

    - 🖥️ **Frontend:** `http://localhost:3000`
    - 🔐 **API Gateway:** `http://localhost:3001`
    - 🎮 **Event Management Microservice:** Runs on port `3002` but is accessed internally via the API Gateway.

4. **Stop the containers**:

   ```bash
   docker-compose down
   ```

   This stops and removes the containers.

<br>
<br>

## Project Structure

```
backend/
  apps/
    api-gateway/        # API Gateway (Nest.js - Typescript)
    event-management/   # Event Management Microservice (Nest.js - Typescript)
  libs/
    contracts/          # Shared DTOs and constants
  ...
frontend/
  src/app/             # Next.js Frontend
.dockerignore
.gitignore
.nvmrc
.prettierrc
...
```

<br>
<br>

## API Endpoints  

| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| GET    | `/api/v1/events`    | Fetch all events |
| GET    | `/api/v1/events/autocomplete?query=Ber` | Return all locations that contain the substring 'Ber' |
| GET    | `/api/v1/events/search?location=Berlin` | Search for events based on location |
| POST   | `/api/v1/events`    | Create a new event |
| PUT    | `/api/v1/events/:id` | Update an existing event |

---

<br>
<br>

## Development Workflow with Hot Reloading

To ensure **hot reloading** during development, volumes are mounted so that changes made to the code are reflected inside the running containers.

- **Start with hot reloading**:
  ```bash
  docker-compose up --build
  ```
- Any changes made to the **backend** or **frontend** will automatically be updated without needing to restart the containers.


<br>
<br>

## Troubleshooting

- **Port already in use error:** Ensure no other applications are running on ports `3000`, `3001`, or `3002`.
- **Docker build issues:** Try clearing Docker's cache and rebuilding:
  ```bash
  docker-compose down --rmi all --volumes --remove-orphans
  docker-compose up --build
  ```
<br>


## License

MIT License © 2025  


