## Backend Solution

### Overview
The backend of the assignment is built using Express.js with TypeScript and TypeORM. It includes routes and controllers for managing `User` and `Home` entities in a MySQL database.

### `backend` Directory Structure
```
backend/
├── .env                          # Environment variables configuration
├── .gitignore                     # Specifies files and directories to be ignored by Git
├── node_modules/                 # Directory where project dependencies are installed
├── package-lock.json             # Lockfile for the project's dependencies
├── package.json                  # Project metadata and dependency definitions
├── README.md                     # Project documentation and overview
├── tsconfig.json                 # TypeScript configuration file
└── src/
    ├── data-source.ts            # Database connection and configuration
    ├── index.ts                  # Entry point of the application
    ├── config/                   # Configuration files and settings
    ├── controller/               
    │   ├── homeController.ts     # Controller for handling home-related requests
    │   └── userController.ts     # Controller for handling user-related requests
    ├── entities/                 
    │   ├── Home.ts               # Home entity definition
    │   └── User.ts               # User entity definition               
    ├── routes/                   
    │   ├── homeRoute.ts          # Routes related to home functionality
    │   └── userRoute.ts          # Routes related to user functionality
    └── utils/                    # Utility functions and helpers
```


## `src/routes/homeRoute.ts`

This file sets up routes for handling operations related to homes.

### Routes

1. **GET `/find-by-user`**
   - Controller: `homeController.findByUser`
   - Description: Fetches all homes associated with a specific user based on `userId`.

2. **PATCH `/update-users`**
   - Controller: `homeController.updateUsers`
   - Description: Updates the users associated with a specific home based on `homeId`.

## `src/controllers/homeController.ts`

This file contains the logic for handling the requests defined in `homeRoute.ts`.

### Controllers

1. **`findByUser`**

   Fetches homes for a specific user.

   - **Parameters**: 
     - `userId` (from query parameters): The ID of the user.
     - `page` (optional, from query parameters): Page number for pagination.
     - `limit` (optional, from query parameters): Number of homes per page.
   - **Logic**:
     - Retrieves the user by `userId` and includes related homes.
     - Implements pagination for homes.
     - Returns the list of homes and pagination details or error messages.

2. **`updateUsers`**

   Updates the users associated with a specific home.

   - **Parameters**:
     - `homeId` (from query parameters): The ID of the home.
     - `users` (from request body): An array of usernames to associate with the home.
   - **Logic**:
     - Validates `homeId` and `users`.
     - Finds the home by `homeId` and users by their usernames.
     - Updates the home with the new list of users.
     - Returns success or error messages based on the operation result.

## `src/routes/userRoute.ts`

This file sets up routes for handling operations related to users.

### Routes

1. **GET `/find-all`**
   - Controller: `userController.findAll`
   - Description: Fetches all users.

2. **GET `/find-by-home`**
   - Controller: `userController.findUsersByHome`
   - Description: Fetches all users associated with a specific home based on `homeId`.

## `src/controllers/userController.ts`

This file contains the logic for handling the requests defined in `userRoute.ts`.

### Controllers

1. **`findAll`**

   Fetches all users.

   - **Logic**:
     - Retrieves all users from the database.
     - Returns the list of users or an error message.

2. **`findUsersByHome`**

   Fetches users associated with a specific home.

   - **Parameters**:
     - `homeId` (from query parameters): The ID of the home.
   - **Logic**:
     - Finds the home by `homeId` and includes related users.
     - Returns the home details and associated users or an error message.


