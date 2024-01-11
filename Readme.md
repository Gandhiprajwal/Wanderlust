 # Wanderlust: A Simple Node.js App for Listing Rentals

## Introduction

Wanderlust is a simple Node.js application that allows users to create and view listings for rental properties. The app uses MongoDB as its database and EJS as its templating engine.

## Prerequisites

To run this application, you will need the following:

* Node.js (version 16 or higher)
* MongoDB (version 4 or higher)
* npm (version 7 or higher)

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

## Code Overview

The `app.js` file is the main entry point of the application. It sets up the Express app, configures the view engine, and defines the routes.

The `models/listing.js` file defines the schema for the `Listing` model. The `Listing` model represents a rental property.

The `views/index.ejs` file is the home page of the application. It displays a list of all the listings.

The `views/listing.ejs` file is the detail page for a single listing. It displays the listing's title, description, price, location, and country.

## Testing the App

To test the app, you can use the following commands:

1. Create a sample listing.

```
curl -X POST http://localhost:8080/testListing
```

2. View the list of listings.

```
curl http://localhost:8080/
```

3. View the detail page for a single listing.

```
curl http://localhost:8080/listing/1

Generated by [BlackboxAI](https://www.blackbox.ai)