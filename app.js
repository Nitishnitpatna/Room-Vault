if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/Listing.js");
const path =  require("path");
const methodOverride = require("method-override");
// parta phase2
const ejsMate = require('ejs-mate');
// parta phase3
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
// partaphase2 (3) and partdphase2(1)
const Review = require("./models/reviews.js");
const listingsRoute = require("./Routes/listing.js");
const reviewRoute = require("./Routes/reviews.js");
const userRoute = require("./Routes/user.js");
// partc phase2
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
// partd phase2
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// const dbUrl = 'mongodb://127.0.0.1:27017/RoomVault'
const newdbUrl = process.env.ATLASDB_URL;
main().then(()=>{
    console.log("Connection stablise");
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect(newdbUrl);
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// root route

const store = MongoStore.create({
    mongoUrl: newdbUrl,
    crypto:{
        secret : process.env.SECRET,
    },
    touchAfter: 24*3600,
    
})
store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
});
// session options
const sessionOptions = {
    store : store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        HttpOnly: true
    }
}



// seesion and flash middleware
app.use(session(sessionOptions));
app.use(flash());

// Passport related code
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // to specify which passport strategy i'm using 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to access flash messages
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; // variable to access req.user in our .ejs file
    
    next()
})



// Listings Routes
app.use("/listings",listingsRoute);

// Reviews route
app.use("/listings/:id/reviews",reviewRoute);

// User route
app.use("/",userRoute);

// Default route
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
});

// Error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"} = err;
    res.status(statusCode).render("error",{err});
})
app.listen("8080",()=>{
    console.log("server is listen's at port number 8080")
})