# **Assignment**

## **Home LLC**

A simple full stack app using NestJS, ReactJS and MYSQL.

## **Introduction**

This project was created as an assignment to demonstrate full-stack development capabilities.

## **Project setup and Installation**

This project consists of three parts: a backend, frontend, and database. The database runs inside a Docker container, while the frontend and backend can be accessed by navigating to their respective directories.

### **Access Database**

1. Clone the repository: **`git clone https://github.com/akmr-me/full_stack_assessment_skeleton.git`**
2. Navigate to the project directory: **`full_stack_assessment_skeleton`**
3. Start Data base container: **`docker-compose -f docker-compose.initial.yml up --build -d`**
4. To Check running container: **`docker ps`**
5. To access cli of database container: **`docker exec -it  mysql_ctn  /bin/sh`**
6. Connect to mysql CLI using container shell: **`mysql -u db_user -p`**
7. Enter the MY_SQL password as mentiond in README.md of docs directory

### **Backend setup**

1. Navigate to backend directory: **`cd backend`**
2. Installation: **`npm install`**
3. Run development server: **`npm run start:dev`**
4. Before going back to navigate to root directory: **`cd ..`**

### **Frontend setup**

1. Navigate to frontend directory: **`cd frontend`**
2. Installation: **`npm install`**
3. Run development server: **`npm run dev`**
4. To start the application goto: **[http://localhost:5173/](http://localhost:5173/)**

## **License**

Project Title is released under the MIT License. See the **[LICENSE](https://www.blackbox.ai/share/LICENSE)** file for details.

## **Authors and Acknowledgment**

Project Title was created by **[Amresh Kumar](https://github.com/akmr-me)**.
