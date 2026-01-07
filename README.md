# Node REST API with typeORM

Welcome to this project where I build a dockerized full stack todo application that uses a NodeJS backend, a PostgreSQL database, Prisma as ORM and JWT Authentication

<br>

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contact](#contact)

 
<br>

## Introduction
This project focuses on building a full-stack todo application with a secure RESTful API using TypeScript, Express, and Node.js. It leverages Prisma as the ORM to manage and interact with a PostgreSQL database, incorporating authentication, authorization, and structured logging.
- The goal of this project is to strengthen my practical experience with TypeScript, Express, Prisma and Node.js while applying best practices for security and API design.

<br>

## Technologies

Here’s what I’m using for this project:

- **Express**:  A lightweight and flexible Node.js web framework used to build APIs and web servers efficiently.
- **Database**: A PostgreSQL database.   
- **Prisma**: is an Object-Relational Mapping (ORM) tool that provides a type-safe, auto-generated database client for interacting with relational databases (such as PostgreSQL).
- **Winston logging framework**: A flexible Node.js logging library that supports multiple log levels and transports (such as console and file logging) for better monitoring and debugging.
- **Jsonwebtoken**: A library used to generate and verify JSON Web Tokens (JWTs) to authenticate users and authorize access based on their roles. 
- **Docker**: The entire project is dockerized to ensure consistent and easy deployment. It uses two containers, one for the PostgreSQL database and one for the application, enabling decoupling and simplified environment setup. 
- **GitHub**: All my web app code is stored and versioned in this GitHub repository.

<br>

## Setup

To get this project up and running on your local machine, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ghassenjridi8/typescript-rest-api.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd typescript-rest-api
    ```


3. **create .env file in the root folder and put the env variables**
    ```env
    NODE_ENV=development
    PORT=9002
    LOGGER_LEVEL=debug
    JWT_SECRET="your_jwt_secret_key"
    ```

4. **build the docker image for the app from the Dockerfile**
    ```bash
    docker compose build
    ```

5. **create database schema and run the required migrations**
    ```bash
    docker compose run app npx prisma migrate dev --name init
    ```


6. **run app container and Postgres database container**
    ```cmd
    docker compose up
    ```

<br>

## Contact

If you have any questions or comments about my Typescript REST API project, please contact:  
**Ghassen** – [Jridi59@gmail.com](mailto:Jridi59@gmail.com)  
- [LinkedIn]() *(https://www.linkedin.com/in/ghassen-jridi-94b81034a/)*

<br>


