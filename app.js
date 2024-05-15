if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const axios = require("axios");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/userOperations.js");
const bookingRouter = require("./routes/booking.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateBooking,
  capitalizeCity,
  capitalizeCategory,
  validateBody,
} = require("./middleware.js");
const Booking = require("./models/booking.js");
const Listing = require("./models/listing.js");
const { populate } = require("dotenv");
const { bookingSchema } = require("./schema.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
const BING_MAPS_API_KEY = process.env.MAP_API;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

app.use(session(sessionOptions));
app.use(flash());

// authentication & authorization
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// // check route
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// middleware --> express routes --> listings
app.use("/listings", listingsRouter);
// middleware --> express route --> reviews
app.use("/listings/:id/reviews", reviewsRouter);
// middleware --> express route --> bookings
app.use("/listings",bookingRouter);
// middleware --> express route --> user
app.use("/", userRouter);

// Demo user
// app.get("/demouser",async(req,res)=>{
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student"
//   });
//   // to register a new user instance with a given password --> user,password,callback
//   let registeredUSer = await User.register(fakeUser,"helloworld");
//   res.send(registeredUSer);
// })

// testListing
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     res.send("Successful");
// });

// for all routes that are not found in our website
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  //   console.log(statusCode);
  // res.status(statusCode).send(message);
  res.status(statusCode).render("./listings/error.ejs", { message });
});

// Server Creation
app.listen(process.env.PORT, () => {
  console.log("server is listening to port 8080");
});
