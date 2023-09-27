# Hanabi-Full-Stack-Developer-Take-Home-Assignment
This is a full-stack web application built with React.js for the frontend and Nest.js for the backend. It uses MongoDB as the database for storing form submissions.
```markdown
## Getting Started

To get started, follow the instructions in the respective `README.md` files for the frontend and backend.

## Features

- Frontend Features:
  - Homepage for user input
  - Form Page for data submission and editing
  - Result Page for displaying success messages
- Backend Features:
  - RESTful API for form submission and management
  - MongoDB database for storing form data

## Technologies Used

- Frontend:
  - React.js
  - Axios
  - React Router DOM
- Backend:
  - Nest.js
  - Mongoose
  - MongoDB

## Project Structure
```
# React Frontend
```bash
-Frontend/hanabi_web/
  -src/
    -components/
      -HomePage.js
      -UserFormPage.js
      -ResultPage.js
    -App.js
    -index.js
  -package.json
  -README.md
```
# Nest.js Backend

```bash
Back_end/hanabi/           
  src/
    user/
      user.controller.ts
      user.service.ts
      user.module.ts
  app.controller.ts
  app.service.ts
  app.module.ts
  main.ts
  package.json
  README.md
```

### Frontend

```markdown
# Frontend (React.js)

This is the frontend part of our application built with React.js.

## Getting Started

To get started, follow these steps:

1. Clone this repository.
2. Navigate to the `Frontend/hanabi_web` directory.
3. Install the dependencies using `npm install`.
4. Start the development server using `npm start`.

## Features

- Homepage: Allows users to insert their usernames and navigate to the Form Page.
- Form Page: Users can input their phone number, email, name, and date of birth, and submit or cancel the form.
- Result Page: Displays a congratulatory message as well as user submited data upon successful form submission.

## Dependencies

- React.js: JavaScript library for building user interfaces.
- Axios: HTTP client for making API requests.
- React Router DOM: Routing library for navigating between pages.

## Folder Structure

- `src/userComponent`: Contains the React components.
- `src/App.js`: Entry point of the application.

## Usage

- Visit the homepage and enter your username to proceed with the form submission.

```

### Backend

```markdown
# Backend (Nest.js)

This is the backend part of our application built with Nest.js. It provides the API endpoints for managing form submissions and connects to a MongoDB database.

## Getting Started

To get started, follow these steps:

1. Clone this repository.
2. Navigate to the `Back_end/hanabi` directory.
3. Install the dependencies using `npm install`.
4. Configure your MongoDB connection in the `.env` file whit using key as `DATABASE_URL`
5. Start the server using `npm run start:dev`.

## Features

- RESTful API Endpoints for:
  - Submitting a new form
  - Retrieving a previously submitted form based on the username
  - Updating an existing form
- MongoDB database connection for storing form submissions.

## Dependencies

- Nest.js: A progressive Node.js framework for building scalable and maintainable server-side applications.
- Mongoose: A MongoDB object modeling tool.
- MongoDB: A NoSQL database for storing form submissions.

## Folder Structure

- `src/controllers`: Contains the API controllers.
- `src/services`: Contains the business logic for form operations.
- `src/modules`: Contains the Nest.js modules.
- `src/main.ts`: Entry point of the Nest.js application.

## API Endpoints

- `POST /user`: Submit a new form.
- `GET /user/:username`: Retrieve a previously submitted form.
- `PUT /user/:_id`: Update an existing form.
```
```markdown
## Backend `.env` File

In the backend folder, create a `.env` file to store configuration variables like your MongoDB connection URI.

- MongoDB Connection URI
DATABASE_URL=your_mongodb_uri_here

- Port for the Backend Server
PORT=4000
```

