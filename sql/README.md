# Database Normalization and Solution

## Solution Design

### 1. **User Table**

We created a new table to store user-specific information:

```sql
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL
);
```

- **Primary Key (`id`)**: Each user gets a unique identifier to ensure efficient referencing and avoid repetition of usernames or emails across multiple rows.
- **Unique Constraint**: The `username` column is set to be unique, as each username is intended to identify one individual.

### 2. **Home Table**

We created a separate table to store home-specific information:

```sql
CREATE TABLE home (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) UNIQUE NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    sqft DECIMAL(10, 2) NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price DECIMAL(15, 2) NOT NULL
);
```

- **Primary Key (`id`)**: Each home is assigned a unique identifier to ensure no duplication of home data, even if multiple users are interested in the same property.
- **Unique Constraint**: The `street_address` column is unique to ensure no two entries have the same address.

### 3. **User-Home Relationship Table**

We created a **relationship table** to track which users are interested in which homes:

```sql
CREATE TABLE user_home (
    user_id INT,
    home_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (home_id) REFERENCES home(id),
    PRIMARY KEY (user_id, home_id)
);
```

- **Composite Primary Key**: The primary key consists of both `user_id` and `home_id`, which uniquely defines the relationship between a user and a home.
- **Foreign Keys**: The `user_id` references the `user` table, and the `home_id` references the `home` table. This ensures data integrity by enforcing that each user-home pair must exist in the respective user and home tables.

### 4. **Data Migration**

To populate these new tables with existing data from `home_db.user_home`, we used the following steps:

#### Insert Users:

```sql
INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM home_db.user_home;
```

This query extracts distinct users from the original dataset and inserts them into the `user` table, eliminating redundancy.

#### Insert Homes:

```sql
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price
FROM home_db.user_home;
```

This query extracts unique homes from the original dataset, ensuring no duplication of home data.

#### Insert Relationships:

```sql
INSERT INTO home_user (user_id, home_id)
SELECT u.id, h.id
FROM home_db.user_home uh
JOIN user u ON uh.username = u.username
JOIN home h ON uh.street_address = h.street_address;
```

This step associates users with the homes they are interested in, storing the relationships in the `user_home` table using the `user_id` and `home_id` from the `user` and `home` tables.

## Benefits and Advantages

### 1. **Elimination of Redundancy**

- **Previous Design**: The original table contained redundant information, with the same user and home data repeated across multiple rows. For example, the user `user7` appeared twice with different home records.
- **New Design**: The new structure ensures that each user and home is stored only once, regardless of how many relationships exist between them. This drastically reduces data duplication, saving storage space.

### 2. **Improved Data Integrity**

- **Normalization**: By splitting the user and home data into separate tables, we ensure that each unique entity (user, home) is only entered once. This prevents errors such as having different versions of a user's email or address.
- **Foreign Keys**: The foreign key constraints in the `user_home` table ensure that any relationship added must reference valid users and homes. This eliminates the possibility of orphaned records (e.g., a relationship pointing to a non-existent user).

### 3. **Efficient Querying**

- **Faster Queries**: With users and homes in their own tables, querying the database for user or home-specific data becomes more efficient. For example, fetching all homes related to a user is now easier, as we can simply query the `user_home` table by `user_id` and join with the `home` table when necessary.
- **Reduced Table Size**: By breaking the large, redundant table into smaller, normalized tables, we reduce the overall table size, which can improve query performance and database operations (e.g., backups, indexing).

### 4. **Flexibility and Scalability**

- **Modularity**: The separation of data allows for easy expansion. If, in the future, more attributes need to be added to users or homes, they can be added to the respective table without affecting other parts of the database.
- **Scalability**: As the database grows, the normalized structure can better handle increasing amounts of data. The relationships can scale efficiently by adding more rows to the `user_home` table without increasing redundancy.

### 5. **Better Maintainability**

- **Easier Updates**: In the previous design, updating a user's email or a home's price required modifying multiple rows. Now, a single update in the `user` or `home` table is sufficient, making the database much easier to maintain and update.
- **Data Consistency**: The structured approach ensures consistent data across the database. For example, if a home's price changes, the change is reflected for all users related to that home.
