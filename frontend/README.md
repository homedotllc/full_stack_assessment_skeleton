## Documentation for the React SPA Solution

### **Project Overview**

This project implements a simple Single Page Application (SPA) using **React** that displays homes related to specific users and allows you to edit the users associated with each home. The main focus is on handling state management, data fetching, and providing a clean, functional interface to showcase homes and their related users. Below is the breakdown of the structure, design decisions, and advantages of this solution.

---

### Steps to run -

```
cd frontend
npm i
npm run dev
```

---

### **Key Features**

1. **Homes for User Page**

   - A dropdown allows selecting a user, which populates the page with homes that user is interested in.
   - Homes are shown as responsive cards with relevant information.
   - A button on each card opens a modal allowing editing the users related to that home.

2. **Edit User Modal**

   - Displays a list of users related to the home with checkboxes.
   - Allows toggling user association for the home.
   - Validations ensure at least one user is selected before saving.

3. **Data Fetching**

   - Efficient data fetching using **RTK Query** to handle API requests, caching, error handling, and loading states.

4. **State Management**
   - State management is done using **Redux Toolkit**, including slices for managing global app states like user selection and fetched data.

---

### **File Structure**

```plaintext
src/
├── app/
│   ├── store.ts           # Store configuration
│   ├── createAppSlice.ts  # Utility for creating slices
│   └── hooks.ts           # Hooks for using typed selectors and dispatch
│
├── components/
│   ├── Card.tsx           # Reusable card component for homes
│   ├── Dialog.tsx         # Modal component for editing users
│   ├── Dropdown.tsx       # Single-select dropdown for selecting a user
│   ├── MultiCheckBox.tsx  # Checkbox component for user selection
│   ├── Pagination.tsx     # Pagination controls for homes listing
│
├── features/
│   ├── userHome/          # Contains logic related to users and homes
│   │   ├── userHomeSlice.ts        # Slice for user and home-related state
│   │   ├── userHomeApiSlice.ts     # API services created with RTK Query
│   │   ├── UserHome.tsx            # Component for "Homes for User" page
│   │   ├── types.ts            # Component for "Homes for User" page
│
└── App.tsx                # Main component rendering the app
```

### **Key Components**

1. **Dropdown.tsx**

   - Renders a dropdown for selecting users. The selected user will trigger the `getHomeByUserId` query to fetch homes for that user.

2. **Card.tsx**

   - A reusable component to display information about homes. It includes an "Edit Users" button which opens the modal for editing the users related to the home.

3. **Dialog.tsx**

   - A modal component used to display the user selection for each home. It manages the form for selecting/deselecting users and handles validation and actions on saving or cancelling.

4. **MultiCheckBox.tsx**

   - Displays a list of users with checkboxes for toggling the association of a user with a home. The selected users are updated in the modal and saved to the database.

5. **Pagination.tsx**
   - Handles pagination for the homes list by keeping track of the current page and allowing navigation between pages.

---

### **Data Flow and State Management**

#### **Redux Toolkit Slice (userHomeSlice.ts)**

The state management in this app is handled via **Redux Toolkit**. The `userHomeSlice` holds the following states:

- `userId`: The currently selected user ID.
- `allUsers`: A list of all users fetched from the backend.

The slice contains reducers to set the user ID and the list of users. The state is used throughout the app via selectors and hooks.

```typescript
const initialState: UserHomeState = {
  userId: 1, // Default selected user
  allUsers: [] // All users will be populated here from the backend API
}
```

#### **RTK Query (userHomeApiSlice.ts)**

API requests are managed through **RTK Query**, which simplifies the process of data fetching, caching, and re-fetching. The following API calls are defined:

- **getHomeByUserId**: Fetches the homes related to a specific user.
- **getAllUsers**: Fetches all users available in the system.
- **getUserByHomeId**: Fetches all users related to a specific home.
- **updateUsers**: Updates the users associated with a specific home.

Each of these endpoints handles loading states, errors, and caching, reducing the need for manual data-fetching logic.

---

### **Advantages of the Solution**

1. **State Management with Redux Toolkit**

   - **Redux Toolkit** simplifies the process of managing global state. By using slices, we eliminate the need for excessive boilerplate, making the code more maintainable.
   - The code also scales well, allowing additional features like filtering or sorting homes with minimal effort.

2. **Efficient Data Fetching with RTK Query**

   - **RTK Query** provides automatic caching, pagination, and background re-fetching, which improves the performance of the app. The API service is organized, and its interaction with Redux is seamless.
   - Since the API responses are cached, switching between users happens faster after the initial load.

3. **Responsive and Reusable Components**

   - The components are designed to be reusable across the application. For example, the `Card`, `Dialog`, and `MultiCheckBox` components can be reused in other parts of the app.
   - The design follows basic responsive principles, ensuring the app works on different screen sizes.

4. **Error Handling and Loading States**

   - Both the **RTK Query** and components handle errors gracefully by showing appropriate messages when data fetching fails.
   - Skeleton loaders are used during loading states to enhance the user experience.

5. **Form Validation in Modals**
   - The modal ensures that at least one user is selected when editing users associated with a home, preventing invalid states and providing a clear user experience.

---

### Tools and Libraries Used

- **React**: Core framework for building the Single Page Application (SPA).
- **Redux Toolkit**: Handles global state management in an efficient and scalable way. It simplifies state logic and reducers, making it easier to maintain.
  - _Why Redux Toolkit?_: It offers a modern approach to Redux with simplified slices, state management, and built-in middleware like `RTK Query` for API interactions.
- **RTK Query**: A powerful data-fetching library integrated with Redux Toolkit, managing API calls, caching, and invalidation seamlessly.
  - _Why RTK Query?_: It simplifies the complexity of API interaction by providing built-in caching, re-fetching, and request deduplication.
- **Tailwind CSS**: Used for styling, Tailwind offers utility-first CSS classes that make styling efficient and maintainable.
  - _Why Tailwind CSS?_: It is highly customizable, responsive, and eliminates the need for additional CSS frameworks.
- **Vite**: Used as the build tool for fast development and optimized builds.
  - _Why Vite?_: It’s faster than Webpack with hot-reloading and smaller bundle sizes.
- **react-loading-skeleton**: Used to create loading states while fetching data, offering a better UX during asynchronous operations.

---

### Resources and References

During the development of this solution, several resources were consulted to ensure best practices and smooth integration of tools:

- **Redux Toolkit and RTK Query**:

  - [Redux Toolkit Official Docs](https://redux-toolkit.js.org/tutorials/quick-start)
  - [RTK Query Tutorial](https://redux-toolkit.js.org/tutorials/rtk-query)
  - These resources helped set up Redux state management and API fetching using RTK Query.

- **Tailwind CSS for Styling**:

  - [Tailwind CSS Guide for Vite](https://tailwindcss.com/docs/guides/vite)
  - [Using PostCSS with Tailwind CSS](https://tailwindcss.com/docs/installation/using-postcss)
  - [HyperUI for Tailwind Components](https://www.hyperui.dev/)
  - Tailwind CSS documentation and component libraries like HyperUI provided insights into building responsive layouts quickly.

- **Redux Toolkit Templates**:
  - [Redux Template Repository](https://github.com/reduxjs/redux-templates/)
  - This repository provided template examples for setting up Redux with a modern structure.
