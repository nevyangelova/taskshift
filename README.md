# TaskShift - Task Management Application

TaskShift is a modern task management application built with Next.js, Apollo Client, GraphQL, and Ruby on Rails.

## Features

- Project-based task organization
- List and grid views for tasks
- Responsive design for all devices
- Real-time updates with GraphQL
- Optimized performance with virtualized lists for large datasets
- Smooth animations for view transitions

## Tech Stack

### Frontend
- Next.js 14 with App Router
- Apollo Client for GraphQL data fetching
- TailwindCSS for styling
- Framer Motion for animations
- React Window for virtualized lists

### Backend
- Ruby on Rails
- GraphQL Ruby for API
- MySQL database

## Getting Started

### Running with Docker

The easiest way to run the application is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/nevyangelova/taskshift.git
cd taskshift

# Start the application
docker-compose up
```

The application will be available at http://localhost:3000.

### Manual Setup

#### Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
bundle install

# Set up the database
rails db:create db:migrate db:seed

# Start the server
rails server -p 8080
```

The GraphQL API will be available at http://localhost:8080/graphql.

#### Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# Start the development server
yarn dev
```

The frontend will be available at http://localhost:3000.

## Architecture Decisions

### Custom Hook vs. Context Provider

For state management, I chose a custom hook approach rather than a Context Provider pattern:

- **Simplicity**: The application manages just two preferences (viewType and selectedProjectId)
- **Scope**: The preferences are primarily used in the main page component
- **Performance**: Prevents unnecessary re-renders of unrelated components
- **Maintenance**: Easier to understand and maintain for a small/medium application

### Performance Optimizations

- **Apollo Client Caching**: Implemented optimized caching strategies
- **Virtualized Lists**: Used react-window for efficient rendering of large lists
- **Memoization**: Used useMemo and useCallback to prevent unnecessary recalculations
- **Code Splitting**: Leveraged Next.js automatic code splitting

### Future Improvements

With more time, I would implement:

- **Error Boundaries**: For more robust error handling
- **Task Reordering**: Drag-and-drop functionality for task prioritization
- **Monitoring and Logging**: Integration with services like Sentry or LogRocket
- **Performance Metrics**: Collection and analysis of core web vitals
- **Comprehensive Testing**: Unit tests
