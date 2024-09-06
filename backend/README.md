## Documentation for Backend API Solution

### Project Overview

This project involves building a backend API to enable a web application to interact with a database to manage users and homes. The API is built using Node.js and leverages the **TypeORM** ORM to interact with the database. Below is the outline of the key features and structure of the project:

---

### Project Structure

```
src/
│
├── controller/
│   ├── home.controller.ts  // Handles all home-related API endpoints
│   └── user.controller.ts  // Handles all user-related API endpoints
│
├── entity/
│   ├── home.entity.ts      // Home entity schema
│   ├── user.entity.ts      // User entity schema
│   └── userHome.entity.ts  // Join table for home-user relationship
│
├── data-source.ts          // Configures TypeORM data source
└── app.ts                  // Entry point, API routes setup
```

---

### Core Features

#### 1. **/user/find-all**

- **HTTP Method:** GET
- **Description:** Retrieves all users from the database.
- **Controller Method:** `UserController.findAll`
- **Usage:** Returns a list of all users for general purposes.

#### 2. **/home/find-by-user**

- **HTTP Method:** GET
- **Description:** Fetches all homes associated with a specific user.
- **Controller Method:** `HomeController.findByUser`
- **Usage:** Supports pagination (page size of 50) and is used to display a paginated list of home cards on the UI for the selected user.

#### 3. **/user/find-by-home**

- **HTTP Method:** GET
- **Description:** Retrieves all users associated with a specific home.
- **Controller Method:** `UserController.findByHome`
- **Usage:** Used to populate the "Edit Users" modal with the list of users tied to a specific home.

#### 4. **/home/update-users**

- **HTTP Method:** POST
- **Description:** Updates the list of users associated with a specific home, replacing the old list with the new one.
- **Controller Method:** `HomeController.updateUser`
- **Usage:** Mutates the database to reflect new user assignments for a given home, maintaining **idempotency**.

---

### Data Models

The API uses three main entities that represent the database tables:

#### 1. **Home Entity (`home.entity.ts`)**

- **Table Name:** `home`
- **Columns:**
  - `id` (Primary Key)
  - `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`
- **Relations:**
  - `userHomes`: One-to-many relation with `UserHome`, a join table.

#### 2. **User Entity (`user.entity.ts`)**

- **Table Name:** `user`
- **Columns:**
  - `id` (Primary Key)
  - `username`, `email`
- **Relations:**
  - `userHomes`: One-to-many relation with `UserHome`.

#### 3. **UserHome Entity (`userHome.entity.ts`)**

- **Table Name:** `home_user`
- **Columns:**
  - `userId` (Primary Key, Foreign Key)
  - `homeId` (Primary Key, Foreign Key)
- **Relations:**
  - `ManyToOne` with both `Home` and `User` entities, representing a join table for the many-to-many relationship between `Home` and `User`.

---

### API Design and Best Practices

#### 1. **Idempotent /home/update-users Endpoint**

The `/home/update-users` endpoint ensures **idempotency**, meaning multiple requests with the same data will not cause different effects. This is achieved by:

- Deleting all existing user-home associations for the specified home.
- Inserting the new user-home associations.

This design ensures that the operation is idempotent and consistent, regardless of how many times it is executed with the same inputs.

#### 2. **Pagination Support for Large Datasets**

Pagination is implemented in the `/home/find-by-user` API. This allows the API to efficiently return home records in chunks of 50, reducing the load on both the client and server, especially when handling large datasets.

The API returns metadata such as:

- `total`: Total number of homes
- `page`: Current page number
- `pageSize`: Number of records per page
- `totalPages`: Total pages available

#### 3. **Error Handling**

The API includes comprehensive error handling to ensure graceful degradation and informative error messages. For instance:

- **400 Bad Request:** When input data is invalid.
- **404 Not Found:** When a requested user or home is not found.
- **500 Internal Server Error:** For unexpected server errors.

#### 4. **Data Validation and Sanitization**

Before processing, all incoming requests are validated. For example:

- Ensuring that the required IDs (`homeId` or `userIds`) are present and are in the correct format.
- Filtering out invalid user IDs during user-home updates.

#### 5. **Efficient Database Queries**

- TypeORM's `QueryBuilder` is used to perform optimized queries, reducing unnecessary database load and improving the overall performance of the system.
- The `UserHome` join table is efficiently managed through batch operations, which minimize transaction time and ensure atomicity during updates.

---

### Advantages of the Solution

1. **Separation of Concerns**: Controllers handle the API logic, while entities define the database schema. This modular structure improves maintainability and scalability.

2. **TypeORM for Simplified DB Interaction**: Using TypeORM provides a high-level abstraction over SQL, allowing the use of OOP principles to interact with the database. This reduces the chance of SQL injection and other security vulnerabilities.

3. **Scalability with Pagination**: Pagination support ensures that the APIs can scale efficiently, especially when dealing with large datasets like user-home relationships.

4. **Idempotency**: The `/home/update-users` API design ensures that repeated operations with the same input yield the same result, improving consistency in the system.

5. **Transaction Safety**: User-home update operations are wrapped in database transactions to ensure consistency in the event of failure, keeping the system in a valid state.
