# Todo Diary Web Application

A full-stack web application for managing todo items with a modern frontend and robust backend.

## Project Overview

This is a full-stack web application built with a .NET 9 backend and Vue 3 frontend. It provides a complete todo diary management system with full CRUD operations, local SQLite database storage, and a responsive user interface.

## Architecture

### Backend (C#/.NET 9)
- **Framework**: ASP.NET Core Web API
- **Database**: SQLite with Entity Framework Core
- **Technology Stack**:
  - C# 12
  - .NET 9
  - Entity Framework Core 9.0.10
  - Microsoft.EntityFrameworkCore.Sqlite

### Frontend (Vue 3/Vite)
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **State Management**: Pinia
- **Technology Stack**:
  - Vue 3
  - Vue Router 4
  - Axios 1.13.1
  - Vite 7.1.7
  - Pinia 2.0.35

## Features

### Backend Features
- RESTful API endpoints for todo management
- Full CRUD operations (Create, Read, Update, Delete)
- SQLite database persistence
- Automatic database migration
- API versioning support

### Frontend Features
- Responsive user interface
- Single-page application experience
- Form validation and submission
- Todo status toggling (complete/incomplete)
- Detailed todo view with edit functionality
- Intuitive navigation between views
- Centralized state management with Pinia

## Getting Started

### Prerequisites

- .NET 9 SDK
- Node.js 18 or higher
- npm 8 or higher

### FE
1. Make the script executable:
   ```bash
   chmod +x build-and-deploy.sh
   ```

2. Run the script:
   ```bash
   ./build-and-deploy.sh
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Build the project:
   ```bash
   dotnet build
   ```

4. Run the application:
   ```bash
   dotnet run
   ```

The backend API will be available at `https://localhost:5001` (or `http://localhost:5000` for HTTP).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

## Running the Application

1. Start the backend service:
   ```bash
   cd Backend
   dotnet run
   ```

2. In a separate terminal, start the frontend:
   ```bash
   cd Frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Database

The application uses SQLite as its database engine, which stores data in a local file (`TodoDiary.db`) in the backend directory. This makes the application lightweight and easy to deploy without requiring a separate database server installation.

## API Documentation

The backend exposes the following RESTful API endpoints:

- `GET /api/todos` - Get all todos
- `GET /api/todos/{id}` - Get specific todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo

## Project Structure

```
TodoDiaryWeb/
├── Backend/
│   ├── Controllers/
│   │   └── TodosController.cs
│   ├── Models/
│   │   └── Todo.cs
│   ├── Data/
│   │   └── AppDbContext.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   └── Backend.csproj
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.vue
│   │   │   ├── TodoList.vue
│   │   │   ├── TodoItem.vue
│   │   │   └── TodoDetail.vue
│   │   ├── views/
│   │   │   ├── HomeView.vue
│   │   │   └── TodoDetailView.vue
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── api/
│   │   │   ├── todoApi.js
│   │   │   └── request.js
│   │   ├── store/
│   │   │   └── todos.js
│   │   └── App.vue
│   ├── public/
│   ├── index.html
│   └── package.json
└── README.md
```

## Maintenance

### Database Maintenance
The SQLite database is created automatically when the application starts. The database file (`TodoDiary.db`) is located in the backend directory.

### Updating Dependencies
- Backend: Run `dotnet restore` to update NuGet packages
- Frontend: Run `npm install` to update npm packages

### Running Tests
For unit tests, you would typically add a test project and run:
```bash
dotnet test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, please open an issue in the repository.
