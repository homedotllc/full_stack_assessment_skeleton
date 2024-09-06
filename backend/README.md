# Backend Explanation

## Overview

The backend of the assignment is built using Express.js with Typescript and TypeORM. It includes routes and controllers for managing `User` and `Home` entities in MySQL database.

### File Structure

- `homeRoute.ts`: Defines routes related to homes.
- `homeController.ts`: Contains logic for handling requests related to homes.
- `userRoute.ts`: Defines routes related to users.
- `userController.ts`: Contains logic for handling requests related to users.

## `homeRoute.ts`

This file sets up routes for handling operations related to homes.

### Routes

1. **GET `/find-by-user`**
   - Controller: `homeController.findByUser`
   - Description: Fetches all homes associated with a specific user based on `userId`.

2. **PATCH `/update-users`**
   - Controller: `homeController.updateUsers`
   - Description: Updates the users associated with a specific home based on `homeId`.

## `homeController.ts`

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

## `userRoute.ts`

This file sets up routes for handling operations related to users.

### Routes

1. **GET `/find-all`**
   - Controller: `userController.findAll`
   - Description: Fetches all users.

2. **GET `/find-by-home`**
   - Controller: `userController.findUsersByHome`
   - Description: Fetches all users associated with a specific home based on `homeId`.

## `userController.ts`

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
