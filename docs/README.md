# Video Demonstration 
![Video Demonstration](../assets/screen-capture.gif)

# Introduction - how to read this doc

- This exercise is designed to test basic skills in 3 core areas:

1. [SQL databases](#1-database)
2. [React SPA development](#2-react-spa)
3. [Backend API development on Node](#3-backend-api-development-on-node)

- for each section you'll find that it has **problem**, **task**, **solution** sections:

- **problem** :
  - explains the core problem we're trying to solve, and maybe some context

- **task** :
  - gives a list of tasks that MUST be accomplished by you
  - also tells you what are the must-have features in your solution
  - tasks marked with [<ins>**extra**</ins>] are not necessary, consider them as bonus problems

- **techstack instructions**:
  - subsection under task, this tells you what techstack you're expected to use

> [!IMPORTANT]
> please stick to the techstack mentioned; it's a very basic project and does not require an arsenal of libraries, so do not use any other libraries, frameworks, etc.. unless explicitly mentioned

  - however you can use simple libraries that are not mentioned, granted they don't significantly alter the task or do the work for you and that you document the decision-making properly as explained below

- **solution** :
  - once you're done solving the exercise or a part of it, you **MUST** document your solution in this section under the appropriate part of the exercise you solved, so the for the database problem you should edit the solution section under [database](#1-database) only

  - the idea is to document mainly 2 things:

    - key problem solving points: that provide a high level overview of how you solved that problem
      - eg: for the DB problem, what tables you created / altered, how does that accomplish the tasks (if it's not obvious)
    - instructions: you must include all instructions (including code) that will allow us to run and review your solution

## 0. Setup

- fork this repository, you'll be committing all your changes to the forked repo
- clone the fork locally to develop

### Solution
>```
>git clone https://github.com/<username>/full_stack_assessment_skeleton.git
>```
>- Inside the root directory, start the docker container 
>```
>docker-compose -f docker-compose.final.yml up --build -d
>```
>- Spin up the backend server ( Note: No need to add the .env file/ENV variables, the .env >file is already commited )
>```
>cd backend
>```
>```
>npm run start
>```
>- Get back into the root directory
>```
>cd ..
>```
>- Start the frontend
>```
>cd frontend
>```
>```
>npm run dev
>```
>- Now your React application must be running on ```http://localhost:5173/``` and backend on ```localhost:3000```
>



> [!NOTE]
> throughout the readme, we'll be working from within the root directory (full_stack_assessment_skeleton/) of the repo, unless otherwise stated

- use docker to spin up **MySql** db container
- this db instance has some data that will be needed for the exercise, included in it

```bash
docker-compose -f docker-compose.final.yml up --build -d
```

- the containerized db listens on `localhost:3306`
- the docker compose file has the credentials you will need

> [!WARNING]
> do not change credentials, db name and any configuration, this just adds unnecessary complexity

> [!TIP]
> [mysql docker image docs](https://hub.docker.com/_/mysql)

![mysql creds](images/mysql_creds.png)

- the database is `home_db`, user `db_user` has full read-write access to it
- `home_db.user_home` table has some data populated in it

## 1. Database

<details>
<summary>preview of data in `home_db.user_home` table</summary>

| **username** | **email**          | **street_address**       | **state**     | **zip** | **sqft** | **beds** | **baths** | **list_price** |
|--------------|--------------------|--------------------------|---------------|---------|----------|----------|-----------|----------------|
| user7        | user7@example.org  | 72242 Jacobson Square    | Arizona       | 05378   | 2945.89  | 1        | 3         | 791204.0       |
| user7        | user7@example.org  | 75246 Cumberland Street  | Arizona       | 08229   | 2278.71  | 2        | 1         | 182092.0       |
| user10       | user10@example.org | 72242 Jacobson Square    | Arizona       | 05378   | 2945.89  | 1        | 3         | 791204.0       |
| user3        | user3@example.org  | 811 Walker-Bogan Terrace | Rhode Island  | 19219   | 3648.42  | 1        | 2         | 964995.0       |
| user3        | user3@example.org  | 947 Allen Motorway       | Massachusetts | 65353   | 1375.37  | 3        | 3         | 578532.0       |
| user10       | user10@example.org | 7976 W Division Street   | New Mexico    | 99460   | 2510.57  | 1        | 3         | 842529.0       |
| user6        | user6@example.org  | 4679 Horacio Plains      | Texas         | 62631   | 1679.69  | 6        | 3         | 303195.0       |
| user2        | user2@example.org  | 78089 Prospect Avenue    | Nebraska      | 95406   | 4718.9   | 1        | 2         | 358752.0       |
| user2        | user2@example.org  | 5788 Mallie Gateway      | Nebraska      | 37697   | 2236.85  | 3        | 2         | 632165.0       |
| user6        | user6@example.org  | 975 Marty Ridges         | New Jersey    | 28721   | 1310.08  | 6        | 3         | 467656.0       |

</details>

### problem

- as you can see we have data relating users and homes
  - each user is identified by its username, i.e., if two rows have the same username, they're talking about the same user
  - similarly each home is identified by its street_address

- this data relates users on our website and which homes they are interested in

- upon basic inspection you can observe the following:
  - one user may be related to multiple homes
  - also the same home may be related to multiple users

- we gave this data to an [**intern**](https://www.urbandictionary.com/define.php?term=intern), who just threw it into the database, and now it's come to you!

- the intern did not know about relational databases and data normalization, but we expect you do

### task

- refactor the data into a _reasonably_ normalized set of tables
- ensure that the relationship between tables is represented properly using foreign keys -> primary keys  references (as they are usually in relational DBs)
  - you'll need to create _atleast_ 2 tables:

    - `user` : to store `user` attributes: `username`, `email`
    - `home` : to store `home` attributes: all attributes in `user_home` table except for the above `user` attributes

  - you _may_ need to create more tables, alter existing tables to solve the exercise
  - please try to use the names "user" and "home" for "user" and "home" tables, so it's easier for us to understand

- create a **SQL script** `99_final_db_dump.sql` containing all the changes made by you to the DB
- put it inside the `sql` directory under the root directory

- make sure that:
  - the SQL script you have created, takes the DB from its initial state (as it was when you started the docker container for the first time) to the "solved" state, when it's executed

- **techstack instructions**

  - you can use whatever GUI / CLI you want, to interact with database
  - but all the changes you make should be using SQL / MySQL dialect of SQL and should be in the SQL script that you provide
  - so you must **NOT** use Entity first development, where you write your ORM entities and generate SQL migration scripts
  - instead you directly write SQL script, that makes all the changes you want to the DB

### Solution
>#### Thought Process
>- The initial problem involves a denormalized user_home table that stores user information (username, email) and home attributes (street_address, state, zip, sqft, beds, baths, list_price). The relationship between users and homes is a many-to-many relationship. Each user can be related to multiple homes, and each home can be related to multiple users.
> - We will refactor the database schema into a normalized structure which will consist of 3 tables: 
>   - user : To store the user-related information
>   - home : To stre the home-related information
>   - user_home_relation : To represent the many-to-many relationship between users and homes
> - I have ensured the relationship between the 2 tables using **foreign keys** that reference the primary key of the user and home tables.
> - **Creating `user` table** : 
>   - I have extracted the username and email from the `user_home` table. In this table ,each user will be uniquely identified by the username.
>   - Then I have assigned an auto-incrementing primary key `id` to the `user` table.
> - **Creating `home` table** :
>   - I have extracted the home-related columns as mentioned above from the `user_home` table. In this table, each home is uniquely identified by the `street_name`.
>   - Then I have assigned an auto-incrementing primary key `id` to the `home` table.
>  - **Creating `user_home_relation` table** : 
>   - This table consists of 2 foreign keys, one referencing the `user.id` column as `user_id` and other referencing the  `home.id` column as `home_id`.
>   - And then the combination of `user_id` and `home_id` will act as a composite primary key for this table.
>  - I have then createed the entities using `TypeORM` for the tables in the final script.
>  - The final SQL script is present in `sql` folder by the name : `99_final_db_dump.sql`



## 2. React SPA

- this is a simple SPA, the idea is to show case your state management and some frontend-dev skills

### the problem

- we want to see:
  - for each user what homes they are interested in
  - for each home we also want a way to see what different users are interested in it
- also we want to change / update the users that are associated with a given home

### task

- **homes for user page**
  - create a page to show all homes related to a particular user
  - there should be a single-select dropdown at top, to pick the user for whom we want to view the related homes
  - and below that the related homes should populate in cards

  - [watch the video demo for reference](https://drive.google.com/file/d/1D9Jzzuw38cgL-PVYF8YDE1FEBHcjBpig/view?usp=sharing)

  - make sure that:
    - page is responsive as shown
    - we don't expect any fancy UI, barebones is just fine, but it should be functional
  
- **edit user functionality**

  - each home card has an `Edit User` button attached, this should show a modal on click, this is the `Edit User Modal`:

  - initially all users related to the home should be checked
  - we can edit the related users by toggling the checkboxes
  - if we click `Cancel` then modal should just close without any effect
  - however if we edit the users, and then click `Save`:

    - the users related to that home must be updated in the DB
    - the modal should close and the changes should reflect on the `homes for user page`
    - so for eg: if we had picked `user1` on `homes for user page` then clicked on `Edit User` for any home there and **unchecked** `user1` in the modal and saved, then upon closing of the modal, the home we clicked on previously, should NO longer be visible for `user1`, but should be visible for any other user for whom the checkbox was checked on `Save`
  
  ![edit user modal](images/edit_user_modal.png)

  - make sure:

    - UI is not buggy
    - checkboxes are controlled
    - there is atleast 1 user related to a home

      - if the modal has no users selected, it should show an error and disable `Save` button

- **handle data-fetching properly**

  - to create the above components / pages, you'll fetch data from [backend APIs](#3-backend-api-development-on-node)

  - make sure you're handling data-fetching properly by _preferrably_ using a data-fetching-library:
    - show a loading spinner/skeleton while an API request is progress
    - gracefully handle errors if the API calls error out
    - [<ins>**extra**</ins>] cache API responses, to improve performance 

  - as discussed below it's preferred to use a data fetching library to handle these problems properly

- **techstack instructions**
  - JS frameworks:

    - [Vite (recommended)](https://vitejs.dev/guide/) or [Create React App](https://github.com/facebook/create-react-app)
    - use no other framework, libraries

  - CSS:

    - vanilla CSS or [Tailwind CSS](https://tailwindcss.com/docs/installation)
    - use no other css frameworks, component libs, etc..

  - State Management
    - use [Redux Toolkit](https://redux-toolkit.js.org/) where appropriate for state-management

  - Data Fetching
    - **preferred approach** is to use one of the following data-fetching libraries:
      - [RTK Query](https://redux-toolkit.js.org/tutorials/rtk-query)
      - [TanStack Query](https://tanstack.com/query/latest)

    - otherwise, you can use some other data-fetching library, just make sure to document that in README
    - as a last resort, `useEffect()` maybe used, but make sure you're handling data-fetching properly (loading, errors, etc..)

    - for skeletons / spinners - you can use a simple library:
      - eg: [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton)
      - remember to keep it simple and readable

> [!IMPORTANT]
> even if you can do state-management without Redux, you still must use Redux for the solution, (remember the idea is to showcase the skills)

### Solution
> #### Tech Stack used
> - Language: 
>   - Javascript
> - JS frameworks : 
>    - Vite
> - CSS : 
>   - Tailwind CSS
> - State Management : 
>   - Redux Toolkit
> - Data fetching : 
>   - `create Async Thunk` from redux toolkit (why ?)
>     - `create Async Thunk (cAT)` is a generalized building bloock, `RTK Query` is a specialized single purpose tool. `RTK Query` is built on top of `cAT` , so `cAT` is a low-level API for `RTK Query` which has more flexibility. That being said for this use case of the assignment, the same functionalities can be implemented with both. `cAT Documentation : https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk`
>  - Skeletons/Spinners : 
>     - No library used. Custom made
> #### Video 
>
> #### frontend/src/app
> - This folder contains the global `store` which contains all the reducers from `features` folder - user , home and ui.
> 
> #### frontend/src/features
> - The features folder contains the slices and thunks required for global state management and data-fetchinfg.
>   - features/home
>     - Contains `homeSlice` which stores all the data related to home.
>     - Contains `homeThunks` which are async functions for data-fetchinng. The response states like - fulfilled, rejected, pending are handled in `homeSlice`.
>     - Thunks : 
>       - `fetchHomesByUser` : This thunk fetches all the homes which belong to a user `/api/home/find-by-user` . The output of this is the home cards that are dispalyed on the webapge.
>       - `updateUsers` : This thunk calls the `api/home/update-users` endpoint to update the home data with a new set of users. This thunk is dispatched when the `Save` button is clicked in the Edit User modal.
>   - features/ui
>     - Contains `uiSlice` which stores the data related to the UI/entire App. Why not use useState for this instad of a reducer ? This is because there are more than one files that use the  ui data, sharing the useState variables to other components is complicated. It is easier and hassle-free to store all the ui/app related data into a single state , we will call it the uiState, which can be easily used by multiple components.
>   - features/user
>     - Contains `userSlice` which stores all the data related to user.
>     - Contains `userThunks` which are async functions for data-fetching. The response states are handled in `userSlice`.
>     - Thunks : 
>       - `fetchAllUsers`  : This thunk fetches all the users from the endpoint `api/user/find-all`. The response from this thunk is displayed on the top right select box which shows a list of users on the webpage.
>       - `fetchUsersByHome` : This thunk fetches all users that own a specific home from the endpoint `api/user/find-by-home` . The response of this is displayed as a list of users when the the `Edit Users` button is clicked.
> 
> #### frontend/src/components
> - This folder contains all the UI components
>
> #### frontend/src/pages
> - Contains a single page - `MainPage.jsx`
> 
> #### Check list
> - [X] homes for user page
> - [X] edit user functionality
> - [X] handle data-fetching properly

## 3. Backend API development on Node

### problem

- we want the web app to interact with the [DB](#1-database)

### task

- create **REST APIs**, we'll need the following APIs:

  - **/user/find-all**
    - should return all users from DB

  - **/home/find-by-user**
    - should return all homes related to a user
    - this is consumed in UI to show home cards

  - **/user/find-by-home**
    - should return all users related to a home
    - this is consumed in UI, in the `Edit Users` modal

  - **/home/update-users**
    - this API should take in the new bunch of users (from the modal after `Save`) and the home for which the `Edit Users` button was clicked
    - this API should mutate the DB, to reflect the new set of users related to the home

  - make sure:

    - you use suitable HTTP methods for the REST APIs
    - should only use JSON as the interface
    - if possible, sanitize the data sent in the request
    - the `/home/update-users` API is idempotent
  
- **[<ins>extra</ins>] add pagination**

  - for `/home/find-by-user` API add pagination support:

    - page size should be 50
    - add _very_ basic pagination UI to `homes for user page` in [frontend](#2-react-spa)

- **techstack instructions**

  - Backend node frameworks:

    - [NestJS (recommended, if you know it)](https://docs.nestjs.com/) or [Express](https://expressjs.com/en/starter/installing.html)
    - use no other frameworks

  - Interacting with DB:

    - use one of these ORMs, this the **preferred approach**:
      - [TypeORM (recommended)](https://typeorm.io/)
      - [Prisma](https://www.prisma.io/docs/getting-started)
      - [Sequelize](https://sequelize.org/docs/v6/getting-started/)

    - otherwise, you can use [Knex query builder](https://knexjs.org/guide/)

    - we do NOT want raw SQL, if none of above works, you can use any ORM you know, but please mention and link to it in the README

### Solution
> #### Tech Stack
>  - Language: 
>     - Typescript
>  - Backend node frameworks: 
>     - Express 
> - Interacting with DB: 
>     - TypeORM
> #### backend/src/index.ts 
>  - This file sets up the connection with teh database and spins up the express server
>
> #### backend/src/controller 
>  - `homeController` : 
>     - `findByUser` controller : This controller reads the `userId` , `page` , `limit`s from the query string. It gets all the homes belonging to the `userId` , calculates how many homes should be sent back to the client based on the `page` which is the pageNumber and `limit` ( hardcoded as 50 ). The response contains a list of homes, pagination object that contains the page number ( page ) , limit , total homes that are there in the database ( totalHomes ) , total pages required to read all the homes ( totalPages ).
>     - `updateUsers` controller : This controller reads the homeId from the query string. Then obtains the home and user repository. updates the new users in the home of the specified homeId. Then updates the list of homes that the user has. The response is just a json message.
> 
> - `userController` :     
>     - `findUsersByHome` controller : This controller reads the `homeId` from the query string. Then gets a list of users that own the `homeId`. The response is a list of homes ( homes ). 
>     - `findAll` controller : This controller obtains all the users from the database and sends it back to the client in the form of a list of users.
>
> #### backend/src/routes
>   - `homeRoute` : 
>     - `GET` : `api/home/find-by-user`
>     - `PATCH` : `api/home/update-users`
>   - `userRoute` : 
>     - `GET` : `api/user/find-all`
>     - `GET` : `api/home/find-by-home`

> explain briefly your solution for this problem here

## Submission Guidelines

- once you're done with [DB](#1-database), [frontend](#2-react-spa), [backend](#3-backend-api-development-on-node) it's time to submit your solution :smiley:

### README

- this is the most important part of the submission, without a proper README no submission will be considered

- you must edit this README file in your fork of the repo, and for each problem section, document your solution properly in its **solution** section

### frontend & backend

- all frontend / backend code should go entirely in the `./frontend` / `./backend` directories
- we are fine with testing your solution in either `dev` or `production` mode, just make sure the instructions are properly documented

> [!CAUTION]
> make sure to **commit the .env files** for both backend & frontend, if they are needed to run your solutions

### database

> [!CAUTION]
> The database changes you make while developing the solution, by default will not be visible to us or committed in the repo, so make sure to read and understand this section carefully!

- the database is inside a container, and all it's data (the tables you added, altered, etc..) are only saved inside a docker volume that's on your local system, invisible to us

- to make sure we can run your solution, you have to provide your **SQL script** to us
- write all the DB changes to `99_final_db_dump.sql` in `sql` directory under root folder of repo
- this script should take the DB from its initial state to the solved state

- you can test that easily by following below steps:

- first stop the already running db container, else there will be conflicts!

```bash
docker-compose -f docker-compose.initial.yml down
```

- now fire up the new one

```bash
 docker-compose -f docker-compose.final.yml up --build -d
```

- this is the new db container with your SQL script applied, now test your app, it should work exactly the same with this new replica database, this is how we will be runnning your app

### submit the fork url

- when you've committed everything needed to your github fork, please share the url with us, so we can review your submission
  
