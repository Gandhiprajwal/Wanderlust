# Wanderlust: A Simple Node.js App for Listing Rentals

## Introduction

Wanderlust is a simple Node.js application that allows users to create and view listings for rental properties. The app uses MongoDB as its database and EJS as its templating engine.

## Prerequisites

To run this application, you will need the following:

- Node.js (version 16 or higher)
- MongoDB (version 4 or higher)
- npm (version 7 or higher)

## Installation

1. Clone the repository to your local machine.

    ```
    git clone https://github.com/wanderlust-app/wanderlust.git
    ```

2. Navigate to the project directory.

    ```
    cd wanderlust
    ```

3. Install the dependencies.

    ```
    npm install
    ```

## Configuration

1. Create a `.env` file in the project directory.

2. Add the following environment variables to the `.env` file:

    ```
    MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
    ```

## Running the App

1. Start MongoDB.

    ```
    mongod
    ```

2. Start the Node.js server.

    ```
    npm start
    ```

The app will be available at `http://localhost:8080`.

## Accessing Listings

- To view all listings, visit [localhost:8080/listings](http://localhost:8080/listings).
- To add your property for Airbnb, visit [localhost:8080/listings/new](http://localhost:8080/listings/new).

## Code Structure

The `app.js` file serves as the main entry point of the application. It sets up the Express app, configures the view engine, and defines the routes for handling HTTP requests.

The `models/listing.js` file defines the schema for the `Listing` model, representing a rental property. This model interacts with the MongoDB database to perform CRUD operations on listings.

In the `views` directory:
- `index.ejs` is the home page displaying a list of all the listings.
- `listing.ejs` is the detail page for a single listing, showing its title, description, price, location, and country.

## Functionality

- **Listing Creation:** Users can create new listings by providing details such as title, description, price, location, and country.
- **Listing Viewing:** The home page displays all the listings available, and users can click on individual listings to view more details.
- **Database Interaction:** MongoDB is used to store and retrieve listing data. The `Listing` model handles interactions with the database.

## Dependencies

The application utilizes the following dependencies:
- `express`: For handling HTTP requests and defining routes.
- `ejs`: As the templating engine for rendering dynamic HTML content.
- `mongoose`: To interact with MongoDB and define schemas for data models.

## Conclusion

Wanderlust provides a straightforward platform for users to list and view rental properties. With Node.js and MongoDB at its core, the application offers a reliable and scalable solution for managing rental listings.
