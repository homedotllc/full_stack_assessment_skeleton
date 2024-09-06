# Frontend Solution

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
