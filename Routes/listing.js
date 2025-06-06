const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/Listing.js");
const {isLoggedin,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })
// Index Route
// route.get("/", wrapAsync(listingController.index));
// New Route
router.get("/new",isLoggedin,listingController.renderNewForm)
// Show route
// router.get("/:id",wrapAsync(listingController.showListing));
// Create new Route
// route.post("/",isLoggedin, validateListing ,wrapAsync(listingController.createListing));
// edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));
// update route
// router.put("/:id",isLoggedin,isOwner,validateListing,wrapAsync(listingController.updateListing));
// Delete Route
// router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingController.destroyListing));


// Use of router.route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedin, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));


router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedin, isOwner, upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing));



module.exports = router;