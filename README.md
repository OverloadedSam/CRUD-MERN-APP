# CRUD-MERN-APP

CRUD MERN APP is a MERN stack based application which consists of simple Create, Read, Update and Delete operations.

## Requirements

- `node >= 14.0.0`
- `npm >= 6.14.8`

## Usage
  1. Clone the repository

    $ git clone https://github.com/OverloadedSam/CRUD-MERN-APP.git

  2. Move to the frontend and backend directory one by one.

    $ cd CRUD-MERN-APP/frontend
    // AND
    $ cd CRUD-MERN-APP/backend

  3. Install project dependencies (For both frontend and backend).

    $ npm install

## Setting Up Environment Variables
You have to set the environment variables of your configuration before starting the server.

### 1. Environment variables for backend
Place a `.env` file at `CRUD-MERN-APP/backend/` location and set following environment variables.

    API_URL={api_prefix} // api prefix e.g. /api
    PORT={port_number}
    ORIGIN={origin} // e.g. usually `http://localhost:3000` for development
    DB_CONNECTION_STRING={mongoDB_uri_connection_string}
    DB_NAME={mongoDB_database_name}
    SALT={salt_for_password_hashing}
    SECRET={secret_for_jwt} // e.g. shhh123

### 2. Environment variables for frontend
Place a `.env` file at `CRUD-MERN-APP/frontend/` location and set following environment variables.

    REACT_APP_API_URL={backend_api_url} // e.g. http://localhost:8000/api

## Running The Project
### Run backend (Node API)

    $ cd backend/ // got to backend directory
    $ npm run dev // run backend with hot reloading.
    // or you can run the backend with standard command
    $ node server.js

### Run frontend (React app)

    $ cd frontend/ // got to frontend directory
    $ npm start
