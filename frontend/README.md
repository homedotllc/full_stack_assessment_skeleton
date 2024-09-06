# Frontend Solution
## Overview

This frontend application is designed to interact with the backend API built using Reactjs. It provides a user-friendly interface for managing users and homes, utilizing modern web technologies to ensure a seamless experience.

## Tech Stack

- **Language**: 
  - JavaScript
- **JS Frameworks**:
  - Vite
- **CSS**:
  - Tailwind CSS
- **State Management**:
  - Redux Toolkit
- **Data Fetching**:
  - `createAsyncThunk` from Redux Toolkit
    - **Why?**: `createAsyncThunk` (cAT) is a low-level API that offers flexibility and is the building block for `RTK Query`. While `RTK Query` is a specialized tool built on top of `cAT`, it provides more specialized features. For this use case, both can achieve similar functionalities. [cAT Documentation](https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk)
- **Skeletons/Spinners**:
  - Custom implementations, no external library used.

## Project Structure

```
frontend/
├── .gitignore                     # Specifies files and directories to be ignored by Git
├── eslint.config.js               # ESLint configuration file
├── index.html                     # Main HTML file
├── package-lock.json              # Lockfile for the project's dependencies
├── package.json                   # Project metadata and dependency definitions
├── postcss.config.js              # PostCSS configuration file
├── README.md                      # Project documentation and overview
├── tailwind.config.js             # Tailwind CSS configuration file
├── vite.config.js                 # Vite configuration file
├── node_modules/                  # Contains dependencies
└── src/
    ├── App.css                    # Global styles for the application
    ├── App.jsx                    # Main application component
    ├── index.css                  # Entry point for CSS
    ├── main.jsx                   # Entry point for the application
    ├── app/
    │   └── store.js               # Global Redux store configuration
    ├── assets/
    │   └── react.svg              # React logo
    ├── components/                # UI components used throughout the application
    │   ├── Card.jsx               # Card component for displaying home information
    │   ├── HomeSkeleton.jsx       # Skeleton loader for homes
    │   └── Modal.jsx              # Modal component for editing users
    ├── features/                  # State management and data fetching
    │   ├── home/
    │   │   ├── homeSlice.js       # Stores data related to homes
    │   │   └── homeThunks.js      # Async functions for home data fetching
    │   ├── ui/
    │   │   └── uiSlice.js         # Manages UI-related state
    │   └── user/
    │       ├── userSlice.js       # Stores data related to users
    │       └── userThunks.js      # Async functions for user data fetching
    └── pages/
        └── MainPage.jsx           # Primary page component of the application
```

### `frontend/src/app`

- **Description**: Contains the global `store` with reducers from the `features` folder, including `user`, `home`, and `ui`.

### `frontend/src/features`

- **Description**: Houses slices and thunks for global state management and data fetching.

  - **`features/home`**
    - **homeSlice**: Stores data related to homes.
    - **homeThunks**: Async functions for data fetching.
      - **Thunks**:
        - `fetchHomesByUser`: Fetches all homes belonging to a user from `/api/home/find-by-user`. Results are rendered as home cards on the webpage.
        - `updateUsers`: Updates home data with a new set of users via `/api/home/update-users`. Triggered when the `Save` button is clicked in the Edit User modal.

  - **`features/ui`**
    - **uiSlice**: Manages UI-related state.
    - **Rationale**: Instead of using `useState`, a single reducer (`uiSlice`) is used to store UI/app data. This approach simplifies state sharing across multiple components, avoiding the complexity of passing `useState` variables.

  - **`features/user`**
    - **userSlice**: Stores data related to users.
    - **userThunks**: Async functions for data fetching.
      - **Thunks**:
        - `fetchAllUsers`: Fetches all users from `/api/user/find-all`. The response populates a select box displaying users on the webpage.
        - `fetchUsersByHome`: Fetches users owning a specific home from `/api/user/find-by-home`. Results are shown as a list of users when the `Edit Users` button is clicked.

### `frontend/src/components`

- **Description**: Contains all UI components used throughout the application.

### `frontend/src/pages`

- **Description**: Contains the `MainPage.jsx`, the primary page component of the application.

## Check List

- [X] Homes for user page
- [X] Edit user functionality
- [X] Handle data fetching properly

## Summary

My frontend solution leverages a modern tech stack with Redux Toolkit for state management and data fetching, Vite for fast development, and Tailwind CSS for styling. The structure is organized to manage global state, handle data fetching efficiently, and provide a clean and maintainable codebase.

## Additional Features

1. **Responsive Design**:
   - Ensures the application is mobile-friendly and adapts to various screen sizes using Tailwind CSS.

2. **Error Handling**:
   - Comprehensive error handling for API requests, providing user feedback for failed operations.

3. **Loading States**:
   - Implement loading indicators for data fetching operations to enhance user experience.

By incorporating these additional features, the frontend application can provide a more robust, user-friendly, and maintainable solution for managing users and homes.
